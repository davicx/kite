import React, { useEffect, useRef, useState } from 'react';

const EVIDENCE = [
  {
    time: '2:38 PM',
    title: 'checkout-api v2.18.4 deployed',
    desc: 'Release completed successfully. The payment retry implementation changed in this version.',
    source: 'Deploy',
  },
  {
    time: '2:41 PM',
    title: 'Database connections began climbing',
    desc: 'Active connections moved from a normal 38–45% range to 82% in under four minutes.',
    source: 'Metrics',
  },
  {
    time: '2:44 PM',
    title: 'First timeout spike',
    desc: 'checkout-api began logging "connection pool exhausted" immediately before HTTP 500s increased.',
    source: 'Logs',
  },
  {
    time: '2:47 PM',
    title: 'Support opened INC-1842',
    desc: 'Customers reported payment spinning and returning "Unable to complete checkout."',
    source: 'Ticket',
  },
  {
    time: 'Now',
    title: 'Previous release remains healthy',
    desc: 'Comparison with v2.18.3 shows normal connection release behavior under equivalent traffic.',
    source: 'Compare',
  },
];

const RECOVERY_STEPS = [
  {
    title: 'Roll back to v2.18.3',
    desc: 'Restore the last healthy release of checkout-api.',
  },
  {
    title: 'Verify recovery',
    desc: 'Watch error rate and database connections for 5 minutes.',
  },
  {
    title: 'Open a follow-up fix',
    desc: 'Create an engineering task with the retry-path evidence attached.',
  },
];

const TICKET_META = [
  { key: 'Incident', value: 'INC-1842' },
  { key: 'Owner', value: 'Platform Engineering' },
  { key: 'Service', value: 'checkout-api' },
  { key: 'Last healthy', value: 'v2.18.3' },
];

