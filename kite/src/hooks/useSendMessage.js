import { useMutation, useQueryClient } from 'react-query';
import { useRef, useEffect } from 'react';
import { sendMessageAPI } from '../functions/api/chatAPI';

/**
 * @param {Object} api - Axios instance from apiFunctions.getAPI()
 * @param {string} username - Current user
 * @param {Object} opts
 * @param {number} opts.groupID
 * @param {number} opts.conversationID
 * @param {Object|null} [opts.selectedFinding]
 * @param {function} [opts.onResponse] - called with API body after a successful send
 */
export function useSendMessage(
  api,
  username,
  { groupID, conversationID, selectedFinding, onResponse }
) {
  const queryClient = useQueryClient();
  const onResponseRef = useRef(onResponse);

  useEffect(() => {
    onResponseRef.current = onResponse;
  }, [onResponse]);

  const mutation = useMutation(
    (message) => {
      const resolvedUsername =
        username && username !== 'null' ? username : 'anonymous';
      const payload = {
        username: resolvedUsername,
        message: message.trim(),
        timestamp: new Date().toISOString(),
        groupID,
        conversationID,
      };

      if (selectedFinding) {
        payload.selectedFinding = selectedFinding;
      }

      return sendMessageAPI({
        api,
        payload,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['chat-messages', groupID, conversationID]);
        if (typeof onResponseRef.current === 'function') {
          onResponseRef.current(data);
        }
      },
    }
  );

  return {
    sendMessage: mutation.mutate,
    sendMessageAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
}
