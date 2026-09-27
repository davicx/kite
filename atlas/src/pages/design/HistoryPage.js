import React from 'react';

function HistoryPage() {
  return (
    <div className="history-page">
      <style>{`
        .history-page {
          box-sizing: border-box;
          --green: #2f9874;
          --green-dark: #23775b;
          --green-soft: #eef8f4;
          --green-border: #d9ebe3;
          --text: #17201d;
          --text-secondary: #5f6b67;
          --text-muted: #8a9691;
          --border: #e4e9e6;
          --background: #fbfcfb;
          --white: #ffffff;
          --red: #d92d3a;
          --orange: #c47b20;
          min-height: 100%;
          padding: 48px 56px 80px;
          background: var(--background);
          color: var(--text);
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .history-page *,
        .history-page *::before,
        .history-page *::after { box-sizing: border-box; }
        .history-page button { font: inherit; }
        .history-page .content { max-width: 1120px; margin: 0 auto; }
        .history-page .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 30px;
          color: var(--text-muted);
          font-size: 13px;
        }
        .history-page .breadcrumb button {
          padding: 0;
          border: 0;
          background: transparent;
          color: var(--green-dark);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .history-page .breadcrumb button:hover { text-decoration: underline; }
        .history-page .resource-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 38px;
        }
        .history-page .eyebrow {
          margin-bottom: 8px;
          color: var(--green-dark);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .history-page h1 {
          margin: 0;
          font-size: 30px;
          font-weight: 720;
          letter-spacing: -0.03em;
        }
        .history-page .resource-meta {
          margin: 8px 0 0;
          color: var(--text-secondary);
          font-size: 14px;
        }
        .history-page .header-actions { display: flex; gap: 10px; }
        .history-page .button {
          height: 40px;
          padding: 0 15px;
          border: 1px solid #d5dfda;
          border-radius: 9px;
          background: var(--white);
          color: var(--green-dark);
          font-size: 13px;
          font-weight: 650;
          cursor: pointer;
        }
        .history-page .button:hover {
          background: var(--green-soft);
          border-color: var(--green-border);
        }
        .history-page .button.primary {
          border-color: var(--green);
          background: var(--green);
          color: white;
        }
        .history-page .button.primary:hover { background: #288566; }
        .history-page .history-intro {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          margin-bottom: 18px;
        }
        .history-page .history-intro h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 680;
          letter-spacing: -0.015em;
        }
        .history-page .history-intro p {
          margin: 6px 0 0;
          color: var(--text-muted);
          font-size: 13px;
        }
        .history-page .filters { display: flex; gap: 4px; }
        .history-page .filter {
          padding: 6px 10px;
          border: 0;
          border-radius: 7px;
          background: transparent;
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 620;
          cursor: pointer;
        }
        .history-page .filter:hover {
          color: var(--green-dark);
          background: var(--green-soft);
        }
        .history-page .filter.active {
          background: var(--white);
          border: 1px solid var(--green-border);
          color: var(--green-dark);
        }
        .history-page .history-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
        }
        .history-page .date-header {
          padding: 12px 22px;
          background: #fafcfb;
          border-bottom: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .history-page .history-event {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr) auto;
          gap: 14px;
          padding: 20px 22px;
          border-bottom: 1px solid var(--border);
        }
        .history-page .history-event:last-child { border-bottom: 0; }
        .history-page .history-event:hover { background: #fcfdfc; }
        .history-page .event-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: var(--green-soft);
          color: var(--green-dark);
          font-size: 14px;
          font-weight: 700;
        }
        .history-page .event-icon.scan {
          background: #f3f5f4;
          color: #64716c;
        }
        .history-page .event-content { min-width: 0; }
        .history-page .event-top {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 5px;
        }
        .history-page .event-title {
          font-size: 14px;
          font-weight: 680;
        }
        .history-page .event-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 6px;
          border-radius: 5px;
          background: var(--green-soft);
          color: var(--green-dark);
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .history-page .event-badge.scan {
          background: #f1f4f2;
          color: var(--text-muted);
        }
        .history-page .event-description {
          margin: 0;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.55;
        }
        .history-page .change {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 11px;
          padding: 7px 10px;
          border-radius: 7px;
          background: #f7f9f8;
          font-size: 11px;
        }
        .history-page .change-label { color: var(--text-muted); }
        .history-page .old-value {
          color: var(--text-secondary);
          text-decoration: line-through;
        }
        .history-page .change-arrow { color: var(--text-muted); }
        .history-page .new-value {
          color: var(--green-dark);
          font-weight: 650;
        }
        .history-page .event-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          color: var(--text-muted);
          font-size: 10px;
        }
        .history-page .meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #bdc6c2;
        }
        .history-page .event-actions {
          display: flex;
          align-items: center;
          gap: 7px;
          padding-left: 15px;
        }
        .history-page .event-button {
          height: 32px;
          padding: 0 11px;
          border: 1px solid #dce3df;
          border-radius: 7px;
          background: white;
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 620;
          cursor: pointer;
        }
        .history-page .event-button:hover {
          background: #f7faf8;
          color: var(--green-dark);
          border-color: var(--green-border);
        }
        .history-page .event-button.undo {
          color: var(--green-dark);
          border-color: #b8d8ca;
        }
        .history-page .event-button.undo:hover { background: var(--green-soft); }
        .history-page .undo-unavailable {
          color: #a2aaa6;
          font-size: 10px;
          white-space: nowrap;
        }
        .history-page .scan-summary {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 11px;
        }
        .history-page .scan-stat {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--text-secondary);
          font-size: 11px;
        }
        .history-page .priority-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .history-page .priority-dot.high { background: var(--red); }
        .history-page .priority-dot.medium { background: var(--orange); }
        .history-page .priority-dot.low { background: #87928d; }
        .history-page .history-note {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 16px;
          padding: 0 3px;
          color: var(--text-muted);
          font-size: 11px;
        }
        .history-page .history-note-icon { color: var(--green-dark); }
        @media (max-width: 800px) {
          .history-page { padding: 30px 20px 60px; }
          .history-page .resource-header,
          .history-page .history-intro {
            align-items: flex-start;
            flex-direction: column;
          }
          .history-page .history-event {
            grid-template-columns: 40px minmax(0, 1fr);
          }
          .history-page .event-actions {
            grid-column: 2;
            padding-left: 0;
            padding-top: 5px;
          }
        }
      `}</style>

      <div className="content">
        <nav className="breadcrumb">
          <button type="button">S3 Buckets</button>
          <span>/</span>
          <button type="button">wishlist-images</button>
          <span>/</span>
          <span>History</span>
        </nav>

        <header className="resource-header">
          <div>
            <div className="eyebrow">S3 Bucket</div>
            <h1>wishlist-images</h1>
            <p className="resource-meta">us-west-2 · 4 findings</p>
          </div>
          <div className="header-actions">
            <button className="button" type="button">← Back to bucket</button>
            <button className="button primary" type="button">Scan S3</button>
          </div>
        </header>

        <div className="history-intro">
          <div>
            <h2>History</h2>
            <p>Scans and changes made to this resource through CloudPilot.</p>
          </div>
          <div className="filters">
            <button className="filter active" type="button">All</button>
            <button className="filter" type="button">Changes</button>
            <button className="filter" type="button">Scans</button>
          </div>
        </div>

        <section className="history-card">
          <div className="date-header">Today</div>

          <article className="history-event">
            <div className="event-icon">✓</div>
            <div className="event-content">
              <div className="event-top">
                <div className="event-title">Versioning enabled</div>
                <span className="event-badge">Change</span>
              </div>
              <p className="event-description">
                CloudPilot enabled object versioning on this bucket.
              </p>
              <div className="change">
                <span className="change-label">Versioning</span>
                <span className="old-value">Disabled</span>
                <span className="change-arrow">→</span>
                <span className="new-value">Enabled</span>
              </div>
              <div className="event-meta">
                <span>2:14 PM</span>
                <span className="meta-dot" />
                <span>David</span>
                <span className="meta-dot" />
                <span>Automatic remediation</span>
              </div>
            </div>
            <div className="event-actions">
              <button className="event-button" type="button">View</button>
              <button className="event-button undo" type="button">Undo</button>
            </div>
          </article>

          <article className="history-event">
            <div className="event-icon scan">⌕</div>
            <div className="event-content">
              <div className="event-top">
                <div className="event-title">S3 scan completed</div>
                <span className="event-badge scan">Scan</span>
              </div>
              <p className="event-description">
                CloudPilot scanned this bucket and found 4 things worth looking at.
              </p>
              <div className="scan-summary">
                <span className="scan-stat">
                  <span className="priority-dot high" />
                  1 high
                </span>
                <span className="scan-stat">
                  <span className="priority-dot medium" />
                  2 medium
                </span>
                <span className="scan-stat">
                  <span className="priority-dot low" />
                  1 low
                </span>
              </div>
              <div className="event-meta">
                <span>1:58 PM</span>
                <span className="meta-dot" />
                <span>Requested by David</span>
              </div>
            </div>
            <div className="event-actions">
              <button className="event-button" type="button">View scan</button>
            </div>
          </article>

          <div className="date-header">September 24</div>

          <article className="history-event">
            <div className="event-icon">✓</div>
            <div className="event-content">
              <div className="event-top">
                <div className="event-title">Default encryption enabled</div>
                <span className="event-badge">Change</span>
              </div>
              <p className="event-description">
                Default encryption was enabled for new objects added to this bucket.
              </p>
              <div className="change">
                <span className="change-label">Encryption</span>
                <span className="old-value">Off</span>
                <span className="change-arrow">→</span>
                <span className="new-value">AES-256</span>
              </div>
              <div className="event-meta">
                <span>4:18 PM</span>
                <span className="meta-dot" />
                <span>David</span>
                <span className="meta-dot" />
                <span>Automatic remediation</span>
              </div>
            </div>
            <div className="event-actions">
              <button className="event-button" type="button">View</button>
              <span className="undo-unavailable">Can&apos;t undo</span>
            </div>
          </article>

          <article className="history-event">
            <div className="event-icon scan">⌕</div>
            <div className="event-content">
              <div className="event-top">
                <div className="event-title">S3 scan completed</div>
                <span className="event-badge scan">Scan</span>
              </div>
              <p className="event-description">
                CloudPilot scanned this bucket and found 6 findings.
              </p>
              <div className="scan-summary">
                <span className="scan-stat">
                  <span className="priority-dot high" />
                  2 high
                </span>
                <span className="scan-stat">
                  <span className="priority-dot medium" />
                  2 medium
                </span>
                <span className="scan-stat">
                  <span className="priority-dot low" />
                  2 low
                </span>
              </div>
              <div className="event-meta">
                <span>3:52 PM</span>
                <span className="meta-dot" />
                <span>Requested by David</span>
              </div>
            </div>
            <div className="event-actions">
              <button className="event-button" type="button">View scan</button>
            </div>
          </article>

          <div className="date-header">September 20</div>

          <article className="history-event">
            <div className="event-icon">✓</div>
            <div className="event-content">
              <div className="event-top">
                <div className="event-title">Environment tag added</div>
                <span className="event-badge">Change</span>
              </div>
              <p className="event-description">
                An environment tag was added to help identify this resource.
              </p>
              <div className="change">
                <span className="change-label">environment</span>
                <span className="old-value">None</span>
                <span className="change-arrow">→</span>
                <span className="new-value">demo</span>
              </div>
              <div className="event-meta">
                <span>11:41 AM</span>
                <span className="meta-dot" />
                <span>David</span>
              </div>
            </div>
            <div className="event-actions">
              <button className="event-button" type="button">View</button>
              <button className="event-button undo" type="button">Undo</button>
            </div>
          </article>
        </section>

        <div className="history-note">
          <span className="history-note-icon">ⓘ</span>
          <span>
            Undo is available only when CloudPilot can safely restore the previous state.
          </span>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