function TicketPage() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function showToast(message) {
    setToastMessage(message);
    setToastVisible(true);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }

  return (
    <div className="ticket-page">
      <style>{`
        .ticket-page {
          box-sizing: border-box;
          padding: 44px 56px 80px;
          background: #fbfcfb;
          color: #17201d;
          min-height: 100%;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .ticket-page *,
        .ticket-page *::before,
        .ticket-page *::after {
          box-sizing: border-box;
        }
        .ticket-page button {
          font: inherit;
        }
        .ticket-page .content {
          max-width: 1180px;
          margin: auto;
        }
        .ticket-page .breadcrumb {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          color: #8a9691;
          font-size: 13px;
        }
        .ticket-page .breadcrumb a {
          color: #23775b;
          font-weight: 600;
          text-decoration: none;
        }
        .ticket-page .incident-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 30px;
        }
        .ticket-page .eyebrow {
          color: #d92d3a;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 8px;
        }
        .ticket-page h1 {
          font-size: 29px;
          letter-spacing: -0.025em;
          line-height: 1.25;
          margin: 0;
        }
        .ticket-page .description {
          color: #5f6b67;
          font-size: 14px;
          margin-top: 9px;
        }
        .ticket-page .status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 11px;
          background: #fff5f5;
          border: 1px solid #f1d1d4;
          border-radius: 9px;
          color: #a8232e;
          font-size: 13px;
          font-weight: 650;
          white-space: nowrap;
        }
        .ticket-page .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d92d3a;
        }
        .ticket-page .metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin: 28px 0;
        }
        .ticket-page .metric {
          background: #fff;
          border: 1px solid #e4e9e6;
          border-radius: 12px;
          padding: 17px 18px;
        }
        .ticket-page .metric-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #8a9691;
          font-weight: 700;
          margin-bottom: 7px;
        }
        .ticket-page .metric-value {
          font-size: 19px;
          font-weight: 700;
        }
        .ticket-page .metric-sub {
          font-size: 12px;
          color: #5f6b67;
          margin-top: 4px;
        }
        .ticket-page .diagnosis {
          display: flex;
          gap: 14px;
          padding: 20px 22px;
          background: #eef8f4;
          border: 1px solid #d9ebe3;
          border-radius: 13px;
          margin-bottom: 24px;
        }
        .ticket-page .diag-icon {
          width: 30px;
          height: 30px;
          flex: 0 0 auto;
          border-radius: 8px;
          background: #2f9874;
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 700;
        }
        .ticket-page .diag-label {
          font-size: 11px;
          color: #23775b;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 5px;
        }
        .ticket-page .diagnosis h2 {
          font-size: 16px;
          margin: 0 0 6px;
        }
        .ticket-page .diagnosis p {
          font-size: 13px;
          color: #5f6b67;
          line-height: 1.55;
          max-width: 900px;
          margin: 0;
        }
        .ticket-page .confidence {
          font-weight: 650;
          color: #23775b;
        }
        .ticket-page .grid {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(300px, 0.85fr);
          gap: 20px;
        }
        .ticket-page .card {
          background: #fff;
          border: 1px solid #e4e9e6;
          border-radius: 14px;
          overflow: hidden;
        }
        .ticket-page .card-head {
          padding: 18px 20px;
          border-bottom: 1px solid #e4e9e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ticket-page .card-title {
          font-size: 15px;
          font-weight: 680;
        }
        .ticket-page .card-sub {
          font-size: 12px;
          color: #8a9691;
          margin-top: 3px;
        }
        .ticket-page .evidence {
          padding: 0 20px;
        }
        .ticket-page .e-row {
          display: grid;
          grid-template-columns: 110px 1fr 88px;
          gap: 14px;
          padding: 17px 0;
          border-bottom: 1px solid #e4e9e6;
          align-items: start;
        }
        .ticket-page .e-row:last-child {
          border-bottom: 0;
        }
        .ticket-page .time {
          font-size: 12px;
          color: #8a9691;
          padding-top: 2px;
        }
        .ticket-page .e-title {
          font-size: 13px;
          font-weight: 650;
          margin-bottom: 4px;
        }
        .ticket-page .e-desc {
          font-size: 12.5px;
          color: #5f6b67;
          line-height: 1.45;
        }
        .ticket-page .source {
          text-align: right;
          font-size: 11px;
          color: #8a9691;
          font-weight: 650;
        }
        .ticket-page .source-pill {
          display: inline-block;
          padding: 5px 7px;
          background: #f4f6f5;
          border-radius: 6px;
        }
        .ticket-page .plan {
          padding: 18px 20px;
        }
        .ticket-page .plan-step {
          display: flex;
          gap: 12px;
          padding: 0 0 18px;
          position: relative;
        }
        .ticket-page .plan-step:last-child {
          padding-bottom: 0;
        }
        .ticket-page .step-num {
          width: 25px;
          height: 25px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #eef8f4;
          color: #23775b;
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 750;
        }
        .ticket-page .step-title {
          font-size: 13px;
          font-weight: 650;
          margin: 3px 0 4px;
        }
        .ticket-page .step-desc {
          font-size: 12px;
          color: #5f6b67;
          line-height: 1.45;
        }
        .ticket-page .action-box {
          margin-top: 20px;
          background: #fff;
          border: 1px solid #e4e9e6;
          border-radius: 14px;
          padding: 20px;
        }
        .ticket-page .action-label {
          font-size: 11px;
          color: #23775b;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 7px;
        }
        .ticket-page .action-box h3 {
          font-size: 16px;
          margin: 0 0 6px;
        }
        .ticket-page .action-box p {
          font-size: 12.5px;
          color: #5f6b67;
          line-height: 1.5;
          margin: 0;
        }
        .ticket-page .buttons {
          display: flex;
          gap: 9px;
          margin-top: 16px;
        }
        .ticket-page .primary,
        .ticket-page .secondary {
          border-radius: 8px;
          padding: 9px 13px;
          font: 650 13px inherit;
          cursor: pointer;
        }
        .ticket-page .primary {
          border: 1px solid #2f9874;
          background: #2f9874;
          color: #fff;
        }
        .ticket-page .primary:hover {
          background: #23775b;
        }
        .ticket-page .secondary {
          border: 1px solid #e4e9e6;
          background: #fff;
          color: #17201d;
        }
        .ticket-page .secondary:hover {
          background: #f6f8f7;
        }
        .ticket-page .ticket-meta {
          margin-top: 20px;
          background: #fff;
          border: 1px solid #e4e9e6;
          border-radius: 14px;
          padding: 18px 20px;
        }
        .ticket-page .ticket-row {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          font-size: 12.5px;
          padding: 6px 0;
        }
        .ticket-page .ticket-key {
          color: #8a9691;
        }
        .ticket-page .ticket-value {
          font-weight: 600;
          text-align: right;
        }
        .ticket-page .toast {
          position: fixed;
          right: 24px;
          bottom: 24px;
          max-width: 380px;
          background: #17201d;
          color: #fff;
          padding: 13px 16px;
          border-radius: 10px;
          font-size: 13px;
          line-height: 1.4;
          opacity: 0;
          transform: translateY(8px);
          transition: 0.2s;
          pointer-events: none;
          z-index: 100;
        }
        .ticket-page .toast.show {
          opacity: 1;
          transform: none;
        }
        @media (max-width: 1000px) {
          .ticket-page .grid {
            grid-template-columns: 1fr;
          }
          .ticket-page .metrics {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 800px) {
          .ticket-page {
            padding: 28px 20px 60px;
          }
          .ticket-page .metrics {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <div className="content">
        <div className="breadcrumb">
          <a href="#">Incidents</a>
          <span>/</span>
          <span>INC-1842</span>
        </div>

        <div className="incident-top">
          <div>
            <div className="eyebrow">Production incident · SEV-2</div>
            <h1>Checkout requests are failing after today&apos;s release</h1>
            <p className="description">
              Reported by Support · Ticket INC-1842 · Started 18 minutes ago
            </p>
          </div>
          <div className="status">
            <span className="status-dot"></span>
            Active incident
          </div>
        </div>

        <section className="metrics">
          <div className="metric">
            <div className="metric-label">Checkout errors</div>
            <div className="metric-value">18.7%</div>
            <div className="metric-sub">was 0.3% before deploy</div>
          </div>
          <div className="metric">
            <div className="metric-label">Affected service</div>
            <div className="metric-value">checkout-api</div>
            <div className="metric-sub">production</div>
          </div>
          <div className="metric">
            <div className="metric-label">Started</div>
            <div className="metric-value">2:41 PM</div>
            <div className="metric-sub">3 min after release</div>
          </div>
          <div className="metric">
            <div className="metric-label">Customers affected</div>
            <div className="metric-value">~312</div>
            <div className="metric-sub">estimated failed checkouts</div>
          </div>
        </section>

        <section className="diagnosis">
          <div className="diag-icon">C</div>
          <div>
            <div className="diag-label">CloudPilot diagnosis</div>
            <h2>The new checkout release is exhausting database connections.</h2>
            <p>
              Release <strong>checkout-api v2.18.4</strong> changed the payment retry path.
              Since deployment, each failed payment attempt is holding a database connection
              while retrying. Connection usage rose from 42% to 96%, followed by request
              timeouts. The previous release does not show this behavior.{' '}
              <span className="confidence">High confidence.</span>
            </p>
          </div>
        </section>

        <div className="grid">
          <section className="card">
            <div className="card-head">
              <div>
                <div className="card-title">What CloudPilot found</div>
                <div className="card-sub">Evidence correlated across the incident</div>
              </div>
              <div className="card-sub">5 signals</div>
            </div>

            <div className="evidence">
              {EVIDENCE.map((item) => (
                <div className="e-row" key={item.time + item.title}>
                  <div className="time">{item.time}</div>
                  <div>
                    <div className="e-title">{item.title}</div>
                    <div className="e-desc">{item.desc}</div>
                  </div>
                  <div className="source">
                    <span className="source-pill">{item.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div>
            <section className="card">
              <div className="card-head">
                <div>
                  <div className="card-title">Recommended recovery</div>
                  <div className="card-sub">Safest path to restore checkout</div>
                </div>
              </div>

              <div className="plan">
                {RECOVERY_STEPS.map((step, index) => (
                  <div className="plan-step" key={step.title}>
                    <div className="step-num">{index + 1}</div>
                    <div>
                      <div className="step-title">{step.title}</div>
                      <div className="step-desc">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="action-box">
              <div className="action-label">Ready to help</div>
              <h3>Restore checkout</h3>
              <p>
                CloudPilot can prepare the rollback to v2.18.3. You&apos;ll see exactly
                what will change before anything runs.
              </p>

              <div className="buttons">
                <button
                  className="primary"
                  type="button"
                  onClick={() =>
                    showToast(
                      'Rollback prepared. CloudPilot would now show the exact change and ask for confirmation before execution.'
                    )
                  }
                >
                  Prepare rollback
                </button>
                <button
                  className="secondary"
                  type="button"
                  onClick={() =>
                    showToast(
                      'Opening the investigation view with correlated logs, metrics, deployment changes, and ticket context.'
                    )
                  }
                >
                  Investigate more
                </button>
              </div>
            </section>

            <section className="ticket-meta">
              {TICKET_META.map((row) => (
                <div className="ticket-row" key={row.key}>
                  <span className="ticket-key">{row.key}</span>
                  <span className="ticket-value">{row.value}</span>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>

      <div className={`toast${toastVisible ? ' show' : ''}`}>{toastMessage}</div>
    </div>
  );
}

export default TicketPage;
