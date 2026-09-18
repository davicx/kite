import React, { useContext, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import apiFunctions from '../functions/apiFunctions';
import { LoginContext } from '../functions/context/LoginContext';
import { AtlasFindingsContext } from '../functions/context/AtlasFindingsContext';
import { sendMessageAPI } from '../functions/api/chatAPI';
import { toSelectedFinding } from '../functions/findings/selectedFinding';
import {
  groupFriendlyS3FindingsByBucket,
  collectS3FindingsFromScan,
  buildS3EnvironmentSummary,
  buildFriendlyS3Buckets,
} from '../functions/findings/s3FindingDisplay';
import {
  collectEC2FindingsFromScan,
  groupFriendlyEC2FindingsByInstance,
  buildFriendlyEC2Instances,
} from '../functions/findings/ec2FindingDisplay';
import {
  getCurrentScanKind,
  getNavigatorScanMeta,
  buildScanCompleteCopy,
} from '../functions/findings/currentScan';
import NavigatorDataRenderer from '../components/navigator/NavigatorDataRenderer';
import FriendlyFindingsTable from '../components/dashboard/FriendlyFindingsTable';
import S3EnvironmentSummary from '../components/dashboard/S3EnvironmentSummary';
import S3ScanEmptyState from '../components/dashboard/S3ScanEmptyState';
import FriendlyS3BucketsTable from '../components/dashboard/FriendlyS3BucketsTable';
import FriendlyEC2InstancesTable from '../components/dashboard/FriendlyEC2InstancesTable';
import FriendlyScanComplete from '../components/dashboard/FriendlyScanComplete';
import '../components/dashboard/friendlyDashboard.css';

const api = apiFunctions.getAPI();
const DEMO_GROUP_ID = 70;

function extractNavigatorData(response) {
  return response?.data?.atlasResponse?.navigatorResponse?.data || null;
}

function DashboardPage() {
  const { currentUser: contextUser } = useContext(LoginContext);
  const {
    findings: findingsFromContext,
    setFindings,
    navigatorData,
    setNavigatorData,
    selectedFinding,
    setSelectedFinding,
    chatContext,
  } = useContext(AtlasFindingsContext) || {};
  const findings = findingsFromContext ?? [];
  const [undoLoading, setUndoLoading] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const navigate = useNavigate();
  const s3Findings = useMemo(
    () => collectS3FindingsFromScan({ findings, navigatorData }),
    [findings, navigatorData]
  );
  const s3FindingGroups = useMemo(
    () => groupFriendlyS3FindingsByBucket(s3Findings),
    [s3Findings]
  );
  const s3Summary = useMemo(
    () => buildS3EnvironmentSummary(s3FindingGroups),
    [s3FindingGroups]
  );
  const s3Buckets = useMemo(
    () => buildFriendlyS3Buckets({ navigatorData, findingGroups: s3FindingGroups }),
    [navigatorData, s3FindingGroups]
  );
  const hasS3Findings = s3FindingGroups.length > 0;
  const ec2Findings = useMemo(
    () => collectEC2FindingsFromScan({ findings, navigatorData }),
    [findings, navigatorData]
  );
  const ec2FindingGroups = useMemo(
    () => groupFriendlyEC2FindingsByInstance(ec2Findings),
    [ec2Findings]
  );
  const hasEC2Findings = ec2FindingGroups.length > 0;
  const ec2Instances = useMemo(
    () => buildFriendlyEC2Instances({ navigatorData, findingGroups: ec2FindingGroups }),
    [navigatorData, ec2FindingGroups]
  );
  const currentScanKind = useMemo(
    () => getCurrentScanKind(navigatorData),
    [navigatorData]
  );
  const scanMeta = useMemo(
    () => getNavigatorScanMeta(navigatorData),
    [navigatorData]
  );
  const scanCompleteCopy = useMemo(
    () => buildScanCompleteCopy(currentScanKind, scanMeta),
    [currentScanKind, scanMeta]
  );

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

  const handleFriendlyFindingAction = useCallback(
    (finding) => {
      handleSelectFinding({
        ...finding,
        title: finding.friendlyTitle || finding.title,
        service: finding.service || 's3',
      });
      navigate('/chat');
    },
    [handleSelectFinding, navigate]
  );

  const handleReviewFindings = useCallback(() => {
    const findingsSection = document.getElementById('s3-findings');
    if (findingsSection && typeof findingsSection.scrollIntoView === 'function') {
      findingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleScanAws = useCallback(async () => {
    const stored = localStorage.getItem('localStorageCurrentUser');
    const storedUser = stored ? JSON.parse(stored) : null;
    const username =
      (contextUser && contextUser !== 'null' ? contextUser : null) ||
      chatContext?.username ||
      storedUser ||
      'anonymous';
    const groupID = chatContext?.groupID || DEMO_GROUP_ID;
    const conversationID = chatContext?.conversationID || 0;

    setScanLoading(true);
    try {
      const response = await sendMessageAPI({
        api,
        payload: {
          username,
          groupID,
          conversationID,
          message: 'scan s3',
        },
      });
      const atlasResponse = response?.data?.atlasResponse || null;
      const navigatorFromScan = atlasResponse?.navigatorResponse?.data || null;

      if (typeof setNavigatorData === 'function' && navigatorFromScan) {
        setNavigatorData(navigatorFromScan);
      }
      if (typeof setFindings === 'function') {
        if (Array.isArray(atlasResponse?.findings)) {
          setFindings(atlasResponse.findings);
        } else if (navigatorFromScan) {
          setFindings([]);
        }
      }
    } catch (error) {
      window.alert('S3 scan failed. Check that you are logged in and the API is running.');
    } finally {
      setScanLoading(false);
    }
  }, [chatContext, contextUser, setFindings, setNavigatorData]);

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
            {!currentScanKind && (
              <S3ScanEmptyState onScan={handleScanAws} scanning={scanLoading} />
            )}

            {currentScanKind === 's3' && (
              <>
                <FriendlyS3BucketsTable buckets={s3Buckets} />
                {hasS3Findings ? (
                  <>
                    <S3EnvironmentSummary
                      summary={s3Summary}
                      onReviewFindings={handleReviewFindings}
                    />
                    <FriendlyFindingsTable
                      groups={s3FindingGroups}
                      onFindingAction={handleFriendlyFindingAction}
                      sectionId="s3-findings"
                      title="Findings"
                    />
                  </>
                ) : (
                  <FriendlyScanComplete
                    title={scanCompleteCopy.title}
                    headline={scanCompleteCopy.headline}
                    detail={scanCompleteCopy.detail}
                  />
                )}
              </>
            )}

            {currentScanKind === 'ec2' && (
              <>
                <FriendlyEC2InstancesTable instances={ec2Instances} />
                {hasEC2Findings ? (
                  <FriendlyFindingsTable
                    groups={ec2FindingGroups}
                    onFindingAction={handleFriendlyFindingAction}
                    sectionId="ec2-findings"
                    title="Findings"
                  />
                ) : (
                  <FriendlyScanComplete
                    title={scanCompleteCopy.title}
                    headline={scanCompleteCopy.headline}
                    detail={scanCompleteCopy.detail}
                  />
                )}
              </>
            )}

            {hasNavigatorData && (
              <button
                type="button"
                className="friendly-original-toggle"
                onClick={() => setShowTechnicalDetails((current) => !current)}
              >
                {showTechnicalDetails ? 'Hide original tables' : 'View original tables'}
              </button>
            )}

            {showTechnicalDetails && hasNavigatorData && (
              <NavigatorDataRenderer
                navigatorData={navigatorData}
                onUndoLatest={handleUndoLatest}
                undoLoading={undoLoading}
                onSelectFinding={handleSelectFinding}
                selectedFinding={selectedFinding}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
