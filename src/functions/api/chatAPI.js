/**
 * Chat API - POST message to /message
 */

const CHAT_API_BASE = 'http://localhost:3003';

/**
 * @param {Object} params
 * @param {Object} params.api - Axios instance (withCredentials, interceptors)
 * @param {Object} params.payload - { username, message, timestamp, ... }
 * @returns {Promise<Object>}
 */
export async function sendMessageAPI({ api, payload }) {
  const url = `${CHAT_API_BASE}/message`;

  const body = {
    masterSite: 'kite',
    messageType: 'text',
    messageFrom: payload.username,
    messageTo: 'chat',
    messageCaption: payload.message,
    groupID: 0,
    conversationID: 0,
  };

  const { data } = await api.post(url, body);
  console.log('[Chat API] messageOutcome:', data);
  return data;
}
