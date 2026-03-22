/**
 * Chat API — messages + conversations (Kite uses localhost:3003 API).
 */

const CHAT_API_BASE = 'http://localhost:3003';

/**
 * @param {Object} params
 * @param {Object} params.api - Axios instance (withCredentials)
 * @param {Object} params.payload - username, message, groupID, conversationID, ...
 */
export async function sendMessageAPI({ api, payload }) {
  const url = `${CHAT_API_BASE}/message`;

  const body = {
    masterSite: 'kite',
    messageType: 'text',
    messageFrom: payload.username,
    messageTo: 'chat',
    messageCaption: payload.message,
    groupID: Number(payload.groupID ?? 0),
    conversationID: Number(payload.conversationID ?? 0),
  };

  const { data } = await api.post(url, body);
  return data;
}

/**
 * @param {Object} params
 * @param {import('axios').AxiosInstance} params.api
 * @param {number} params.conversationID
 */
export async function fetchConversationMessages({ api, conversationID }) {
  const url = `${CHAT_API_BASE}/messages/conversation/${conversationID}`;
  const { data } = await api.get(url);
  return data;
}

/**
 * @param {Object} params
 * @param {import('axios').AxiosInstance} params.api
 * @param {number} params.conversationID
 */
export async function fetchConversationById({ api, conversationID }) {
  const url = `${CHAT_API_BASE}/conversations/${conversationID}`;
  const { data } = await api.get(url);
  return data;
}
