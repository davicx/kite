/**
 * Chat API — same endpoints as kite workshop (localhost:3003).
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

  if (payload.selectedFinding) {
    body.selectedFinding = payload.selectedFinding;
  }

  const { data } = await api.post(url, body);
  return data;
}

/**
 * @param {Object} params
 * @param {import('axios').AxiosInstance} params.api
 * @param {number} params.groupID
 */
export async function fetchConversationsForGroup({ api, groupID }) {
  const url = `${CHAT_API_BASE}/conversations/group/${groupID}`;
  const { data } = await api.get(url);
  return data;
}
