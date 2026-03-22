import { useMutation, useQueryClient } from 'react-query';
import { sendMessageAPI } from '../functions/api/chatAPI';

/**
 * @param {Object} api - Axios instance from apiFunctions.getAPI()
 * @param {string} username - Current user
 * @param {Object} opts
 * @param {number} opts.groupID
 * @param {number} opts.conversationID
 */
export function useSendMessage(api, username, { groupID, conversationID }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (message) => {
      const resolvedUsername =
        username && username !== 'null' ? username : 'anonymous';
      return sendMessageAPI({
        api,
        payload: {
          username: resolvedUsername,
          message: message.trim(),
          timestamp: new Date().toISOString(),
          groupID,
          conversationID,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['chat-messages', groupID, conversationID]);
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
