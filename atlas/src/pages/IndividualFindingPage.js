import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const FINDINGS = [
  {
    id: 'encryption',
    title: 'Encryption is off',
    priority: 'high',
    meaning: "New files aren't encrypted by default.",
  },
  {
    id: 'public-access',
    title: "Public access isn't fully blocked",
    priority: 'high',
    meaning: 'Public access settings may allow this bucket to be exposed.',
  },
  {
    id: 'versioning',
    title: 'Versioning is disabled',
    priority: 'medium',
    meaning: 'Deleted or overwritten files may be difficult to recover.',
  },
  {
    id: 'logging',
    title: 'Access logging is disabled',
    priority: 'medium',
    meaning: "Requests to this bucket aren't being recorded.",
  },
  {
    id: 'lifecycle',
    title: "Lifecycle rules aren't configured",
    priority: 'low',
    meaning: 'Older files may remain in expensive storage longer than needed.',
  },
  {
    id: 'tags',
    title: 'No cost allocation tags',
    priority: 'low',
    meaning: 'This bucket may be harder to identify in cost reports.',
  },
];

const TOAST_MESSAGE =
  'Fix selected — this would open the CloudPilot remediation flow.';

function IndividualFindingPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function handleFixClick() {
    setToastVisible(true);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 2200);
  }

  return (
    <div className="individual-finding-page">
      <style>{`
        .individual-finding-page {
          box-sizing: border-box;
          padding: 44px 56px 80px;
          background: #fbfcfb;
          color: #17201d;
          min-height: 100%;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .individual-finding-page *,
        .individual-finding-page *::before,
        .individual-finding-page *::after {
          box-sizing: border-box;
        }
        .individual-finding-page button {
          font: inherit;
        }
        .individual-finding-page .content {
          max-width: 1180px;
          margin: auto;
        }
        .individual-finding-page .breadcrumb {
          display: flex;
          gap: 8px;
          margin-bottom: 25px;
          color: #8a9691;
          font-size: 13px;
        }
        .individual-finding-page .breadcrumb a {
          color: #23775b;
          font-weight: 600;
          text-decoration: none;
        }
        .individual-finding-page .eyebrow {
          color: #23775b;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 8px;
        }
        .individual-finding-page h1 {
          font-size: 27px;
          letter-spacing: -0.025em;
          overflow-wrap: anywhere;
          max-width: 900px;
          margin: 0;
        }
        .individual-finding-page .description {
          color: #5f6b67;
          font-size: 14px;
          margin-top: 8px;
        }
        .individual-finding-page .summary {
          display: flex;
          gap: 14px;
          margin: 28px 0 24px;
          padding: 18px 20px;
          background: #eef8f4;
          border: 1px solid #d9ebe3;
          border-radius: 12px;
        }
        .individual-finding-page .summary-icon {
          width: 28px;
          height: 28px;
          flex: 0 0 auto;
          border-radius: 8px;
          background: #2f9874;
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 700;
        }
        .individual-finding-page .summary strong {
          font-size: 14px;
        }
        .individual-finding-page .summary p {
          margin-top: 4px;
          color: #5f6b67;
          font-size: 13px;
          line-height: 1.5;
        }
        .individual-finding-page .card {
          background: #fff;
          border: 1px solid #e4e9e6;
          border-radius: 14px;
          overflow: hidden;
        }
        .individual-finding-page .card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 22px;
          border-bottom: 1px solid #e4e9e6;
        }
        .individual-finding-page .card-title {
          font-size: 15px;
          font-weight: 650;
        }
        .individual-finding-page .card-sub {
          font-size: 12px;
          color: #8a9691;
          margin-top: 4px;
        }
        .individual-finding-page table {
          width: 100%;
          border-collapse: collapse;
        }
        .individual-finding-page th {
          padding: 13px 20px;
          text-align: left;
          background: #fbfcfb;
          color: #8a9691;
          font-size: 11px;
          font-weight: 650;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .individual-finding-page td {
          padding: 20px;
          border-top: 1px solid #e4e9e6;
          font-size: 14px;
          vertical-align: middle;
        }
        .individual-finding-page tbody tr:hover {
          background: #fafcfb;
        }
        .individual-finding-page .finding {
          font-weight: 650;
        }
        .individual-finding-page .meaning {
          color: #5f6b67;
          line-height: 1.45;
          max-width: 470px;
        }
        .individual-finding-page .priority {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }
        .individual-finding-page .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .individual-finding-page .priority.high .dot {
          background: #d92d3a;
        }
        .individual-finding-page .priority.medium .dot {
          background: #d9902d;
        }
        .individual-finding-page .priority.low .dot {
          background: #87928d;
        }
        .individual-finding-page .action-head,
        .individual-finding-page .fix-cell {
          text-align: right;
        }
        .individual-finding-page .fix-cell {
          width: 90px;
        }
        .individual-finding-page .fix {
          min-width: 62px;
          padding: 8px 14px;
          border: 1px solid #b8d8ca;
          border-radius: 8px;
          background: #fff;
          color: #23775b;
          font: 650 13px inherit;
          cursor: pointer;
        }
        .individual-finding-page .fix:hover {
          background: #2f9874;
          border-color: #2f9874;
          color: #fff;
        }
        .individual-finding-page .toast {
          position: fixed;
          right: 24px;
          bottom: 24px;
          background: #17201d;
          color: #fff;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          opacity: 0;
          transform: translateY(8px);
          transition: 0.2s;
          pointer-events: none;
          z-index: 100;
        }
        .individual-finding-page .toast.show {
          opacity: 1;
          transform: none;
        }
        @media (max-width: 900px) {
          .individual-finding-page {
            padding: 28px 20px 60px;
          }
          .individual-finding-page table {
            min-width: 760px;
          }
          .individual-finding-page .card {
            overflow-x: auto;
          }
        }
      `}</style>

      <div className="content">
        <div className="breadcrumb">
          <Link to="/findings">S3 Buckets</Link>
          <span>/</span>
          <span>Bucket details</span>
        </div>

        <div className="eyebrow">S3 Bucket</div>
        <h1>codepipeline-us-west-2-e2cd1e5051c6-4c05-97be-fe8e1f9c1a7e</h1>
        <p className="description">us-west-2 · 6 findings need attention</p>

        <section className="summary">
          <div className="summary-icon">!</div>
          <div>
            <strong>6 things are worth looking at</strong>
            <p>
              CloudPilot found security and configuration issues with this bucket.
              I&apos;d start with the high-priority findings.
            </p>
          </div>
        </section>

        <section className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Findings</div>
              <div className="card-sub">6 findings for this bucket</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Finding</th>
                <th>Priority</th>
                <th>What this means</th>
                <th className="action-head">Action</th>
              </tr>
            </thead>
            <tbody>
              {FINDINGS.map((item) => (
                <tr key={item.id}>
                  <td className="finding">{item.title}</td>
                  <td>
                    <span className={`priority ${item.priority}`}>
                      <span className="dot"></span>
                      {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                    </span>
                  </td>
                  <td className="meaning">{item.meaning}</td>
                  <td className="fix-cell">
                    <button className="fix" type="button" onClick={handleFixClick}>
                      Fix
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <div className={`toast${toastVisible ? ' show' : ''}`}>{TOAST_MESSAGE}</div>
    </div>
  );
}

export default IndividualFindingPage;
