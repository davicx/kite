import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchConversationsForGroup, createConversationAPI } from '../../functions/api/chatAPI';

/**
 * Left column: list group conversations + new conversation (modal).
 * Pattern mirrors PostList + NewPost (React Query list + mutation cache update).
 */
function ChatConversationSidebar({
  groupID,
  api,
  currentUser,
  selectedConversationID,
  onSelectConversation,
}) {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const resolvedUser =
    currentUser && currentUser !== 'null' ? currentUser : '';

  const { isLoading, data, isError, error } = useQuery(
    ['group-conversations', groupID],
    () => fetchConversationsForGroup({ api, groupID }),
    { staleTime: 30_000 }
  );

  const conversations = data?.data ?? [];

  useEffect(() => {
    if (
      selectedConversationID == null &&
      conversations.length > 0 &&
      !isLoading
    ) {
      onSelectConversation(conversations[0].conversationID);
    }
  }, [conversations, isLoading, selectedConversationID, onSelectConversation]);

  const { mutate: createConversation, isLoading: creating } = useMutation(
    (title) =>
      createConversationAPI({
        api,
        body: {
          groupID,
          conversationTitle: title.trim() || 'New conversation',
          createdBy: resolvedUser || 'anonymous',
        },
      }),
    {
      onSuccess: (res) => {
        const newConv = res?.data;
        queryClient.setQueryData(['group-conversations', groupID], (prev) => {
          const prevList = prev?.data ? [...prev.data] : [];
          if (newConv) {
            prevList.push(newConv);
          }
          return { ...prev, data: prevList, success: true };
        });
        if (newConv?.conversationID != null) {
          onSelectConversation(newConv.conversationID);
        }
        setNewTitle('');
        setShowModal(false);
      },
    }
  );

  const openModal = () => {
    setNewTitle('');
    setShowModal(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (creating) return;
    createConversation(newTitle || 'New conversation');
  };

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 bg-body-secondary border-end h-100 min-h-0"
        style={{ width: 280 }}
      >
        <div className="flex-shrink-0 px-3 pt-3 pb-2">
          <div className="d-flex align-items-center text-body-emphasis">
            <span className="fs-6 fw-semibold">Conversations</span>
          </div>
          <p className="small text-muted mb-2 mb-md-0">Group {groupID}</p>
          <hr className="my-2" />
        </div>

        <div className="flex-grow-1 overflow-auto min-h-0 px-3">
          {isLoading && <p className="small text-muted">Loading…</p>}
          {isError && (
            <p className="small text-danger">
              {error?.message || 'Could not load conversations'}
            </p>
          )}

          <ul className="nav nav-pills flex-column gap-1 pb-2">
            {conversations.map((c) => {
              const active = c.conversationID === selectedConversationID;
              const label = c.conversationTitle || `Thread ${c.conversationID}`;
              return (
                <li className="nav-item" key={c.conversationID}>
                  <button
                    type="button"
                    className={`nav-link w-100 text-start py-2 ${
                      active ? 'active' : 'link-body-emphasis'
                    }`}
                    onClick={() => onSelectConversation(c.conversationID)}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>

          {!isLoading && conversations.length === 0 && !isError && (
            <p className="small text-muted">No conversations yet.</p>
          )}
        </div>

        <div className="flex-shrink-0 px-3 pb-3 pt-2 border-top">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm w-100"
            onClick={openModal}
          >
            New conversation
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
          onClick={() => !creating && setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title h5">New conversation</h2>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  disabled={creating}
                  onClick={() => setShowModal(false)}
                />
              </div>
              <form onSubmit={handleModalSubmit}>
                <div className="modal-body">
                  <label htmlFor="chat-new-conv-title" className="form-label">
                    Name (e.g. Sailing, Hiking)
                  </label>
                  <input
                    id="chat-new-conv-title"
                    type="text"
                    className="form-control"
                    placeholder="Conversation name"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    autoFocus
                    disabled={creating}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={creating}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={creating}
                  >
                    {creating ? 'Creating…' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatConversationSidebar;
