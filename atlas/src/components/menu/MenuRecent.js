import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import MenuIcon from './MenuIcon';
import apiFunctions from '../../functions/apiFunctions';
import { fetchRecentScans } from '../../functions/api/scanAPI';
import { AtlasFindingsContext } from '../../functions/context/AtlasFindingsContext';
import { ChatConversationContext } from '../../functions/context/ChatConversationContext';

const api = apiFunctions.getAPI();

function MenuRecent() {
  const navigate = useNavigate();
  const { conversationID } = useContext(ChatConversationContext);
  const { loadScanByID } = useContext(AtlasFindingsContext) || {};
  const { data, isLoading, isError } = useQuery(
    ['scan-recents', conversationID],
    () => fetchRecentScans({ api, conversationID, limit: 3 }),
    {
      enabled: conversationID != null && Number(conversationID) > 0,
      staleTime: 30_000,
      refetchOnWindowFocus: true,
    }
  );
  const scans = Array.isArray(data?.data) ? data.data : [];

  async function openScan(scanID) {
    if (typeof loadScanByID !== 'function') {
      return;
    }
    const restored = await loadScanByID(scanID);
    if (restored) {
      navigate('/dashboard');
    }
  }

  return (
    <section className="menu-section">
      <h2 className="menu-section-title">Recent</h2>
      <nav className="menu-items" aria-label="Recent">
        {isLoading ? (
          <span className="menu-item-label" style={{ padding: '8px 12px' }}>
            Loading…
          </span>
        ) : null}
        {isError ? (
          <span className="menu-item-label" style={{ padding: '8px 12px' }}>
            Recents unavailable
          </span>
        ) : null}
        {!isLoading && !isError && scans.length === 0 ? (
          <span className="menu-item-label" style={{ padding: '8px 12px' }}>
            No recent scans
          </span>
        ) : null}
        {scans.map((scan) => (
          <button
            key={scan.id}
            type="button"
            className="menu-item"
            onClick={() => openScan(scan.id)}
            title={`${String(scan.service || '').toUpperCase()} · ${
              scan.region || 'all regions'
            } · ${scan.findingCount || 0} findings`}
          >
            <MenuIcon name="recent" />
            <span className="menu-item-label">{scan.scanName}</span>
          </button>
        ))}
      </nav>
    </section>
  );
}

export default MenuRecent;
