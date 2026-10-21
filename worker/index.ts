interface Env {
  ASSETS: {fetch(request: Request): Promise<Response>};
  SUGGESTION_RATE_LIMITER: {limit(options: {key: string}): Promise<{success: boolean}>};
  TURNSTILE_SECRET_KEY: string;
  SUGGESTIONS_SHEET_URL: string;
  SUGGESTIONS_SHEET_SECRET: string;
}
const reply = (status: number, error?: string) => Response.json(error ? {error} : {ok:true}, {
  status, headers: {'Cache-Control':'no-store', ...(status === 429 ? {'Retry-After':'60'} : {})},
});
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== '/api/suggestions' && url.pathname !== '/api/suggestions/') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return reply(405,'method');
    if (request.headers.get('Origin') !== url.origin) return reply(403,'origin');
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply(415,'type');
    if (!env.TURNSTILE_SECRET_KEY || !env.SUGGESTIONS_SHEET_URL || !env.SUGGESTIONS_SHEET_SECRET || !env.SUGGESTION_RATE_LIMITER) return reply(503,'unavailable');
    try {
      const ip = request.headers.get('CF-Connecting-IP');
      if (!ip) return reply(503,'unavailable');
      if (!(await env.SUGGESTION_RATE_LIMITER.limit({key:ip})).success) return reply(429,'limit');
      // Bound actual bytes, including chunked requests with no Content-Length.
      const reader = request.body?.getReader();
      if (!reader) return reply(400,'invalid');
      const chunks: Uint8Array[] = []; let size = 0;
      while (true) {
        const {done,value} = await reader.read(); if (done) break;
        size += value.byteLength;
        if (size > 16384) { await reader.cancel(); return reply(413,'invalid'); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk,offset); offset += chunk.byteLength; }
      let input;
      try { input = JSON.parse(new TextDecoder().decode(bytes)); } catch { return reply(400,'invalid'); }
      if (!input || typeof input !== 'object' || Array.isArray(input)) return reply(400,'invalid');
      if (input.website) return reply(400,'invalid');
      const {id,kind,body,language,theme,token} = input;
      if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
        || !['feature','prompt'].includes(kind) || typeof body !== 'string'
        || [...body.trim()].length < 10 || [...body.trim()].length > 2000
        || typeof language !== 'string' || typeof theme !== 'string'
        || (kind === 'prompt' && !/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(language))
        || (kind === 'feature' && (language !== '' || theme !== ''))
        || !/^[a-z0-9-]{0,80}$/.test(theme)) return reply(400,'invalid');
      if (typeof token !== 'string' || !token || token.length > 2048) return reply(403,'verification');
      const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method:'POST', body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:ip}),
        signal:AbortSignal.timeout(10000),
      });
      const challenge = await verification.json() as {success?:boolean;hostname?:string;action?:string};
      if (!verification.ok || !challenge.success || challenge.hostname !== url.hostname || challenge.action !== 'suggestion') return reply(403,'verification');
      const target = new URL(env.SUGGESTIONS_SHEET_URL);
      if (target.protocol !== 'https:' || target.hostname !== 'script.google.com' || !/^\/macros\/s\/[^/]+\/exec$/.test(target.pathname)) return reply(503,'unavailable');
      const result = await fetch(target, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({secret:env.SUGGESTIONS_SHEET_SECRET,id,kind,body:body.trim(),language,theme}),
        signal:AbortSignal.timeout(15000),
      });
      const saved = await result.json() as {ok?:boolean;id?:string};
      if (!result.ok || saved.ok !== true || saved.id !== id) return reply(502,'save');
      return reply(200);
    } catch { return reply(502,'save'); }
  },
};
