import React from 'react';
import './friendlyDashboard.css';

function S3EnvironmentSummary({ summary, onReviewFindings }) {
  if (!summary || summary.findingCount < 1) {
    return null;
  }

  return (
    <div className="friendly-section">
      <h2 className="friendly-section__title">Your AWS environment</h2>
      <p className="friendly-summary__headline">{summary.headline}</p>
      <p className="friendly-summary__detail">{summary.detail}</p>
      {typeof onReviewFindings === 'function' && (
        <button
          type="button"
          className="friendly-action"
          onClick={onReviewFindings}
        >
          Review findings
        </button>
      )}
    </div>
  );
}

export default S3EnvironmentSummary;
