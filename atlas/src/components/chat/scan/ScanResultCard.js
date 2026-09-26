import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ScanSummary from './ScanSummary';
import ScanTopFinding from './ScanTopFinding';
import { AtlasFindingsContext } from '../../../functions/context/AtlasFindingsContext';

function ScanResultCard({ scanResult, onShowAll }) {
  const navigate = useNavigate();
  const { openResourceList } = useContext(AtlasFindingsContext) || {};

  if (!scanResult || !scanResult.topFinding) {
    return null;
  }

  // TEMP: Demo value until scan cost savings are calculated.
  const potentialCostSavings = scanResult.costSavings ?? '$5 / month';
  const findingCount = Number(scanResult.totalFindings) || 0;
  const showAllLabel = `Show all ${findingCount} finding${
    findingCount === 1 ? '' : 's'
  }`;

  function handleShowAll() {
    if (typeof onShowAll === 'function') {
      onShowAll();
    } else if (typeof openResourceList === 'function') {
      openResourceList();
    }
    navigate('/dashboard');
  }

  return (
    <div className="scan-result-card-wrap">
      <style>{`
        .scan-result-card-wrap {
          margin-top: 15px;
          max-width: 690px;
        }
        .scan-result-card {
          border: 1px solid #d8e8e1;
          border-radius: 13px;
          overflow: hidden;
          background: #fff;
          text-align: left;
        }
        .scan-summary {
          padding: 15px 17px;
          background: #eef8f4;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .scan-summary-eyebrow {
          font-size: 10px;
          font-weight: 800;
          color: #23775b;
          letter-spacing: 0.07em;
        }
        .scan-summary-title {
          font-size: 14px;
          font-weight: 700;
          margin-top: 4px;
          color: #17201d;
          line-height: 1.35;
        }
        .scan-summary-badge {
          flex-shrink: 0;
          font-size: 11px;
          font-weight: 700;
          color: #a92430;
          background: #fff4f4;
          border: 1px solid #f0d0d3;
          border-radius: 7px;
          padding: 5px 8px;
          white-space: nowrap;
        }
        .scan-top-finding {
          padding: 14px 17px;
          display: grid;
          grid-template-columns: 1fr 120px 70px;
          gap: 18px;
          align-items: center;
        }
        .scan-finding-name {
          font-size: 13px;
          font-weight: 700;
          color: #17201d;
        }
        .scan-finding-desc {
          font-size: 12px;
          color: #5f6b67;
          margin-top: 3px;
          line-height: 1.45;
        }
        .scan-finding-priority {
          font-size: 12px;
          color: #17201d;
        }
        .scan-priority-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #d92d3a;
          margin-right: 6px;
        }
        .scan-finding-priority.medium .scan-priority-dot {
          background: #d9902d;
        }
        .scan-finding-priority.low .scan-priority-dot {
          background: #87928d;
        }
        .scan-btn-fix {
          border: 1px solid #b8d8ca;
          background: #fff;
          border-radius: 8px;
          padding: 7px 12px;
          color: #23775b;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          font: inherit;
        }
        .scan-btn-fix:hover {
          background: #2f9874;
          color: #fff;
        }
        /* PREVIOUS cost block (no divider) — restore if preferred:
        .scan-cost {
          padding: 0 17px 16px;
        }
        .scan-cost-label {
          font-size: 11px;
          font-weight: 700;
          color: #8a9691;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .scan-cost-value {
          margin-top: 4px;
          font-size: 14px;
          font-weight: 700;
          color: #17201d;
        }
        */
        .scan-cost {
          margin: 0;
          padding: 12px 17px 14px;
          border-top: 1px solid #e8eeeb;
          background: #fff;
        }
        .scan-cost-label {
          font-size: 10px;
          font-weight: 800;
          color: #8a9691;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .scan-cost-value {
          margin-top: 4px;
          font-size: 14px;
          font-weight: 700;
          color: #17201d;
        }
        .scan-show-all {
          margin-top: 10px;
          border: 1px solid #e4e9e6;
          background: #fff;
          border-radius: 8px;
          padding: 7px 10px;
          color: #5f6b67;
          font-size: 12px;
          cursor: pointer;
          font: inherit;
        }
        .scan-show-all:hover {
          background: #eef8f4;
          color: #23775b;
        }
        @media (max-width: 700px) {
          .scan-top-finding {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>

      <div className="scan-result-card">
        <ScanSummary scanResult={scanResult} />
        <ScanTopFinding topFinding={scanResult.topFinding} />
        {findingCount > 0 ? (
          <div className="scan-cost">
            <div className="scan-cost-label">Potential Cost Savings</div>
            <div className="scan-cost-value">{potentialCostSavings}</div>
          </div>
        ) : null}
      </div>

      {findingCount > 0 ? (
        <button
          type="button"
          className="scan-show-all"
          onClick={handleShowAll}
        >
          {showAllLabel}
        </button>
      ) : null}
    </div>
  );
}

export default ScanResultCard;
