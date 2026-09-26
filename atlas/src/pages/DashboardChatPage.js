import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BUCKETS = [
  {
    name: 'codepipeline-us-west-2-e2cd1e5051c6-4c05-97be-fe8e1f9c1a7e',
    region: 'us-west-2',
    findings: 6,
    tags: 0,
  },
  {
    name: 'elasticbeanstalk-us-west-2-631447262459',
    region: 'us-west-2',
    findings: 6,
    tags: 0,
  },
  {
    name: 'insta-app-bucket-tutorial-two',
    region: 'us-east-1',
    findings: 6,
    tags: 0,
  },
];

const CONTEXT_BUCKET = BUCKETS[0].name;

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    role: 'assistant',
    paragraphs: [
      "I'm looking at this S3 bucket with you.",
      'It has 6 findings. The highest-priority issue is that default encryption is currently off.',
    ],
    finding: {
      title: 'Encryption is off',
      description: "New files aren't encrypted by default.",
    },
  },
  {
    id: 'm2',
    role: 'user',
    content: 'Why does this matter?',
  },
  {
    id: 'm3',
    role: 'assistant',
    paragraphs: [
      'Without default encryption, new objects can be stored without encryption at rest unless encryption is explicitly requested when they\'re uploaded.',
      'I can walk you through the change or help you review the fix before anything is changed.',
    ],
  },
];

/**
 * Demo: S3 dashboard + right CloudPilot chat panel (design mock).
 * Atlas header/menu already wrap this page — only main + chat panel here.
 */
