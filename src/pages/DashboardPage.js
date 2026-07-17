import React, { useContext, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import apiFunctions from '../functions/apiFunctions';
import { AtlasFindingsContext } from '../functions/context/AtlasFindingsContext';
import { sendMessageAPI } from '../functions/api/chatAPI';
import { toSelectedFinding } from '../functions/findings/selectedFinding';
import NavigatorDataRenderer from '../components/navigator/NavigatorDataRenderer';
import ChatInstructionsPanel from '../components/chat/ChatInstructionsPanel';

const api = apiFunctions.getAPI();

function extractNavigatorData(response) {
  return response?.data?.atlasResponse?.navigatorResponse?.data || null;
}

function DashboardPage() {
  const {
    findings: findingsFromContext,
    navigatorData,
    setNavigatorData,
    instructionsData,
    selectedFinding,
    setSelectedFinding,
    chatContext,
  } = useContext(AtlasFindingsContext) || {};
  const findings = findingsFromContext ?? [];
  const [undoLoading, setUndoLoading] = useState(false);

  const hasInstructions =
    instructionsData &&
    instructionsData.type === 'instructions' &&
    Array.isArray(instructionsData.steps) &&
    instructionsData.steps.length > 0;

  const hasNavigatorData =
    navigatorData &&
    (
      (Array.isArray(navigatorData.stats) && navigatorData.stats.length > 0) ||
      (Array.isArray(navigatorData.tables) && navigatorData.tables.length > 0) ||
      (Array.isArray(navigatorData.alerts) && navigatorData.alerts.length > 0) ||
      (Array.isArray(navigatorData.cards) && navigatorData.cards.length > 0)
    );

  const handleSelectFinding = useCallback(
    (source) => {
      if (typeof setSelectedFinding !== 'function') {
        return;
      }

      let next = toSelectedFinding(source);

      // Prefer full finding fields when Navigator row was clicked
      if (next && Array.isArray(findings) && findings.length > 0) {
        const match = findings.find((finding) => {
          if (next.instanceId && finding.resourceID === next.instanceId) {
            if (!next.title || finding.title === next.title) {
              return true;
            }
          }
          return false;
        });

        if (match) {
          next = toSelectedFinding(match) || next;
        }
      }

      if (next) {
        setSelectedFinding(next);
      }
    },
    [setSelectedFinding, findings]
  );

  const handleUndoLatest = useCallback(
    async (confirmMessage) => {
      const conversationID = chatContext?.conversationID;
      const groupID = chatContext?.groupID ?? 70;
      const username = chatContext?.username || 'anonymous';

      if (!conversationID || conversationID <= 0) {
        window.alert('Select a conversation in Chat first.');
        return;
      }

      if (!window.confirm(confirmMessage || 'Undo the most recent change?')) {
        return;
      }

      setUndoLoading(true);

      try {
        const payload = {
          username,
          groupID,
          conversationID,
        };

        await sendMessageAPI({ api, payload: { ...payload, message: 'undo' } });

        const historyResponse = await sendMessageAPI({
          api,
          payload: { ...payload, message: 'show my recent history' },
        });
        const refreshedNavigator = extractNavigatorData(historyResponse);

        if (typeof setNavigatorData === 'function' && refreshedNavigator) {
          setNavigatorData(refreshedNavigator);
        }
      } catch (error) {
        window.alert(
          'Undo failed. Try again from Chat or check that you are logged in.'
        );
      } finally {
        setUndoLoading(false);
      }
    },
    [chatContext, setNavigatorData]
  );

  const selectedInstanceId = selectedFinding?.instanceId || null;
  const selectedTitle = selectedFinding?.title || null;

  return (
    <div
      className="d-flex flex-column bg-light"
      style={{
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <header
        className="bg-white border-bottom shadow-sm py-2 flex-shrink-0"
        style={{ position: 'relative', height: 'auto', width: '100%' }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between px-4">
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex align-items-center">
              <span className="text-dark fs-5 fw-bold me-0" style={{ fontFamily: 'monospace' }}>{'{'}</span>
              <div
                className="d-flex align-items-center justify-content-center rounded-2 mx-1"
                style={{ width: 36, height: 36, backgroundColor: '#1a1a1a' }}
              >
                <span className="text-white fw-bold">B</span>
              </div>
              <span className="text-dark fs-5 fw-bold ms-0" style={{ fontFamily: 'monospace' }}>{'}'}</span>
            </div>
            <nav className="d-flex gap-3">
              <Link to="/chat" className="text-decoration-none text-dark">Chat</Link>
              <Link to="/dashboard" className="text-decoration-none text-dark">Dashboard</Link>
              <Link to="/todos" className="text-decoration-none text-dark">To Dos</Link>
            </nav>
          </div>
          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              className="form-control border-0 bg-light rounded-3"
              placeholder="Search..."
              style={{ width: 200 }}
            />
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36, backgroundColor: '#6c5ce7' }}
              >
                <span className="text-white fw-bold small">U</span>
              </div>
              <span className="ms-1 text-muted" style={{ fontSize: 10 }}>▼</span>
            </div>
          </div>
        </div>
      </header>


      <main
        className="d-flex flex-column flex-grow-1 bg-light mx-auto overflow-auto"
        style={{ maxWidth: 1100, flex: 1, minHeight: 0, minWidth: 0, width: '100%' }}>
        <div className="px-4 pt-3 pb-0 flex-shrink-0">
          <h1 className="h5 mb-0">Dashboard</h1>
        </div>

        <div
          className="flex-grow-1 d-flex flex-column p-4"
          style={{ flex: 1, minHeight: 0 }}
        >
          <div
            className="bg-white rounded-3 shadow-sm flex-grow-1 overflow-auto p-4 mb-3"
            style={{ minHeight: 0, flex: 1 }}
          >
            {hasInstructions && (
              <div className="mb-4">
                <ChatInstructionsPanel instructions={instructionsData} />
              </div>
            )}

            {hasNavigatorData ? (
              <NavigatorDataRenderer
                navigatorData={navigatorData}
                onUndoLatest={handleUndoLatest}
                undoLoading={undoLoading}
                onSelectFinding={handleSelectFinding}
                selectedFinding={selectedFinding}
              />
            ) : (
              <>
                <p className="text-muted small mb-2">
                  Click a finding row to ask about it in Chat.
                </p>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Severity</th>
                      <th scope="col">Resource</th>
                      <th scope="col">Issue</th>
                      <th scope="col">Recommendation</th>
                      <th scope="col">Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {findings.map((finding) => {
                      const isSelected =
                        selectedInstanceId &&
                        finding.resourceID === selectedInstanceId &&
                        (!selectedTitle || finding.title === selectedTitle);

                      return (
                        <tr
                          key={finding.findingID}
                          role="button"
                          className={isSelected ? 'table-primary' : undefined}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSelectFinding(finding)}
                        >
                          <td>{finding.severity}</td>
                          <td>{finding.resourceName}</td>
                          <td>{finding.title}</td>
                          <td>{finding.recommendation}</td>
                          <td>{`$${finding.estimatedMonthlySavings}`}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {findings.length === 0 && !hasInstructions && (
                  <p className="text-muted small mb-0">
                    Run an EC2 scan or type &quot;show my recent history&quot; in Chat to populate this view.
                    Choose Instructions (1) in Chat to show a walkthrough here.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
