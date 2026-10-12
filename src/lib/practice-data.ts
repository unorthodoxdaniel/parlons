import {authClient} from './auth-client';
export async function hiddenPromptIds(userId: string): Promise<Set<number>> {
  const ids = new Set<number>();
  for (let offset = 0; ; offset += 500) {
    const {data, error} = await authClient.from('hidden_prompts').select('prompt_id')
      .eq('user_id', userId).order('prompt_id').range(offset, offset + 499);
    if (error) throw error;
    for (const row of data) ids.add(row.prompt_id);
    if (data.length < 500) return ids;
  }
}
export async function hidePrompt(userId: string, promptId: number) {
  const {error} = await authClient.from('hidden_prompts').insert({user_id: userId, prompt_id: promptId});
  // A repeated hide is already successful, without requiring UPDATE privileges.
  if (error && error.code !== '23505') throw error;
}
