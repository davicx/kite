import { useMutation, useQueryClient } from 'react-query';
import { sendMessageAPI } from '../functions/api/chatAPI';

/**
 * Hook for sending chat messages via React Query mutation.
 * Ready for future: invalidate ['chat-messages'] when polling/sync is added.
 *
 * @param {Object} api - Axios instance from apiFunctions.getAPI()
 * @param {string} username - Current user (from LoginContext / localStorage)
 * @returns {{ sendMessage: Function, isLoading: boolean, isError: boolean, error: Error | null }}
 */
export function useSendMessage(api, username) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (message) => {
      const resolvedUsername =
        username && username !== 'null' ? username : 'anonymous';
      const payload = {
        username: resolvedUsername,
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };
      return sendMessageAPI({ api, payload });
    },
    {
      onSuccess: () => {
        // Future: invalidate chat messages when we add polling/sync
        // queryClient.invalidateQueries(['chat-messages']);
      },
    }
  );

  return {
    sendMessage: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
}
