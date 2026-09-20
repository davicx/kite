import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';

import MenuIcon from './MenuIcon';
import apiFunctions from '../../functions/apiFunctions';
import { fetchConversationsForGroup } from '../../functions/api/chatAPI';
import { ChatConversationContext } from '../../functions/context/ChatConversationContext';

const api = apiFunctions.getAPI();
const DEMO_GROUP_ID = 70;

/** Temp demo pages — design mocks in Projects for MVP. */
const DEMO_PROJECTS = [
  { path: '/findings', label: 'S3 Findings' },
  { path: '/individual-finding', label: 'Bucket details' },
  { path: '/ticket', label: 'Incident ticket' },
  { path: '/simple', label: 'Landing (sky)' },
];

function MenuProjects() {
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationID, setConversationID } = useContext(
    ChatConversationContext
  );

  const { isLoading, data, isError, error } = useQuery(
    ['group-conversations', DEMO_GROUP_ID],
    () => fetchConversationsForGroup({ api, groupID: DEMO_GROUP_ID }),
    { staleTime: 30_000 }
  );

  const conversations = Array.isArray(data?.data) ? data.data : [];

  useEffect(() => {
    if (conversationID == null && conversations.length > 0 && !isLoading) {
      const first = conversations[0];
      const id = first?.conversationID ?? first?.conversation_id ?? null;
      if (id != null && Number(id) > 0) {
        setConversationID(Number(id));
      }
    }
  }, [conversations, isLoading, conversationID, setConversationID]);

  function selectConversation(id) {
    setConversationID(Number(id));
    if (location.pathname !== '/chat') {
      navigate('/chat');
    }
  }

  return (
    <section className="menu-section">
      <h2 className="menu-section-title">Projects</h2>
      <nav className="menu-items" aria-label="Projects">
        {isLoading ? (
          <p className="menu-item-label" style={{ padding: '8px 12px' }}>
            Loading…
          </p>
        ) : null}
        {isError ? (
          <p className="menu-item-label" style={{ padding: '8px 12px' }}>
            {error?.message || 'Could not load projects'}
          </p>
        ) : null}
        {conversations.map((c) => {
          const id = Number(c.conversationID ?? c.conversation_id);
          const label =
            c.conversationTitle || c.conversation_title || `Thread ${id}`;
          const active =
            location.pathname === '/chat' &&
            conversationID != null &&
            Number(conversationID) === id;
          return (
            <button
              key={id}
              type="button"
              className={active ? 'menu-item menu-item-active' : 'menu-item'}
              onClick={() => selectConversation(id)}
            >
              <MenuIcon name="project" />
              <span className="menu-item-label">{label}</span>
            </button>
          );
        })}
        {DEMO_PROJECTS.map((demo) => {
          const active = location.pathname === demo.path;
          return (
            <button
              key={demo.path}
              type="button"
              className={active ? 'menu-item menu-item-active' : 'menu-item'}
              onClick={() => navigate(demo.path)}
            >
              <MenuIcon name="project" />
              <span className="menu-item-label">{demo.label}</span>
            </button>
          );
        })}
      </nav>
    </section>
  );
}

export default MenuProjects;
