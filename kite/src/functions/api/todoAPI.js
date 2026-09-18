/**
 * To Do API — get todos + mark complete/open (Kite uses localhost:3003 API).
 */

const TODO_API_BASE = 'http://localhost:3003';

/**
 * @param {Object} params
 * @param {import('axios').AxiosInstance} params.api
 */
export async function fetchAllTodos({ api }) {
  const url = `${TODO_API_BASE}/todos`;
  const { data } = await api.get(url);
  return data;
}

/**
 * @param {Object} params
 * @param {import('axios').AxiosInstance} params.api
 * @param {number|string} params.todoID
 * @param {string} [params.currentUser]
 */
export async function completeTodoAPI({ api, todoID, currentUser }) {
  const url = `${TODO_API_BASE}/todo/complete`;
  const { data } = await api.post(url, {
    todoID: Number(todoID),
    currentUser: currentUser || '',
  });
  return data;
}

/**
 * @param {Object} params
 * @param {import('axios').AxiosInstance} params.api
 * @param {number|string} params.todoID
 * @param {string} [params.currentUser]
 */
export async function openTodoAPI({ api, todoID, currentUser }) {
  const url = `${TODO_API_BASE}/todo/open`;
  const { data } = await api.post(url, {
    todoID: Number(todoID),
    currentUser: currentUser || '',
  });
  return data;
}
