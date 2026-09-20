/**
 * TEMP OpenAI lab API helpers — only /openai/* 
 */

const CHAT_API_BASE = 'http://localhost:3003';

/**
 * @param {Object} params
 * @param {import('axios').AxiosInstance} params.api
 * @param {Object} params.payload
 */
export async function postOpenAIChat({ api, payload }) {
  const url = `${CHAT_API_BASE}/openai/chat`;
  const { data } = await api.post(url, {
    message: payload.message,
    systemPrompt: payload.systemPrompt || '',
    modelTier: payload.modelTier || 'CHEAP',
    groupID: Number(payload.groupID ?? 726),
    conversationID: Number(payload.conversationID ?? 0),
    messageFrom: payload.username || payload.messageFrom,
  });
  return data;
}
