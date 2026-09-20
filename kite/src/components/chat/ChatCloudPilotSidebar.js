import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchConversationsForGroup, createConversationAPI } from '../../functions/api/chatAPI';

/**
 * Bootstrap-style Cloud Pilot sidebar (new).
 * Original ChatConversationSidebar.js is untouched — switch in ChatPage.
 */
function BiIcon({ name, width = 16, height = 16, className = '' }) {
  return (
    <svg
      className={`bi pe-none ${className}`.trim()}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/bootstrap-icons.svg#${name}`} />
    </svg>
  );
}

function ChatCloudPilotSidebar({
  groupID,
  api,
  currentUser,
  selectedConversationID,
  onSelectConversation,
}) {
  const location = useLocation();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const resolvedUser =
    currentUser && currentUser !== 'null' ? currentUser : '';

  const homeActive = location.pathname === '/chat';
  const dashboardActive = location.pathname === '/dashboard';
  const todoActive = location.pathname === '/todos';

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
        className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary border-end h-100 min-h-0"
        style={{ width: 280 }}
      >
        <Link
          to="/chat"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <BiIcon name="cloud" width={40} height={32} className="me-2" />
          <span className="fs-4">Cloud Pilot</span>
        </Link>

        <hr />

        <ul className="nav nav-pills flex-column mb-auto gap-1">
          <li className="nav-item">
            <Link
              to="/chat"
              className={`nav-link d-flex align-items-center ${
                homeActive ? 'active' : 'link-body-emphasis'
              }`}
              aria-current={homeActive ? 'page' : undefined}
            >
              <BiIcon name="house" className="me-2" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`nav-link d-flex align-items-center ${
                dashboardActive ? 'active' : 'link-body-emphasis'
              }`}
              aria-current={dashboardActive ? 'page' : undefined}
            >
              <BiIcon name="speedometer2" className="me-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <span className="nav-link link-body-emphasis d-flex align-items-center">
              <BiIcon name="chat-dots" className="me-2" />
              New Chat
            </span>
          </li>
          <li>
            <span className="nav-link link-body-emphasis d-flex align-items-center">
              <BiIcon name="people" className="me-2" />
              Friends
            </span>
          </li>
          <li>
            <span className="nav-link link-body-emphasis d-flex align-items-center">
              <BiIcon name="grid" className="me-2" />
              Applications
            </span>
          </li>
          <li>
            <Link
              to="/todos"
              className={`nav-link d-flex align-items-center ${
                todoActive ? 'active' : 'link-body-emphasis'
              }`}
              aria-current={todoActive ? 'page' : undefined}
            >
              <BiIcon name="check2-square" className="me-2" />
              To Do
            </Link>
          </li>
          <li>
            <span className="nav-link link-body-emphasis d-flex align-items-center">
              <BiIcon name="bell" className="me-2" />
              Notifications
            </span>
          </li>
        </ul>

        <hr />

        <div className="flex-shrink-0 mb-1">
          <span className="small text-muted text-uppercase fw-semibold">
            Projects
          </span>
        </div>
        <ul className="nav nav-pills flex-column mb-2 gap-1">
          <li>
            <span className="nav-link link-body-emphasis">Kite</span>
          </li>
        </ul>

        <hr />

        <div className="flex-shrink-0 mb-1">
          <span className="small text-muted text-uppercase fw-semibold">
            Conversations
          </span>
        </div>

        <div className="flex-grow-1 overflow-auto min-h-0 mb-2">
          {isLoading && <p className="small text-muted mb-0">Loading…</p>}
          {isError && (
            <p className="small text-danger mb-0">
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
                    className={`nav-link w-100 text-start ${
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
            <p className="small text-muted mb-0">No conversations yet.</p>
          )}
        </div>

        <div className="flex-shrink-0 pt-2 border-top">
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
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
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
                  <label htmlFor="cloud-pilot-new-conv-title" className="form-label">
                    Name (e.g. Sailing, Hiking)
                  </label>
                  <input
                    id="cloud-pilot-new-conv-title"
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

export default ChatCloudPilotSidebar;
