/**
 * AI Usage API — summary for Dashboard card (Kite → localhost:3003).
 */

const AI_USAGE_API_BASE = 'http://localhost:3003';

/**
 * @param {Object} params
 * @param {import('axios').AxiosInstance} params.api
 * @returns {Promise<{ success: boolean, data?: object, message?: string }>}
 */
export async function fetchAiUsageSummary({ api }) {
  const url = `${AI_USAGE_API_BASE}/ai/usage/summary`;
  const { data } = await api.get(url);
  return data;
}
