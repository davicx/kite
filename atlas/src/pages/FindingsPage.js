import React from 'react';
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

function FindingsPage() {
  return (
    <div className="findings-page">
      <style>{`
        .findings-page {
          box-sizing: border-box;
          padding: 44px 56px 80px;
          background: #fbfcfb;
          color: #17201d;
          min-height: 100%;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .findings-page *,
        .findings-page *::before,
        .findings-page *::after {
          box-sizing: border-box;
        }
        .findings-page button {
          font: inherit;
        }
        .findings-page .content {
          max-width: 1180px;
          margin: 0 auto;
        }
        .findings-page .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 28px;
        }
        .findings-page .eyebrow {
          color: #23775b;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 8px;
        }
        .findings-page h1 {
          font-size: 30px;
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .findings-page .page-description {
          color: #5f6b67;
          font-size: 14px;
          margin-top: 8px;
        }
        .findings-page .scan-button {
          border: 0;
          border-radius: 9px;
          background: #2f9874;
          color: white;
          padding: 11px 17px;
          font-weight: 600;
          cursor: pointer;
        }
        .findings-page .scan-button:hover {
          background: #23775b;
        }
        .findings-page .card {
          background: #ffffff;
          border: 1px solid #e4e9e6;
          border-radius: 14px;
          overflow: hidden;
        }
        .findings-page .card-header {
          padding: 20px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e4e9e6;
        }
        .findings-page .card-title {
          font-size: 15px;
          font-weight: 650;
        }
        .findings-page .card-meta {
          color: #8a9691;
          font-size: 13px;
        }
        .findings-page table {
          width: 100%;
          border-collapse: collapse;
        }
        .findings-page th {
          padding: 13px 20px;
          text-align: left;
          color: #8a9691;
          font-size: 11px;
          font-weight: 650;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: #fbfcfb;
        }
        .findings-page td {
          padding: 18px 20px;
          border-top: 1px solid #e4e9e6;
          font-size: 14px;
          vertical-align: middle;
        }
        .findings-page tbody tr {
          transition: background 0.15s;
        }
        .findings-page tbody tr:hover {
          background: #fafcfb;
        }
        .findings-page .bucket-name {
          font-weight: 600;
          color: #29342f;
          max-width: 400px;
        }
        .findings-page .region {
          color: #5f6b67;
        }
        .findings-page .health {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
        }
        .findings-page .health-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d92d3a;
        }
        .findings-page .finding-count {
          font-weight: 600;
        }
        .findings-page .tags {
          color: #5f6b67;
        }
        .findings-page .action {
          color: #23775b;
          font-weight: 650;
          text-decoration: none;
        }
        .findings-page .action:hover {
          text-decoration: underline;
        }
        .findings-page .summary {
          margin-top: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 26px;
          background: #eef8f4;
          border: 1px solid #d9ebe3;
          border-radius: 14px;
        }
        .findings-page .summary-label {
          color: #23775b;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }
        .findings-page .summary h2 {
          font-size: 18px;
          margin: 0 0 5px;
        }
        .findings-page .summary p {
          color: #5f6b67;
          font-size: 14px;
          margin: 0;
        }
        .findings-page .section-header {
          margin-top: 42px;
          margin-bottom: 16px;
        }
        .findings-page .section-header h2 {
          font-size: 20px;
          margin: 0 0 5px;
        }
        .findings-page .section-header p {
          color: #5f6b67;
          font-size: 14px;
          margin: 0;
        }
        .findings-page .finding-card {
          display: grid;
          grid-template-columns: 1fr 140px 110px;
          align-items: center;
          gap: 24px;
          padding: 20px 22px;
          background: white;
          border: 1px solid #e4e9e6;
          border-radius: 12px;
          margin-bottom: 10px;
        }
        .findings-page .priority {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #d92d3a;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .findings-page .finding-title {
          font-size: 15px;
          font-weight: 650;
          margin-bottom: 6px;
        }
        .findings-page .finding-description {
          color: #5f6b67;
          font-size: 13px;
        }
        .findings-page .finding-resource {
          color: #5f6b67;
          font-size: 13px;
          overflow-wrap: anywhere;
        }
        .findings-page .finding-action {
          text-align: right;
        }
        @media (max-width: 900px) {
          .findings-page {
            padding: 28px 20px 60px;
          }
          .findings-page .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .findings-page .finding-card {
            grid-template-columns: 1fr;
          }
          .findings-page .finding-action {
            text-align: left;
          }
        }
      `}</style>

      <div className="content">
        <div className="page-header">
          <div>
            <div className="eyebrow">AWS Environment</div>
            <h1>S3 Buckets</h1>
            <p className="page-description">
              Your S3 resources and anything CloudPilot thinks is worth looking at.
            </p>
          </div>
          <button className="scan-button" type="button">
            Scan S3
          </button>
        </div>

        <section className="card">
          <div className="card-header">
            <div className="card-title">3 buckets</div>
            <div className="card-meta">Last scanned just now</div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Bucket</th>
                <th>Region</th>
                <th>Health</th>
                <th>Findings</th>
                <th>Tags</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {BUCKETS.map((bucket) => (
                <tr key={bucket.name}>
                  <td className="bucket-name">{bucket.name}</td>
                  <td className="region">{bucket.region}</td>
                  <td>
                    <span className="health">
                      <span className="health-dot"></span>
                      Needs attention
                    </span>
                  </td>
                  <td className="finding-count">{bucket.findings}</td>
                  <td className="tags">{bucket.tags}</td>
                  <td>
                    <Link className="action" to="/individual-finding">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="summary">
          <div>
            <div className="summary-label">Your AWS Environment</div>
            <h2>3 resources need attention</h2>
            <p>
              CloudPilot found 18 things worth looking at. 6 are security-related,
              so I&apos;d start there.
            </p>
          </div>
          <Link className="action" to="/individual-finding">
            Review all findings →
          </Link>
        </section>

        <div className="section-header">
          <h2>Findings</h2>
          <p>codepipeline-us-west-2-e2cd1e5051c6-4c05-97be-fe8e1f9c1a7e</p>
        </div>

        <article className="finding-card">
          <div>
            <div className="priority">● High</div>
            <div className="finding-title">Encryption is off</div>
            <div className="finding-description">
              New files aren&apos;t encrypted by default.
            </div>
          </div>
          <div className="finding-resource">
            codepipeline-us-west-2-e2cd1e5051c6-4c05-97be-fe8e1f9c1a7e
          </div>
          <div className="finding-action">
            <Link className="action" to="/individual-finding">
              Review →
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

export default FindingsPage;
