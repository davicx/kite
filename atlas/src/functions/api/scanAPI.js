const CHAT_API_BASE = 'http://localhost:3003';

export async function fetchLatestScan({ api, conversationID }) {
  const url =
    `${CHAT_API_BASE}/cloudpilot/scans/conversation/` +
    `${Number(conversationID)}/latest`;
  const { data } = await api.get(url);
  return data;
}

export async function fetchRecentScans({ api, conversationID, limit = 3 }) {
  const url =
    `${CHAT_API_BASE}/cloudpilot/scans/conversation/` +
    `${Number(conversationID)}/recent`;
  const { data } = await api.get(url, { params: { limit } });
  return data;
}

export async function fetchScanByID({ api, scanID }) {
  const url = `${CHAT_API_BASE}/cloudpilot/scans/${Number(scanID)}`;
  const { data } = await api.get(url);
  return data;
}
