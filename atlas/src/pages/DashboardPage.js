import React, { useState, useContext, useMemo, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import ChatMessages from '../components/chat/ChatMessages';
import { LoginContext } from '../functions/context/LoginContext';
import { ChatConversationContext } from '../functions/context/ChatConversationContext';
import { AtlasFindingsContext } from '../functions/context/AtlasFindingsContext';
import apiFunctions from '../functions/apiFunctions';
import {
  sendMessageAPI,
  fetchConversationMessages,
} from '../functions/api/chatAPI';
import { normalizeScanResult } from '../functions/scan/normalizeScanResult';
import { readAtlasScan } from '../functions/scan/readAtlasScan';
import {
  collectS3FindingsFromScan,
  groupFriendlyS3FindingsByBucket,
  buildFriendlyS3Buckets,
  buildS3EnvironmentSummary,
} from '../functions/findings/s3FindingDisplay';
import {
  collectEC2FindingsFromScan,
  groupFriendlyEC2FindingsByInstance,
  buildFriendlyEC2Instances,
} from '../functions/findings/ec2FindingDisplay';
import { getNavigatorScanMeta } from '../functions/findings/currentScan';
import { buildS3VersioningFixContext } from '../functions/findings/s3VersioningFixContext';

const api = apiFunctions.getAPI();
const DEMO_GROUP_ID = 70;
const POLL_MS = 4000;

function FindingsTable({ findings, resourceName, onReview }) {
  const rows = Array.isArray(findings) ? findings : [];

  return (
    <section className="dcp-card">
      <div className="dcp-card-header">
        <div>
          <div className="dcp-card-title">Findings</div>
          <div className="dcp-card-meta">
            {rows.length} finding{rows.length === 1 ? '' : 's'} for this resource
          </div>
        </div>
      </div>
      <div className="dcp-table-scroll">
        <table>
          <thead>
            <tr>
              <th>Finding</th>
              <th>Priority</th>
              <th>What this means</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((finding) => {
              const priority = String(
                finding.severity || finding.friendlyPriority || 'low'
              ).toLowerCase();
              const key =
                finding.findingID ||
                finding.id ||
                `${finding.friendlyTitle}-${finding.ruleID || ''}`;
              return (
                <tr key={key}>
                  <td className="dcp-bucket-name">
                    {finding.friendlyTitle || finding.title}
                  </td>
                  <td>
                    <span className={`dcp-priority ${priority}`}>
                      ● {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </span>
                  </td>
                  <td className="dcp-region">
                    {finding.friendlyMeaning || finding.description}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="dcp-fix"
                      onClick={() => onReview(finding, resourceName)}
                    >
                      {finding.friendlyAction || 'Review'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/**
 * Live dashboard + real CloudPilot chat on the active project.
 * Level 1 is the resource list. Level 2 is one bucket or instance.
 */
function DashboardPage() {
  const { currentUser } = useContext(LoginContext);
  const { conversationID } = useContext(ChatConversationContext);
  const {
    scan,
    setScan,
    scanToken,
    listToken,
    isRestoringScan,
    restoreError,
  } = useContext(AtlasFindingsContext) || {};
  const queryClient = useQueryClient();
  const [chatClosed, setChatClosed] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [scanCard, setScanCard] = useState(null);
  const [path, setPath] = useState([]);
  const [localNotes, setLocalNotes] = useState([]);

  const displayName =
    currentUser && currentUser !== 'null' ? currentUser : 'anonymous';

  useEffect(() => {
    setScanCard(null);
    setLocalNotes([]);
  }, [conversationID]);

  useEffect(() => {
    setPath([]);
  }, [scanToken, listToken]);

  const {
    data: messagesRes,
    isLoading: messagesLoading,
    isError: messagesError,
    error: messagesErr,
  } = useQuery(
    ['chat-messages', DEMO_GROUP_ID, conversationID],
    () =>
      fetchConversationMessages({
        api,
        conversationID,
      }),
    {
      enabled: conversationID != null && conversationID > 0,
      refetchInterval: POLL_MS,
      refetchOnWindowFocus: true,
    }
  );

  const messages = useMemo(() => {
    const rows = Array.isArray(messagesRes?.data) ? messagesRes.data : [];
    return rows.map((row) => {
      const from = row?.messageFrom != null ? String(row.messageFrom) : '';
      const isUser = Boolean(from) && from === displayName;
      return {
        id:
          row?.messageID != null
            ? String(row.messageID)
            : `row-${from}-${row?.messageCaption ?? ''}`,
        role: isUser ? 'user' : 'assistant',
        content: String(row?.messageCaption ?? ''),
      };
    });
  }, [messagesRes, displayName]);

  const findings = useMemo(() => scan?.findings || [], [scan]);
  const navigatorData = scan?.navigatorData || null;
  const service = scan?.service || null;
  const scanMeta = useMemo(
    () => getNavigatorScanMeta(navigatorData),
    [navigatorData]
  );

  const s3Findings = useMemo(
    () => collectS3FindingsFromScan({ findings, navigatorData }),
    [findings, navigatorData]
  );
  const s3Groups = useMemo(
    () => groupFriendlyS3FindingsByBucket(s3Findings),
    [s3Findings]
  );
  const s3Buckets = useMemo(
    () => buildFriendlyS3Buckets({ navigatorData, findingGroups: s3Groups }),
    [navigatorData, s3Groups]
  );
  const s3Summary = useMemo(
    () => buildS3EnvironmentSummary(s3Groups),
    [s3Groups]
  );

  const ec2Findings = useMemo(
    () => collectEC2FindingsFromScan({ findings, navigatorData }),
    [findings, navigatorData]
  );
  const ec2Groups = useMemo(
    () => groupFriendlyEC2FindingsByInstance(ec2Findings),
    [ec2Findings]
  );
  const ec2Instances = useMemo(
    () => buildFriendlyEC2Instances({ navigatorData, findingGroups: ec2Groups }),
    [navigatorData, ec2Groups]
  );

  const selected = path[0] || null;
  const selectedBucket =
    service === 's3' && selected
      ? s3Buckets.find((bucket) => bucket.bucketName === selected.id) || null
      : null;
  const selectedBucketFindings =
    selectedBucket &&
    (s3Groups.find((group) => group.bucketName === selectedBucket.bucketName)
      ?.findings ||
      []);
  const selectedInstance =
    service === 'ec2' && selected
      ? ec2Instances.find(
          (instance) =>
            (instance.instanceId || instance.instanceName) === selected.id
        ) || null
      : null;
  const selectedInstanceFindings =
    selectedInstance &&
    (ec2Groups.find((group) => group.groupName === selectedInstance.instanceName)
      ?.findings ||
      []);

  const chatMessages = useMemo(
    () => [...messages, ...localNotes],
    [messages, localNotes]
  );

  function openChat() {
    setChatClosed(false);
  }

  function closeChat() {
    setChatClosed(true);
  }

  function toggleChat() {
    setChatClosed((current) => !current);
  }

  function renderPageActions(scanLabel) {
    return (
      <div className="dcp-page-actions">
        <button
          type="button"
          className="dcp-secondary-button"
          onClick={toggleChat}
        >
          {chatClosed ? '✦ Ask CloudPilot' : '× Close CloudPilot'}
        </button>
        <button
          type="button"
          className="dcp-scan-button"
          onClick={openChat}
        >
          {scanLabel}
        </button>
      </div>
    );
  }

  function addChatNote(content) {
    setLocalNotes((current) => [
      ...current,
      {
        id: `note-${Date.now()}`,
        role: 'assistant',
        content,
      },
    ]);
    setChatClosed(false);
  }

  function showAllResources() {
    setPath([]);
  }

  function openResource(resource) {
    setPath([resource]);
    setChatClosed(false);
  }

  function reviewAllFindings() {
    addChatNote('Review all findings is coming soon.');
  }

  async function reviewFinding(finding, resourceName) {
    const fixContext = buildS3VersioningFixContext({
      finding,
      resourceName,
      scanSnapshotId: scan && scan.snapshotID,
    });

    if (!fixContext) {
      const title = finding.friendlyTitle || finding.title || 'Finding';
      const meaning = finding.friendlyMeaning || finding.description || '';
      const priority = finding.friendlyPriority || finding.severity || 'Unknown';
      addChatNote(
        `${title}\n${meaning}\nResource: ${resourceName}\nPriority: ${priority}`
      );
      return;
    }

    setChatClosed(false);
    await sendMessage(null, {
      message: `Enable versioning for "${fixContext.bucketName}".`,
      selectedFinding: fixContext,
    });
  }

  async function sendMessage(event, override) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const overrideMessage = override && override.message ? override.message : '';
    const cleanedMessage = String(overrideMessage || inputValue).trim();
    if (!cleanedMessage || isSending) {
      return;
    }

    if (conversationID == null || conversationID <= 0) {
      setError('CloudPilot needs an active conversation before you can send.');
      return;
    }

    setIsSending(true);
    setError('');
    if (!overrideMessage) {
      setInputValue('');
    }

    try {
      const response = await sendMessageAPI({
        api,
        payload: {
          username: displayName,
          message: cleanedMessage,
          groupID: DEMO_GROUP_ID,
          conversationID,
          selectedFinding: override && override.selectedFinding,
        },
      });

      if (response?.success === false) {
        throw new Error(
          response?.message || 'CloudPilot could not process the message.'
        );
      }

      const atlasResponse =
        response?.data?.atlasResponse || response?.atlasResponse || null;
      const cloudPilotRow =
        response?.data?.CloudPilotResponseMessage ||
        response?.data?.cloudPilotResponseMessage ||
        null;
      const normalized = normalizeScanResult(atlasResponse);

      const storedScan = readAtlasScan(atlasResponse);

      if (storedScan && typeof setScan === 'function') {
        setScan({
          ...storedScan,
          conversationID,
          scanResult: normalized,
          snapshotID: response?.data?.scanSnapshotID || null,
          snapshotSaved: response?.data?.snapshotSaved,
          cloudPilotMessageID:
            cloudPilotRow?.messageID || cloudPilotRow?.message_id || null,
        });
      }

      if (storedScan && response?.data?.snapshotSaved === false) {
        setError(
          'Scan completed, but this result could not be saved. It will not survive a refresh.'
        );
      }

      if (storedScan && response?.data?.snapshotSaved === true) {
        await queryClient.invalidateQueries(['scan-recents', conversationID]);
      }

      if (normalized) {
        setScanCard({
          messageId:
            cloudPilotRow?.messageID != null
              ? String(cloudPilotRow.messageID)
              : null,
          scanResult: normalized,
        });
      }

      await queryClient.invalidateQueries([
        'chat-messages',
        DEMO_GROUP_ID,
        conversationID,
      ]);
    } catch (requestError) {
      setError(
        requestError.message ||
          'Something went wrong while contacting CloudPilot.'
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div
      className={
        chatClosed
          ? 'dashboard-page chat-closed'
          : 'dashboard-page'
      }
    >
      <style>{`
        .dashboard-page {
          --dcp-green: #2f9874;
          --dcp-green-dark: #23775b;
          --dcp-green-soft: #eef8f4;
          --dcp-background: #f8faf9;
          --dcp-surface: #ffffff;
          --dcp-text: #17201d;
          --dcp-text-secondary: #5f6b67;
          --dcp-text-muted: #8a9691;
          --dcp-border: #e4e9e6;
          --dcp-border-dark: #d8dfdb;
          --dcp-danger: #d92d3a;
          --dcp-chat-width: 390px;
          box-sizing: border-box;
          min-height: calc(100vh - 72px);
          background: var(--dcp-background);
          color: var(--dcp-text);
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          position: relative;
        }
        .dashboard-page *,
        .dashboard-page *::before,
        .dashboard-page *::after {
          box-sizing: border-box;
        }
        .dashboard-page button,
        .dashboard-page input {
          font: inherit;
        }
        .dashboard-page .dcp-main {
          width: calc(100% - var(--dcp-chat-width));
          padding: 48px 38px 80px;
          transition: width 0.2s ease;
        }
        .dashboard-page.chat-closed .dcp-main {
          width: 100%;
        }
        .dashboard-page .dcp-content {
          max-width: 1180px;
          margin: 0 auto;
        }
        .dashboard-page .dcp-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 28px;
        }
        .dashboard-page .dcp-eyebrow {
          color: var(--dcp-green-dark);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 8px;
        }
        .dashboard-page h1 {
          font-size: 30px;
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .dashboard-page .dcp-page-description {
          color: var(--dcp-text-secondary);
          font-size: 14px;
          margin-top: 8px;
        }
        .dashboard-page .dcp-page-actions {
          display: flex;
          gap: 9px;
        }
        .dashboard-page .dcp-secondary-button,
        .dashboard-page .dcp-scan-button {
          border-radius: 9px;
          padding: 11px 17px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        .dashboard-page .dcp-secondary-button {
          border: 1px solid var(--dcp-border-dark);
          background: white;
          color: var(--dcp-green-dark);
        }
        .dashboard-page .dcp-secondary-button:hover {
          background: var(--dcp-green-soft);
        }
        .dashboard-page .dcp-scan-button {
          border: 0;
          background: var(--dcp-green);
          color: white;
        }
        .dashboard-page .dcp-scan-button:hover {
          background: var(--dcp-green-dark);
        }
        .dashboard-page .dcp-card {
          background: var(--dcp-surface);
          border: 1px solid var(--dcp-border);
          border-radius: 14px;
          overflow: hidden;
        }
        .dashboard-page .dcp-card-header {
          padding: 20px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--dcp-border);
        }
        .dashboard-page .dcp-card-title {
          font-size: 15px;
          font-weight: 650;
        }
        .dashboard-page .dcp-card-meta {
          color: var(--dcp-text-muted);
          font-size: 13px;
        }
        .dashboard-page .dcp-table-scroll {
          overflow-x: auto;
        }
        .dashboard-page table {
          width: 100%;
          border-collapse: collapse;
          min-width: 720px;
        }
        .dashboard-page th {
          padding: 13px 20px;
          text-align: left;
          color: var(--dcp-text-muted);
          font-size: 11px;
          font-weight: 650;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: #fbfcfb;
        }
        .dashboard-page td {
          padding: 18px 20px;
          border-top: 1px solid var(--dcp-border);
          font-size: 14px;
          vertical-align: middle;
        }
        .dashboard-page tbody tr:hover {
          background: #fafcfb;
        }
        .dashboard-page .dcp-bucket-name {
          font-weight: 600;
          color: #29342f;
          max-width: 400px;
        }
        .dashboard-page .dcp-region {
          color: var(--dcp-text-secondary);
        }
        .dashboard-page .dcp-health {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
        }
        .dashboard-page .dcp-health-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--dcp-danger);
        }
        .dashboard-page .dcp-finding-count {
          font-weight: 600;
        }
        .dashboard-page .dcp-tags {
          color: var(--dcp-text-secondary);
        }
        .dashboard-page .dcp-action {
          color: var(--dcp-green-dark);
          font-weight: 650;
          text-decoration: none;
        }
        .dashboard-page .dcp-action:hover {
          text-decoration: underline;
        }
        .dashboard-page .dcp-summary {
          margin-top: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          padding: 24px 26px;
          background: var(--dcp-green-soft);
          border: 1px solid #d9ebe3;
          border-radius: 14px;
        }
        .dashboard-page .dcp-summary-label {
          color: var(--dcp-green-dark);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }
        .dashboard-page .dcp-summary h2 {
          font-size: 18px;
          margin: 0 0 5px;
        }
        .dashboard-page .dcp-summary p {
          color: var(--dcp-text-secondary);
          font-size: 14px;
          margin: 0;
        }
        .dashboard-page .dcp-section-header {
          margin-top: 42px;
          margin-bottom: 16px;
        }
        .dashboard-page .dcp-section-header h2 {
          font-size: 20px;
          margin: 0 0 5px;
        }
        .dashboard-page .dcp-section-header p {
          color: var(--dcp-text-secondary);
          font-size: 14px;
          margin: 0;
          overflow-wrap: anywhere;
        }
        .dashboard-page .dcp-finding-card {
          display: grid;
          grid-template-columns: 1fr 130px 90px;
          align-items: center;
          gap: 20px;
          padding: 20px 22px;
          background: white;
          border: 1px solid var(--dcp-border);
          border-radius: 12px;
          margin-bottom: 10px;
        }
        .dashboard-page .dcp-priority {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--dcp-danger);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .dashboard-page .dcp-finding-title {
          font-size: 15px;
          font-weight: 650;
          margin-bottom: 6px;
        }
        .dashboard-page .dcp-finding-description {
          color: var(--dcp-text-secondary);
          font-size: 13px;
        }
        .dashboard-page .dcp-finding-resource {
          color: var(--dcp-text-secondary);
          font-size: 13px;
          overflow-wrap: anywhere;
        }
        .dashboard-page .dcp-finding-action {
          text-align: right;
        }
        .dashboard-page .dcp-chat-panel {
          width: var(--dcp-chat-width);
          position: fixed;
          top: 72px;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          background: white;
          border-left: 1px solid var(--dcp-border);
          z-index: 80;
          overflow: hidden;
          transition: transform 0.2s ease;
        }
        .dashboard-page.chat-closed .dcp-chat-panel {
          transform: translateX(100%);
          pointer-events: none;
        }
        .dashboard-page .dcp-chat-header {
          min-height: 74px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          border-bottom: 1px solid var(--dcp-border);
        }
        .dashboard-page .dcp-chat-brand {
          display: flex;
          align-items: center;
          gap: 11px;
        }
        .dashboard-page .dcp-chat-logo {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: var(--dcp-green);
          color: white;
          font-size: 13px;
          font-weight: 700;
        }
        .dashboard-page .dcp-chat-title {
          font-size: 15px;
          font-weight: 700;
        }
        .dashboard-page .dcp-chat-subtitle {
          color: var(--dcp-text-muted);
          font-size: 11px;
          margin-top: 2px;
        }
        .dashboard-page .dcp-chat-close {
          margin-left: auto;
          width: 32px;
          height: 32px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--dcp-text-secondary);
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
        }
        .dashboard-page .dcp-chat-close:hover {
          background: #f1f4f2;
        }
        .dashboard-page .dcp-chat-context {
          padding: 16px 20px;
          background: #fbfcfb;
          border-bottom: 1px solid var(--dcp-border);
        }
        .dashboard-page .dcp-context-label {
          color: var(--dcp-text-muted);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 7px;
        }
        .dashboard-page .dcp-context-resource {
          display: flex;
          align-items: flex-start;
          gap: 9px;
        }
        .dashboard-page .dcp-context-icon {
          color: var(--dcp-green-dark);
          font-weight: 700;
        }
        .dashboard-page .dcp-context-name {
          font-size: 12px;
          font-weight: 650;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .dashboard-page .dcp-context-meta {
          color: var(--dcp-text-muted);
          font-size: 11px;
          margin-top: 3px;
        }
        .dashboard-page .dcp-chat-messages {
          flex: 1;
          padding: 8px 10px 4px;
          overflow-y: auto;
          min-height: 0;
        }
        .dashboard-page .dcp-chat-messages.cloudpilot-chat {
          min-height: 0;
          background: transparent;
        }
        .dashboard-page .cloudpilot-chat .messages {
          padding: 10px 6px 18px;
        }
        .dashboard-page .cloudpilot-chat .msg {
          margin-bottom: 18px;
        }
        .dashboard-page .cloudpilot-chat .msg.ai {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 10px;
        }
        .dashboard-page .cloudpilot-chat .bot-avatar {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--dcp-green);
          color: white;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .dashboard-page .cloudpilot-chat .answer {
          font-size: 13px;
          line-height: 1.55;
          color: #26312d;
          white-space: pre-wrap;
          min-width: 0;
        }
        .dashboard-page .cloudpilot-chat .msg.ai.loading .answer {
          color: var(--dcp-text-muted);
        }
        .dashboard-page .cloudpilot-chat .msg.user {
          display: flex;
          justify-content: flex-end;
        }
        .dashboard-page .cloudpilot-chat .bubble {
          max-width: 100%;
          background: #f1f3f1;
          padding: 10px 13px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .dashboard-page .cloudpilot-chat .scan-result-card-wrap {
          margin-top: 10px;
        }
        .dashboard-page .dcp-chat-status,
        .dashboard-page .dcp-chat-error {
          margin: 8px 12px;
          font-size: 13px;
          color: var(--dcp-text-secondary);
        }
        .dashboard-page .dcp-chat-error {
          color: var(--dcp-danger);
        }
        .dashboard-page .dcp-chat-composer {
          padding: 14px 16px 18px;
          border-top: 1px solid var(--dcp-border);
          background: white;
        }
        .dashboard-page .dcp-composer-box {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          padding: 8px;
          border: 1px solid var(--dcp-border-dark);
          border-radius: 12px;
          background: white;
        }
        .dashboard-page .dcp-composer-box:focus-within {
          border-color: #a8cbbb;
        }
        .dashboard-page .dcp-chat-input {
          flex: 1;
          min-width: 0;
          height: 36px;
          padding: 0 7px;
          border: 0;
          outline: 0;
          color: var(--dcp-text);
          background: transparent;
          font-size: 13px;
        }
        .dashboard-page .dcp-chat-input:disabled {
          opacity: 0.6;
        }
        .dashboard-page .dcp-chat-send {
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          border: 0;
          border-radius: 9px;
          background: var(--dcp-green);
          color: white;
          cursor: pointer;
          font-size: 17px;
        }
        .dashboard-page .dcp-chat-send:hover:not(:disabled) {
          background: var(--dcp-green-dark);
        }
        .dashboard-page .dcp-chat-send:disabled {
          opacity: 0.5;
          cursor: default;
        }
        .dashboard-page .dcp-chat-note {
          margin-top: 8px;
          color: var(--dcp-text-muted);
          font-size: 10px;
          text-align: center;
        }
        .dashboard-page .dcp-breadcrumb {
          display: flex;
          gap: 8px;
          margin-bottom: 25px;
          color: #8a9691;
          font-size: 13px;
          align-items: center;
        }
        .dashboard-page .dcp-breadcrumb button {
          border: 0;
          padding: 0;
          background: none;
          color: #23775b;
          font-weight: 600;
          cursor: pointer;
        }
        .dashboard-page .dcp-health-dot.healthy {
          background: var(--dcp-green);
        }
        .dashboard-page .dcp-empty {
          padding: 28px 22px;
          color: var(--dcp-text-secondary);
          font-size: 14px;
        }
        .dashboard-page .dcp-detail-summary {
          display: flex;
          gap: 14px;
          margin: 28px 0 24px;
          padding: 18px 20px;
          background: #eef8f4;
          border: 1px solid #d9ebe3;
          border-radius: 12px;
        }
        .dashboard-page .dcp-detail-summary strong {
          font-size: 14px;
        }
        .dashboard-page .dcp-detail-summary p {
          margin: 4px 0 0;
          color: #5f6b67;
          font-size: 13px;
        }
        .dashboard-page .dcp-priority.medium {
          color: #d9902d;
        }
        .dashboard-page .dcp-priority.low {
          color: #87928d;
        }
        .dashboard-page .dcp-fix {
          min-width: 62px;
          padding: 8px 14px;
          border: 1px solid #b8d8ca;
          border-radius: 8px;
          background: #fff;
          color: #23775b;
          font-weight: 650;
          font-size: 13px;
          cursor: pointer;
        }
        .dashboard-page .dcp-fix:hover {
          background: #2f9874;
          border-color: #2f9874;
          color: #fff;
        }
        @media (max-width: 1100px) {
          .dashboard-page .dcp-main {
            width: 100%;
          }
          .dashboard-page .dcp-chat-panel {
            box-shadow: -10px 0 30px rgba(23, 32, 29, 0.08);
          }
        }
        @media (max-width: 900px) {
          .dashboard-page .dcp-main {
            padding: 32px 20px;
          }
          .dashboard-page .dcp-page-header {
            align-items: flex-start;
            flex-direction: column;
          }
          .dashboard-page .dcp-summary {
            align-items: flex-start;
            flex-direction: column;
          }
          .dashboard-page .dcp-finding-card {
            grid-template-columns: 1fr;
          }
          .dashboard-page .dcp-finding-action {
            text-align: left;
          }
          .dashboard-page .dcp-chat-panel {
            width: min(390px, 100%);
          }
        }
      `}</style>

      <main className="dcp-main">
        <div className="dcp-content">
          <div className="dcp-breadcrumb">
            {service === 'ec2' ? (
              selectedInstance ? (
                <>
                  <button type="button" onClick={showAllResources}>
                    EC2 Instances
                  </button>
                  <span>/</span>
                  <span>{selectedInstance.instanceName}</span>
                </>
              ) : (
                <span>EC2 Instances</span>
              )
            ) : selectedBucket ? (
              <>
                <button type="button" onClick={showAllResources}>
                  S3 Buckets
                </button>
                <span>/</span>
                <span>{selectedBucket.bucketName}</span>
              </>
            ) : (
              <span>S3 Buckets</span>
            )}
          </div>

          {!service ? (
            <section className="dcp-card">
              <p className="dcp-empty">
                {isRestoringScan
                  ? 'Loading the latest saved scan…'
                  : restoreError ||
                    'Run a scan in Chat to load your AWS resources.'}
              </p>
            </section>
          ) : null}

          {service === 's3' && !selectedBucket ? (
            <>
              <div className="dcp-page-header">
                <div>
                  <div className="dcp-eyebrow">AWS Environment</div>
                  <h1>S3 Buckets</h1>
                  <p className="dcp-page-description">
                    Your S3 resources and anything CloudPilot thinks is worth
                    looking at.
                  </p>
                </div>
                {renderPageActions('Scan S3')}
              </div>

              <section className="dcp-card">
                <div className="dcp-card-header">
                  <div className="dcp-card-title">
                    {s3Buckets.length} bucket{s3Buckets.length === 1 ? '' : 's'}
                  </div>
                  <div className="dcp-card-meta">
                    {scanMeta.region ? `Region ${scanMeta.region}` : 'Latest scan'}
                  </div>
                </div>
                <div className="dcp-table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Bucket</th>
                        <th>Region</th>
                        <th>Health</th>
                        <th>Findings</th>
                        <th>Tags</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {s3Buckets.map((bucket) => {
                        const tagCount = Array.isArray(bucket.tags)
                          ? bucket.tags.length
                          : 0;
                        return (
                          <tr key={bucket.bucketName}>
                            <td className="dcp-bucket-name">{bucket.bucketName}</td>
                            <td className="dcp-region">{bucket.region || '—'}</td>
                            <td>
                              <span className="dcp-health">
                                <span
                                  className={
                                    bucket.health === 'healthy'
                                      ? 'dcp-health-dot healthy'
                                      : 'dcp-health-dot'
                                  }
                                />
                                {bucket.health === 'healthy'
                                  ? 'Healthy'
                                  : 'Needs attention'}
                              </span>
                            </td>
                            <td className="dcp-finding-count">
                              {bucket.findingCount}
                            </td>
                            <td className="dcp-tags">{tagCount}</td>
                            <td>
                              <button
                                type="button"
                                className="dcp-action"
                                style={{
                                  background: 'none',
                                  border: 0,
                                  padding: 0,
                                  cursor: 'pointer',
                                }}
                                onClick={() =>
                                  openResource({
                                    type: 'resource',
                                    service: 's3',
                                    id: bucket.bucketName,
                                  })
                                }
                              >
                                View →
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="dcp-summary">
                <div>
                  <div className="dcp-summary-label">Your AWS Environment</div>
                  <h2>{s3Summary.headline}</h2>
                  <p>{s3Summary.detail}</p>
                </div>
                <button
                  type="button"
                  className="dcp-action"
                  style={{
                    background: 'none',
                    border: 0,
                    padding: 0,
                    cursor: 'pointer',
                  }}
                  onClick={reviewAllFindings}
                >
                  Review all findings →
                </button>
              </section>
            </>
          ) : null}

          {service === 's3' && selectedBucket ? (
            <>
              <div className="dcp-page-header">
                <div>
                  <div className="dcp-eyebrow">S3 Bucket</div>
                  <h1>{selectedBucket.bucketName}</h1>
                  <p className="dcp-page-description">
                    {selectedBucket.region || scanMeta.region || 'Unknown region'} ·{' '}
                    {selectedBucket.findingCount} finding
                    {selectedBucket.findingCount === 1 ? '' : 's'} need attention
                  </p>
                </div>
                {renderPageActions('Scan S3')}
              </div>
              <section className="dcp-detail-summary">
                <div>
                  <strong>
                    {selectedBucket.findingCount} thing
                    {selectedBucket.findingCount === 1 ? ' is' : 's are'} worth
                    looking at
                  </strong>
                  <p>
                    CloudPilot found security and configuration issues with this
                    bucket. I&apos;d start with the high-priority findings.
                  </p>
                </div>
              </section>
              <FindingsTable
                findings={selectedBucketFindings || []}
                resourceName={selectedBucket.bucketName}
                onReview={reviewFinding}
              />
            </>
          ) : null}

          {service === 'ec2' && !selectedInstance ? (
            <>
              <div className="dcp-page-header">
                <div>
                  <div className="dcp-eyebrow">AWS Environment</div>
                  <h1>EC2 Instances</h1>
                  <p className="dcp-page-description">
                    Your EC2 instances and anything CloudPilot thinks is worth
                    looking at.
                  </p>
                </div>
                {renderPageActions('Scan EC2')}
              </div>
              <section className="dcp-card">
                <div className="dcp-card-header">
                  <div className="dcp-card-title">
                    {ec2Instances.length} instance
                    {ec2Instances.length === 1 ? '' : 's'}
                  </div>
                  <div className="dcp-card-meta">
                    {scanMeta.region ? `Region ${scanMeta.region}` : 'Latest scan'}
                  </div>
                </div>
                <div className="dcp-table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Instance</th>
                        <th>Type</th>
                        <th>State</th>
                        <th>Health</th>
                        <th>Findings</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {ec2Instances.map((instance) => (
                        <tr key={instance.instanceId || instance.instanceName}>
                          <td className="dcp-bucket-name">{instance.instanceName}</td>
                          <td className="dcp-region">{instance.instanceType || '—'}</td>
                          <td>{instance.state || '—'}</td>
                          <td>
                            <span className="dcp-health">
                              <span
                                className={
                                  instance.health === 'healthy'
                                    ? 'dcp-health-dot healthy'
                                    : 'dcp-health-dot'
                                }
                              />
                              {instance.health === 'healthy'
                                ? 'Healthy'
                                : 'Needs attention'}
                            </span>
                          </td>
                          <td className="dcp-finding-count">
                            {instance.findingCount}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="dcp-action"
                              style={{
                                background: 'none',
                                border: 0,
                                padding: 0,
                                cursor: 'pointer',
                              }}
                              onClick={() =>
                                openResource({
                                  type: 'resource',
                                  service: 'ec2',
                                  id: instance.instanceId || instance.instanceName,
                                })
                              }
                            >
                              View →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : null}

          {service === 'ec2' && selectedInstance ? (
            <>
              <div className="dcp-page-header">
                <div>
                  <div className="dcp-eyebrow">EC2 Instance</div>
                  <h1>{selectedInstance.instanceName}</h1>
                  <p className="dcp-page-description">
                    {selectedInstance.region || 'Unknown region'} ·{' '}
                    {selectedInstance.instanceType || 'Unknown type'} ·{' '}
                    {selectedInstance.findingCount} finding
                    {selectedInstance.findingCount === 1 ? '' : 's'}
                  </p>
                </div>
                {renderPageActions('Scan EC2')}
              </div>
              <FindingsTable
                findings={selectedInstanceFindings || []}
                resourceName={selectedInstance.instanceName}
                onReview={reviewFinding}
              />
            </>
          ) : null}
        </div>
      </main>

      <aside className="dcp-chat-panel" aria-label="CloudPilot chat">
        <div className="dcp-chat-header">
          <div className="dcp-chat-brand">
            <div className="dcp-chat-logo">C</div>
            <div>
              <div className="dcp-chat-title">CloudPilot</div>
              <div className="dcp-chat-subtitle">Ask about this page</div>
            </div>
          </div>
          <button
            type="button"
            className="dcp-chat-close"
            onClick={closeChat}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        <div className="dcp-chat-context">
          <div className="dcp-context-label">Current context</div>
          <div className="dcp-context-resource">
            <div className="dcp-context-icon">◫</div>
            <div>
              <div className="dcp-context-name">
                {selectedBucket
                  ? selectedBucket.bucketName
                  : selectedInstance
                    ? selectedInstance.instanceName
                    : service === 'ec2'
                      ? 'EC2 Instances'
                      : 'S3 Buckets'}
              </div>
              <div className="dcp-context-meta">
                {selectedBucket
                  ? `S3 bucket · ${selectedBucket.region || 'region unknown'} · ${selectedBucket.findingCount} findings`
                  : selectedInstance
                    ? `EC2 instance · ${selectedInstance.region || 'region unknown'} · ${selectedInstance.findingCount} findings`
                    : 'Latest scan for this project'}
              </div>
            </div>
          </div>
        </div>

        <div className="dcp-chat-messages cloudpilot-chat">
          {conversationID == null ? (
            <p className="dcp-chat-status">
              Select a project to open a conversation.
            </p>
          ) : null}
          {conversationID != null && messagesLoading ? (
            <p className="dcp-chat-status">Loading messages…</p>
          ) : null}
          {conversationID != null && messagesError ? (
            <p className="dcp-chat-error" role="alert">
              Could not load messages (
              {messagesErr?.message || 'error'}
              ). Are you logged in?
            </p>
          ) : null}
          <ChatMessages
            messages={chatMessages}
            isSending={isSending}
            scanCard={scanCard}
            onShowAll={showAllResources}
            onSelectFixOption={(choice) =>
              sendMessage(null, { message: choice })
            }
          />
        </div>

        <div className="dcp-chat-composer">
          <form className="dcp-composer-box" onSubmit={sendMessage}>
            <input
              className="dcp-chat-input"
              type="text"
              placeholder="Ask CloudPilot..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              disabled={isSending}
              aria-label="Ask CloudPilot"
            />
            <button
              className="dcp-chat-send"
              type="submit"
              aria-label="Send"
              disabled={isSending || !inputValue.trim()}
            >
              ↑
            </button>
          </form>
          {error ? (
            <div className="dcp-chat-error" role="alert">
              {error}
            </div>
          ) : (
            <div className="dcp-chat-note">
              Same conversation as the selected project.
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default DashboardPage;
