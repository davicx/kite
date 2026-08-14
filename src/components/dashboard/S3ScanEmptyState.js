import React from 'react';
import './friendlyDashboard.css';

function S3ScanEmptyState({ onScan, scanning }) {
  return (
    <div className="friendly-section friendly-empty">
      <h2 className="friendly-section__title">S3</h2>
      <p>No scan results yet</p>
      <button
        type="button"
        className="friendly-empty__button"
        onClick={onScan}
        disabled={scanning}
      >
        {scanning ? 'Scanning…' : 'Scan AWS'}
      </button>
    </div>
  );
}

export default S3ScanEmptyState;
