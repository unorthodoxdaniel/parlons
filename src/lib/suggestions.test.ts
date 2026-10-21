import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../../worker/index.ts';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const id = 'a1234567-1234-4123-8123-123456789012';
const payload = {id,kind:'prompt',body:'Describe your favourite journey.',language:'fr',theme:'travel',token:'verified',website:''};
function env() { return {
  ASSETS:{fetch:async()=>new Response('asset')},
  SUGGESTION_RATE_LIMITER:{limit:async()=>({success:true})},
  TURNSTILE_SECRET_KEY:'turnstile-secret',SUGGESTIONS_SHEET_SECRET:'sheet-secret',
  SUGGESTIONS_SHEET_URL:'https://script.google.com/macros/s/deployment/exec',
}; }
function request(input: unknown = payload, origin = 'https://parlons.test') {
  return new Request('https://parlons.test/api/suggestions',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','CF-Connecting-IP':'192.0.2.1'},body:JSON.stringify(input)});
}
test('anonymous valid submission verifies challenge before sending only idea data to Sheets',async t=>{
  const calls: string[]=[];
  t.mock.method(globalThis,'fetch',async(input: any, options: any)=>{
    const url=String(input);calls.push(url);
    if(url.includes('siteverify'))return Response.json({success:true,hostname:'parlons.test',action:'suggestion'});
    const forwarded=JSON.parse(options.body);
    assert.deepEqual(forwarded,{secret:'sheet-secret',id,kind:'prompt',body:payload.body,language:'fr',theme:'travel'});
    assert.equal('user_id' in forwarded,false);
    return Response.json({ok:true,id});
  });
  const result=await worker.fetch(request(),env());
  assert.equal(result.status,200);assert.deepEqual(await result.json(),{ok:true});assert.equal(calls.length,2);
});
test('rejects cross-origin, honeypot, invalid input and oversized requests before external calls',async t=>{
  const mock=t.mock.method(globalThis,'fetch',async()=>{throw new Error('Unexpected fetch');});
  assert.equal((await worker.fetch(request(payload,'https://other.test'),env())).status,403);
  for(const invalid of [null,[],{...payload,website:'bot'},{...payload,body:'short'},{...payload,language:''},{...payload,theme:'=formula'},{...payload,kind:'feature'},{...payload,body:'x'.repeat(18000)}]){
    assert.ok([400,413].includes((await worker.fetch(request(invalid),env())).status));
  }
  assert.equal(mock.mock.callCount(),0);
});
test('rate limits and missing configuration fail closed',async()=>{
  const limited=env();limited.SUGGESTION_RATE_LIMITER.limit=async()=>({success:false});
  assert.equal((await worker.fetch(request(),limited)).status,429);
  const missing=env();missing.SUGGESTIONS_SHEET_SECRET='';
  assert.equal((await worker.fetch(request(),missing)).status,503);
});
test('missing, invalid, mismatched and expired challenges cannot reach Sheets',async t=>{
  const mock=t.mock.method(globalThis,'fetch',async()=>Response.json({success:false}));
  assert.equal((await worker.fetch(request({...payload,token:''}),env())).status,403);
  assert.equal(mock.mock.callCount(),0);
  for(const result of [{success:false},{success:true,hostname:'other.test',action:'suggestion'},{success:true,hostname:'parlons.test',action:'login'}]){
    mock.mock.mockImplementation(async()=>Response.json(result));
    assert.equal((await worker.fetch(request(),env())).status,403);
  }
  assert.equal(mock.mock.callCount(),3);
});
test('failed or unacknowledged Sheets saves never report success',async t=>{
  t.mock.method(globalThis,'fetch',async(input:any)=>String(input).includes('siteverify')
    ? Response.json({success:true,hostname:'parlons.test',action:'suggestion'}) : Response.json({ok:false}));
  assert.equal((await worker.fetch(request(),env())).status,502);
});
test('non-API assets still use Cloudflare static serving',async()=>{
  assert.equal(await (await worker.fetch(new Request('https://parlons.test/'),env())).text(),'asset');
});
test('Sheets receiver authenticates, stores text safely, and deduplicates retried IDs',()=>{
  const rows: any[][]=[];let locked=false;
  const sheet={getLastRow:()=>rows.length+1,getRange:(row:number,col:number)=>({
    getValue:()=> 'ID',
    createTextFinder:(value:string)=>({matchEntireCell:()=>({findNext:()=>rows.some(r=>r[0]===value) ? {} : null})}),
    setValues:(values:any[][])=>rows.push(...values),setNumberFormat:()=>{},setWrap:()=>{},
  })};
  const context=vm.createContext({
    ContentService:{MimeType:{JSON:'json'},createTextOutput:(value:string)=>({setMimeType:()=>JSON.parse(value)})},
    PropertiesService:{getScriptProperties:()=>({getProperty:()=> 'sheet-secret'})},
    LockService:{getScriptLock:()=>({waitLock:()=>{locked=true;},hasLock:()=>locked,releaseLock:()=>{locked=false;}})},
    SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet}),flush:()=>{}},
  });
  vm.runInContext(readFileSync(new URL('../../integrations/suggestions-sheet.gs',import.meta.url),'utf8'),context);
  const send=(input:any)=>context.doPost({postData:{contents:JSON.stringify(input)}});
  assert.equal(send({...payload,secret:'wrong'}).ok,false);assert.equal(rows.length,0);
  const idea={...payload,secret:'sheet-secret',body:'=IMPORTXML("https://example.test")'};
  assert.equal(send(idea).ok,true);assert.equal(rows.length,1);assert.ok(rows[0][3].startsWith("'="));
  assert.equal(send(idea).ok,true);assert.equal(rows.length,1);assert.equal(locked,false);
});