function DashboardChatPage() {
  const [chatClosed, setChatClosed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function openChat() {
    setChatClosed(false);
  }

  function closeChat() {
    setChatClosed(true);
  }

  function sendDemoMessage(event) {
    if (event) {
      event.preventDefault();
    }

    const text = inputValue.trim();
    if (!text) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', content: text },
    ]);
    setInputValue('');

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          paragraphs: [
            'I have the current S3 bucket and its findings in context. In the real CloudPilot chat, this message would go through your normal chat flow.',
          ],
        },
      ]);
    }, 500);
  }

  return (
    <div
      className={
        chatClosed
          ? 'dashboard-chat-page chat-closed'
          : 'dashboard-chat-page'
      }
    >
      <style>{`
        .dashboard-chat-page {
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
        .dashboard-chat-page *,
        .dashboard-chat-page *::before,
        .dashboard-chat-page *::after {
          box-sizing: border-box;
        }
        .dashboard-chat-page button,
        .dashboard-chat-page input {
          font: inherit;
        }
        .dashboard-chat-page .dcp-main {
          width: calc(100% - var(--dcp-chat-width));
          padding: 48px 38px 80px;
          transition: width 0.2s ease;
        }
        .dashboard-chat-page.chat-closed .dcp-main {
          width: 100%;
        }
        .dashboard-chat-page .dcp-content {
          max-width: 1180px;
          margin: 0 auto;
        }
        .dashboard-chat-page .dcp-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 28px;
        }
        .dashboard-chat-page .dcp-eyebrow {
          color: var(--dcp-green-dark);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 8px;
        }
        .dashboard-chat-page h1 {
          font-size: 30px;
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .dashboard-chat-page .dcp-page-description {
          color: var(--dcp-text-secondary);
          font-size: 14px;
          margin-top: 8px;
        }
        .dashboard-chat-page .dcp-page-actions {
          display: flex;
          gap: 9px;
        }
        .dashboard-chat-page .dcp-secondary-button,
        .dashboard-chat-page .dcp-scan-button {
          border-radius: 9px;
          padding: 11px 17px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        .dashboard-chat-page .dcp-secondary-button {
          border: 1px solid var(--dcp-border-dark);
          background: white;
          color: var(--dcp-green-dark);
        }
        .dashboard-chat-page .dcp-secondary-button:hover {
          background: var(--dcp-green-soft);
        }
        .dashboard-chat-page .dcp-scan-button {
          border: 0;
          background: var(--dcp-green);
          color: white;
        }
        .dashboard-chat-page .dcp-scan-button:hover {
          background: var(--dcp-green-dark);
        }
        .dashboard-chat-page .dcp-card {
          background: var(--dcp-surface);
          border: 1px solid var(--dcp-border);
          border-radius: 14px;
          overflow: hidden;
        }
        .dashboard-chat-page .dcp-card-header {
          padding: 20px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--dcp-border);
        }
        .dashboard-chat-page .dcp-card-title {
          font-size: 15px;
          font-weight: 650;
        }
        .dashboard-chat-page .dcp-card-meta {
          color: var(--dcp-text-muted);
          font-size: 13px;
        }
        .dashboard-chat-page .dcp-table-scroll {
          overflow-x: auto;
        }
        .dashboard-chat-page table {
          width: 100%;
          border-collapse: collapse;
          min-width: 720px;
        }
        .dashboard-chat-page th {
          padding: 13px 20px;
          text-align: left;
          color: var(--dcp-text-muted);
          font-size: 11px;
          font-weight: 650;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: #fbfcfb;
        }
        .dashboard-chat-page td {
          padding: 18px 20px;
          border-top: 1px solid var(--dcp-border);
          font-size: 14px;
          vertical-align: middle;
        }
        .dashboard-chat-page tbody tr:hover {
          background: #fafcfb;
        }
        .dashboard-chat-page .dcp-bucket-name {
          font-weight: 600;
          color: #29342f;
          max-width: 400px;
        }
        .dashboard-chat-page .dcp-region {
          color: var(--dcp-text-secondary);
        }
        .dashboard-chat-page .dcp-health {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
        }
        .dashboard-chat-page .dcp-health-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--dcp-danger);
        }
        .dashboard-chat-page .dcp-finding-count {
          font-weight: 600;
        }
        .dashboard-chat-page .dcp-tags {
          color: var(--dcp-text-secondary);
        }
        .dashboard-chat-page .dcp-action {
          color: var(--dcp-green-dark);
          font-weight: 650;
          text-decoration: none;
        }
        .dashboard-chat-page .dcp-action:hover {
          text-decoration: underline;
        }
        .dashboard-chat-page .dcp-summary {
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
        .dashboard-chat-page .dcp-summary-label {
          color: var(--dcp-green-dark);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }
        .dashboard-chat-page .dcp-summary h2 {
          font-size: 18px;
          margin: 0 0 5px;
        }
        .dashboard-chat-page .dcp-summary p {
          color: var(--dcp-text-secondary);
          font-size: 14px;
          margin: 0;
        }
        .dashboard-chat-page .dcp-section-header {
          margin-top: 42px;
          margin-bottom: 16px;
        }
        .dashboard-chat-page .dcp-section-header h2 {
          font-size: 20px;
          margin: 0 0 5px;
        }
        .dashboard-chat-page .dcp-section-header p {
          color: var(--dcp-text-secondary);
          font-size: 14px;
          margin: 0;
          overflow-wrap: anywhere;
        }
        .dashboard-chat-page .dcp-finding-card {
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
        .dashboard-chat-page .dcp-priority {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--dcp-danger);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .dashboard-chat-page .dcp-finding-title {
          font-size: 15px;
          font-weight: 650;
          margin-bottom: 6px;
        }
        .dashboard-chat-page .dcp-finding-description {
          color: var(--dcp-text-secondary);
          font-size: 13px;
        }
        .dashboard-chat-page .dcp-finding-resource {
          color: var(--dcp-text-secondary);
          font-size: 13px;
          overflow-wrap: anywhere;
        }
        .dashboard-chat-page .dcp-finding-action {
          text-align: right;
        }
        .dashboard-chat-page .dcp-chat-panel {
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
          transition: transform 0.2s ease;
        }
        .dashboard-chat-page.chat-closed .dcp-chat-panel {
          transform: translateX(100%);
        }
        .dashboard-chat-page .dcp-chat-header {
          min-height: 74px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          border-bottom: 1px solid var(--dcp-border);
        }
        .dashboard-chat-page .dcp-chat-brand {
          display: flex;
          align-items: center;
          gap: 11px;
        }
        .dashboard-chat-page .dcp-chat-logo {
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
        .dashboard-chat-page .dcp-chat-title {
          font-size: 15px;
          font-weight: 700;
        }
        .dashboard-chat-page .dcp-chat-subtitle {
          color: var(--dcp-text-muted);
          font-size: 11px;
          margin-top: 2px;
        }
        .dashboard-chat-page .dcp-chat-close {
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
        .dashboard-chat-page .dcp-chat-close:hover {
          background: #f1f4f2;
        }
        .dashboard-chat-page .dcp-chat-context {
          padding: 16px 20px;
          background: #fbfcfb;
          border-bottom: 1px solid var(--dcp-border);
        }
        .dashboard-chat-page .dcp-context-label {
          color: var(--dcp-text-muted);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 7px;
        }
        .dashboard-chat-page .dcp-context-resource {
          display: flex;
          align-items: flex-start;
          gap: 9px;
        }
        .dashboard-chat-page .dcp-context-icon {
          color: var(--dcp-green-dark);
          font-weight: 700;
        }
        .dashboard-chat-page .dcp-context-name {
          font-size: 12px;
          font-weight: 650;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .dashboard-chat-page .dcp-context-meta {
          color: var(--dcp-text-muted);
          font-size: 11px;
          margin-top: 3px;
        }
        .dashboard-chat-page .dcp-chat-messages {
          flex: 1;
          padding: 22px 20px;
          overflow-y: auto;
        }
        .dashboard-chat-page .dcp-message {
          display: flex;
          gap: 10px;
          margin-bottom: 22px;
        }
        .dashboard-chat-page .dcp-message-avatar {
          width: 28px;
          height: 28px;
          flex: 0 0 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: var(--dcp-green);
          color: white;
          font-size: 11px;
          font-weight: 700;
        }
        .dashboard-chat-page .dcp-message-content {
          min-width: 0;
          color: var(--dcp-text);
          font-size: 13px;
          line-height: 1.55;
        }
        .dashboard-chat-page .dcp-message-name {
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        .dashboard-chat-page .dcp-message-content p {
          margin: 0;
        }
        .dashboard-chat-page .dcp-message-content p + p {
          margin-top: 9px;
        }
        .dashboard-chat-page .dcp-message.user {
          justify-content: flex-end;
        }
        .dashboard-chat-page .dcp-user-bubble {
          max-width: 82%;
          padding: 10px 13px;
          background: var(--dcp-green-soft);
          border-radius: 12px 12px 3px 12px;
          font-size: 13px;
          line-height: 1.45;
        }
        .dashboard-chat-page .dcp-chat-finding {
          margin-top: 13px;
          padding: 13px;
          border: 1px solid var(--dcp-border);
          border-radius: 10px;
          background: white;
        }
        .dashboard-chat-page .dcp-chat-finding-priority {
          color: var(--dcp-danger);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .dashboard-chat-page .dcp-chat-finding-title {
          font-size: 13px;
          font-weight: 650;
          margin-bottom: 4px;
        }
        .dashboard-chat-page .dcp-chat-finding-description {
          color: var(--dcp-text-secondary);
          font-size: 12px;
          line-height: 1.45;
        }
        .dashboard-chat-page .dcp-chat-finding-action {
          width: 100%;
          margin-top: 11px;
          padding: 8px 10px;
          border: 1px solid #bcdccd;
          border-radius: 8px;
          background: white;
          color: var(--dcp-green-dark);
          font-size: 12px;
          font-weight: 650;
          cursor: pointer;
        }
        .dashboard-chat-page .dcp-chat-finding-action:hover {
          background: var(--dcp-green-soft);
        }
        .dashboard-chat-page .dcp-chat-composer {
          padding: 14px 16px 18px;
          border-top: 1px solid var(--dcp-border);
          background: white;
        }
        .dashboard-chat-page .dcp-composer-box {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          padding: 8px;
          border: 1px solid var(--dcp-border-dark);
          border-radius: 12px;
          background: white;
        }
        .dashboard-chat-page .dcp-composer-box:focus-within {
          border-color: #a8cbbb;
        }
        .dashboard-chat-page .dcp-chat-input {
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
        .dashboard-chat-page .dcp-chat-send {
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
        .dashboard-chat-page .dcp-chat-send:hover {
          background: var(--dcp-green-dark);
        }
        .dashboard-chat-page .dcp-chat-note {
          margin-top: 8px;
          color: var(--dcp-text-muted);
          font-size: 10px;
          text-align: center;
        }
        @media (max-width: 1100px) {
          .dashboard-chat-page .dcp-main {
            width: 100%;
          }
          .dashboard-chat-page .dcp-chat-panel {
            box-shadow: -10px 0 30px rgba(23, 32, 29, 0.08);
          }
        }
        @media (max-width: 900px) {
          .dashboard-chat-page .dcp-main {
            padding: 32px 20px;
          }
          .dashboard-chat-page .dcp-page-header {
            align-items: flex-start;
            flex-direction: column;
          }
          .dashboard-chat-page .dcp-summary {
            align-items: flex-start;
            flex-direction: column;
          }
          .dashboard-chat-page .dcp-finding-card {
            grid-template-columns: 1fr;
          }
          .dashboard-chat-page .dcp-finding-action {
            text-align: left;
          }
          .dashboard-chat-page .dcp-chat-panel {
            width: min(390px, 100%);
          }
        }
      `}</style>

      <main className="dcp-main">
        <div className="dcp-content">
          <div className="dcp-page-header">
            <div>
              <div className="dcp-eyebrow">AWS Environment</div>
              <h1>S3 Buckets</h1>
              <p className="dcp-page-description">
                Your S3 resources and anything CloudPilot thinks is worth looking
                at.
              </p>
            </div>
            <div className="dcp-page-actions">
              <button
                type="button"
                className="dcp-secondary-button"
                onClick={openChat}
              >
                ✦ Ask CloudPilot
              </button>
              <button type="button" className="dcp-scan-button">
                Scan S3
              </button>
            </div>
          </div>

          <section className="dcp-card">
            <div className="dcp-card-header">
              <div className="dcp-card-title">3 buckets</div>
              <div className="dcp-card-meta">Last scanned just now</div>
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
                  {BUCKETS.map((bucket) => (
                    <tr key={bucket.name}>
                      <td className="dcp-bucket-name">{bucket.name}</td>
                      <td className="dcp-region">{bucket.region}</td>
                      <td>
                        <span className="dcp-health">
                          <span className="dcp-health-dot" />
                          Needs attention
                        </span>
                      </td>
                      <td className="dcp-finding-count">{bucket.findings}</td>
                      <td className="dcp-tags">{bucket.tags}</td>
                      <td>
                        <Link className="dcp-action" to="/individual-finding">
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="dcp-summary">
            <div>
              <div className="dcp-summary-label">Your AWS Environment</div>
              <h2>3 resources need attention</h2>
              <p>
                CloudPilot found 18 things worth looking at. 6 are
                security-related, so I&apos;d start there.
              </p>
            </div>
            <Link className="dcp-action" to="/individual-finding">
              Review all findings →
            </Link>
          </section>

          <div className="dcp-section-header">
            <h2>Findings</h2>
            <p>{CONTEXT_BUCKET}</p>
          </div>

          <article className="dcp-finding-card">
            <div>
              <div className="dcp-priority">● High</div>
              <div className="dcp-finding-title">Encryption is off</div>
              <div className="dcp-finding-description">
                New files aren&apos;t encrypted by default.
              </div>
            </div>
            <div className="dcp-finding-resource">{CONTEXT_BUCKET}</div>
            <div className="dcp-finding-action">
              <button
                type="button"
                className="dcp-action"
                style={{
                  background: 'none',
                  border: 0,
                  padding: 0,
                  cursor: 'pointer',
                }}
                onClick={openChat}
              >
                Review →
              </button>
            </div>
          </article>
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
              <div className="dcp-context-name">{CONTEXT_BUCKET}</div>
              <div className="dcp-context-meta">
                S3 bucket · us-west-2 · 6 findings
              </div>
            </div>
          </div>
        </div>

        <div className="dcp-chat-messages">
          {messages.map((message) => {
            if (message.role === 'user') {
              return (
                <div className="dcp-message user" key={message.id}>
                  <div className="dcp-user-bubble">{message.content}</div>
                </div>
              );
            }

            return (
              <div className="dcp-message" key={message.id}>
                <div className="dcp-message-avatar">C</div>
                <div className="dcp-message-content">
                  <div className="dcp-message-name">CloudPilot</div>
                  {(message.paragraphs || []).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {message.finding ? (
                    <div className="dcp-chat-finding">
                      <div className="dcp-chat-finding-priority">● High</div>
                      <div className="dcp-chat-finding-title">
                        {message.finding.title}
                      </div>
                      <div className="dcp-chat-finding-description">
                        {message.finding.description}
                      </div>
                      <button type="button" className="dcp-chat-finding-action">
                        Review fix
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="dcp-chat-composer">
          <form className="dcp-composer-box" onSubmit={sendDemoMessage}>
            <input
              className="dcp-chat-input"
              type="text"
              placeholder="Ask CloudPilot..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              aria-label="Ask CloudPilot"
            />
            <button
              className="dcp-chat-send"
              type="submit"
              aria-label="Send"
            >
              ↑
            </button>
          </form>
          <div className="dcp-chat-note">
            CloudPilot has context from this page.
          </div>
        </div>
      </aside>
    </div>
  );
}

export default DashboardChatPage;
