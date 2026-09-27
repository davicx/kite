import React from 'react';

function CostsPage() {
  return (
    <div className="costs-page">
      <style>{`
        .costs-page {
          box-sizing: border-box;
          --green: #2f9874;
          --green-dark: #23775b;
          --green-soft: #eef8f4;
          --text: #17201d;
          --text-secondary: #5f6b67;
          --text-muted: #8a9691;
          --border: #e4e9e6;
          --background: #fbfcfb;
          --white: #ffffff;
          min-height: 100%;
          padding: 48px 56px 80px;
          background: var(--background);
          color: var(--text);
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .costs-page *,
        .costs-page *::before,
        .costs-page *::after {
          box-sizing: border-box;
        }
        .costs-page button {
          font: inherit;
        }
        .costs-page .content {
          max-width: 1180px;
          margin: 0 auto;
        }
        .costs-page .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
          color: var(--text-muted);
          font-size: 13px;
        }
        .costs-page .breadcrumb a {
          color: var(--green-dark);
          font-weight: 600;
          text-decoration: none;
        }
        .costs-page .eyebrow {
          margin-bottom: 8px;
          color: var(--green-dark);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .costs-page .page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 30px;
        }
        .costs-page h1 {
          margin: 0;
          font-size: 30px;
          font-weight: 720;
          letter-spacing: -0.03em;
        }
        .costs-page .page-description {
          margin: 8px 0 0;
          color: var(--text-secondary);
          font-size: 14px;
        }
        .costs-page .period-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 40px;
          padding: 0 14px;
          border: 1px solid #d5dfda;
          border-radius: 9px;
          background: var(--white);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .costs-page .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .costs-page .summary-card {
          padding: 20px 22px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 12px;
        }
        .costs-page .summary-label {
          margin-bottom: 10px;
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .costs-page .summary-value {
          font-size: 27px;
          font-weight: 720;
          letter-spacing: -0.025em;
        }
        .costs-page .summary-change {
          margin-top: 7px;
          color: var(--text-secondary);
          font-size: 12px;
        }
        .costs-page .summary-change.up { color: #a05f19; }
        .costs-page .summary-change.good { color: var(--green-dark); }
        .costs-page .card {
          margin-bottom: 24px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
        }
        .costs-page .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 22px;
          border-bottom: 1px solid var(--border);
        }
        .costs-page .card-title {
          font-size: 15px;
          font-weight: 680;
        }
        .costs-page .card-subtitle {
          margin-top: 4px;
          color: var(--text-muted);
          font-size: 12px;
        }
        .costs-page .range {
          display: flex;
          padding: 3px;
          background: #f4f6f5;
          border-radius: 8px;
        }
        .costs-page .range button {
          padding: 6px 10px;
          border: 0;
          border-radius: 6px;
          background: transparent;
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }
        .costs-page .range button.active {
          background: var(--white);
          color: var(--green-dark);
          box-shadow: 0 1px 3px rgba(20, 40, 32, 0.08);
        }
        .costs-page .chart-area { padding: 26px 26px 20px; }
        .costs-page .chart {
          position: relative;
          height: 240px;
          padding-left: 48px;
          padding-bottom: 32px;
        }
        .costs-page .chart-y-label {
          position: absolute;
          left: 0;
          color: var(--text-muted);
          font-size: 11px;
        }
        .costs-page .y60 { top: 0; }
        .costs-page .y40 { top: 74px; }
        .costs-page .y20 { top: 148px; }
        .costs-page .y0 { bottom: 29px; }
        .costs-page .chart-grid {
          position: absolute;
          top: 7px;
          left: 48px;
          right: 0;
          bottom: 32px;
        }
        .costs-page .grid-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: #edf0ee;
        }
        .costs-page .g1 { top: 0; }
        .costs-page .g2 { top: 33.3%; }
        .costs-page .g3 { top: 66.6%; }
        .costs-page .g4 { bottom: 0; }
        .costs-page .cost-svg {
          position: absolute;
          top: 7px;
          left: 48px;
          width: calc(100% - 48px);
          height: calc(100% - 39px);
          overflow: visible;
        }
        .costs-page .chart-months {
          position: absolute;
          left: 48px;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
          font-size: 11px;
        }
        .costs-page .two-column {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 24px;
        }
        .costs-page .service-list { padding: 4px 22px 10px; }
        .costs-page .service-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 1px solid #edf0ee;
        }
        .costs-page .service-row:last-child { border-bottom: 0; }
        .costs-page .service-name { font-size: 13px; font-weight: 620; }
        .costs-page .service-bar-background {
          width: 100%;
          height: 5px;
          margin-top: 9px;
          background: #edf3f0;
          border-radius: 999px;
          overflow: hidden;
        }
        .costs-page .service-bar {
          height: 100%;
          background: var(--green);
          border-radius: 999px;
        }
        .costs-page .service-cost { font-size: 13px; font-weight: 650; }
        .costs-page .insight {
          display: flex;
          gap: 14px;
          padding: 20px 22px;
        }
        .costs-page .insight + .insight {
          border-top: 1px solid #e4e9e6;
        }
        .costs-page .insight-icon {
          width: 32px;
          height: 32px;
          flex: 0 0 32px;
          display: grid;
          place-items: center;
          background: var(--green-soft);
          border-radius: 8px;
          color: var(--green-dark);
        }
        .costs-page .insight-label {
          margin-bottom: 5px;
          color: var(--green-dark);
          font-size: 10px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .costs-page .insight-title {
          margin-bottom: 5px;
          font-size: 14px;
          font-weight: 680;
        }
        .costs-page .insight-text {
          margin: 0;
          color: var(--text-secondary);
          font-size: 12px;
          line-height: 1.55;
        }
        .costs-page .insight-link {
          display: inline-block;
          margin-top: 12px;
          padding: 0;
          border: 0;
          background: none;
          color: var(--green-dark);
          font-size: 12px;
          font-weight: 650;
          cursor: pointer;
        }
        .costs-page table {
          width: 100%;
          border-collapse: collapse;
        }
        .costs-page th {
          padding: 12px 20px;
          text-align: left;
          background: #fbfcfb;
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .costs-page td {
          padding: 17px 20px;
          border-top: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 13px;
        }
        .costs-page tbody tr:hover { background: #fafcfb; }
        .costs-page .resource-name {
          color: var(--text);
          font-weight: 650;
        }
        .costs-page .service-pill {
          display: inline-flex;
          padding: 4px 8px;
          border-radius: 6px;
          background: #f2f5f3;
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 600;
        }
        .costs-page .cost-value {
          color: var(--text);
          font-weight: 650;
        }
        .costs-page .change-up { color: #a05f19; }
        .costs-page .change-down { color: var(--green-dark); }
        .costs-page .arrow {
          color: var(--text-muted);
          text-align: right;
          font-size: 17px;
        }
        @media (max-width: 850px) {
          .costs-page { padding: 30px 20px 60px; }
          .costs-page .summary-grid,
          .costs-page .two-column { grid-template-columns: 1fr; }
          .costs-page .page-header {
            align-items: flex-start;
            flex-direction: column;
          }
          .costs-page .card.table-card { overflow-x: auto; }
          .costs-page table { min-width: 700px; }
        }
      `}</style>

      <div className="content">
        <div className="breadcrumb">
          <span>Cloud</span>
          <span>/</span>
          <span>Costs</span>
        </div>

        <header className="page-header">
          <div>
            <div className="eyebrow">Costs</div>
            <h1>Your AWS costs</h1>
            <p className="page-description">
              Understand where your infrastructure spend is going.
            </p>
          </div>
          <button className="period-button" type="button">
            September 2026
            <span>⌄</span>
          </button>
        </header>

        <section className="summary-grid">
          <div className="summary-card">
            <div className="summary-label">Current month</div>
            <div className="summary-value">$42.18</div>
            <div className="summary-change up">↑ $6.22 from last month</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Projected month</div>
            <div className="summary-value">$51.30</div>
            <div className="summary-change">Based on current usage</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Potential savings</div>
            <div className="summary-value">$7.40</div>
            <div className="summary-change good">2 opportunities found</div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Cost over time</div>
              <div className="card-subtitle">Total AWS infrastructure spend</div>
            </div>
            <div className="range">
              <button type="button">30 days</button>
              <button className="active" type="button">6 months</button>
              <button type="button">1 year</button>
            </div>
          </div>
          <div className="chart-area">
            <div className="chart">
              <span className="chart-y-label y60">$60</span>
              <span className="chart-y-label y40">$40</span>
              <span className="chart-y-label y20">$20</span>
              <span className="chart-y-label y0">$0</span>
              <div className="chart-grid">
                <div className="grid-line g1" />
                <div className="grid-line g2" />
                <div className="grid-line g3" />
                <div className="grid-line g4" />
              </div>
              <svg className="cost-svg" viewBox="0 0 900 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="costFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2f9874" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#2f9874" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 145 C80 143, 120 140, 180 136 C240 130, 275 119, 350 116 C420 111, 470 100, 530 94 C600 87, 640 78, 710 70 C780 63, 830 55, 900 48 L900 200 L0 200 Z"
                  fill="url(#costFill)"
                />
                <path
                  d="M0 145 C80 143, 120 140, 180 136 C240 130, 275 119, 350 116 C420 111, 470 100, 530 94 C600 87, 640 78, 710 70 C780 63, 830 55, 900 48"
                  fill="none"
                  stroke="#2f9874"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="900" cy="48" r="5" fill="#ffffff" stroke="#2f9874" strokeWidth="3" />
              </svg>
              <div className="chart-months">
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
              </div>
            </div>
          </div>
        </section>

        <div className="two-column">
          <section className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Cost by service</div>
                <div className="card-subtitle">September 2026</div>
              </div>
            </div>
            <div className="service-list">
              <div className="service-row">
                <div>
                  <div className="service-name">EC2</div>
                  <div className="service-bar-background">
                    <div className="service-bar" style={{ width: '76%' }} />
                  </div>
                </div>
                <div className="service-cost">$24.82</div>
              </div>
              <div className="service-row">
                <div>
                  <div className="service-name">S3</div>
                  <div className="service-bar-background">
                    <div className="service-bar" style={{ width: '38%' }} />
                  </div>
                </div>
                <div className="service-cost">$9.41</div>
              </div>
              <div className="service-row">
                <div>
                  <div className="service-name">Data Transfer</div>
                  <div className="service-bar-background">
                    <div className="service-bar" style={{ width: '18%' }} />
                  </div>
                </div>
                <div className="service-cost">$4.20</div>
              </div>
              <div className="service-row">
                <div>
                  <div className="service-name">Other</div>
                  <div className="service-bar-background">
                    <div className="service-bar" style={{ width: '14%' }} />
                  </div>
                </div>
                <div className="service-cost">$3.75</div>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <div>
                <div className="card-title">CloudPilot insights</div>
                <div className="card-subtitle">
                  Opportunities based on your infrastructure
                </div>
              </div>
            </div>
            <div className="insight">
              <div className="insight-icon">✦</div>
              <div>
                <div className="insight-label">Savings opportunity</div>
                <div className="insight-title">
                  cloudpilot-demo is barely being used
                </div>
                <p className="insight-text">
                  CPU utilization has remained low. A smaller configuration may
                  reduce the cost of this resource.
                </p>
                <button className="insight-link" type="button">
                  View finding →
                </button>
              </div>
            </div>
            <div className="insight">
              <div className="insight-icon">↗</div>
              <div>
                <div className="insight-label">Cost change</div>
                <div className="insight-title">S3 costs increased this month</div>
                <p className="insight-text">
                  Storage costs are 31% higher than last month. wishlist-images
                  accounts for most of the increase.
                </p>
                <button className="insight-link" type="button">
                  View resource →
                </button>
              </div>
            </div>
          </section>
        </div>

        <section className="card table-card">
          <div className="card-header">
            <div>
              <div className="card-title">Resources</div>
              <div className="card-subtitle">
                See where your infrastructure costs are coming from
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Resource</th>
                <th>Service</th>
                <th>This month</th>
                <th>Last month</th>
                <th>Change</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="resource-name">cloudpilot-demo</td>
                <td><span className="service-pill">EC2</span></td>
                <td className="cost-value">$8.42</td>
                <td>$7.51</td>
                <td className="change-up">↑ 12%</td>
                <td className="arrow">›</td>
              </tr>
              <tr>
                <td className="resource-name">wishlist-api</td>
                <td><span className="service-pill">EC2</span></td>
                <td className="cost-value">$7.21</td>
                <td>$7.07</td>
                <td className="change-up">↑ 2%</td>
                <td className="arrow">›</td>
              </tr>
              <tr>
                <td className="resource-name">wishlist-images</td>
                <td><span className="service-pill">S3</span></td>
                <td className="cost-value">$4.81</td>
                <td>$3.67</td>
                <td className="change-up">↑ 31%</td>
                <td className="arrow">›</td>
              </tr>
              <tr>
                <td className="resource-name">cloudpilot-data</td>
                <td><span className="service-pill">S3</span></td>
                <td className="cost-value">$2.17</td>
                <td>$2.26</td>
                <td className="change-down">↓ 4%</td>
                <td className="arrow">›</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default CostsPage;
