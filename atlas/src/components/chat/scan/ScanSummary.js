import React from 'react';

function ScanSummary({ scanResult }) {
  const badgeLabel =
    scanResult?.highestPriority === 'high'
      ? 'High priority'
      : scanResult?.highestPriority === 'medium'
        ? 'Medium priority'
        : scanResult?.highestPriority === 'low'
          ? 'Low priority'
          : null;

  return (
    <div className="scan-summary">
      <div>
        <div className="scan-summary-eyebrow">NEEDS ATTENTION</div>
        <div className="scan-summary-title">{scanResult.headline}</div>
      </div>
      {badgeLabel ? (
        <div className="scan-summary-badge">{badgeLabel}</div>
      ) : null}
    </div>
  );
}

export default ScanSummary;
