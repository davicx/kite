import React from 'react';

function ScanTopFinding({ topFinding, onFix }) {
  if (!topFinding) {
    return null;
  }

  const priorityClass =
    topFinding.priorityKey === 'medium'
      ? 'medium'
      : topFinding.priorityKey === 'low'
        ? 'low'
        : 'high';

  function handleFix() {
    // TODO: Connect finding to CloudPilot remediation flow.
    if (typeof onFix === 'function') {
      onFix(topFinding);
    }
  }

  return (
    <div className="scan-top-finding">
      <div>
        <div className="scan-finding-name">{topFinding.title}</div>
        <div className="scan-finding-desc">{topFinding.description}</div>
      </div>
      <div className={`scan-finding-priority ${priorityClass}`}>
        <span className="scan-priority-dot" aria-hidden="true" />
        {topFinding.priority}
      </div>
      <button className="scan-btn-fix" type="button" onClick={handleFix}>
        Fix
      </button>
    </div>
  );
}

export default ScanTopFinding;
