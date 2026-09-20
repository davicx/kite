import React, { useState } from 'react';
import FriendlyTagsPanel from './FriendlyTagsPanel';
import './friendlyDashboard.css';

/**
 * Friendly S3 buckets overview (new).
 * Does not replace the original Navigator S3 Buckets table.
 */
function FriendlyS3BucketsTable({ buckets }) {
  const [expanded, setExpanded] = useState(null);

  if (!Array.isArray(buckets) || buckets.length === 0) {
    return null;
  }

  const selectedBucket =
    expanded && buckets.find((bucket) => bucket.bucketName === expanded.name) || null;

  const toggle = (name, kind) => {
    setExpanded((current) => {
      if (current && current.name === name && current.kind === kind) {
        return null;
      }
      return { name, kind };
    });
  };

  return (
    <div className="friendly-section">
      <h2 className="friendly-section__title">S3 Buckets</h2>
      <table className="friendly-table">
        <thead>
          <tr>
            <th scope="col">Bucket</th>
            <th scope="col">Region</th>
            <th scope="col">Health</th>
            <th scope="col">Findings</th>
            <th scope="col">Tags</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {buckets.map((bucket) => {
            const tagCount = Array.isArray(bucket.tags) ? bucket.tags.length : 0;
            const isViewOpen = expanded && expanded.name === bucket.bucketName && expanded.kind === 'view';

            return (
              <tr key={bucket.bucketName}>
                <td className="friendly-table__finding">{bucket.bucketName}</td>
                <td>{bucket.region || '—'}</td>
                <td className="friendly-table__priority">{bucket.healthLabel}</td>
                <td>
                  <strong>{bucket.findingLabel}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    className="friendly-action"
                    onClick={() => toggle(bucket.bucketName, 'tags')}
                  >
                    Tags ({tagCount})
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="friendly-action"
                    onClick={() => toggle(bucket.bucketName, 'view')}
                  >
                    {isViewOpen ? 'Hide' : 'View'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedBucket && expanded.kind === 'tags' && (
        <FriendlyTagsPanel
          title={`Tags — ${selectedBucket.bucketName}`}
          tags={selectedBucket.tags}
        />
      )}

      {selectedBucket && expanded.kind === 'view' && (
        <div className="friendly-bucket-detail">
          <h3>{selectedBucket.bucketName}</h3>
          <p>Encryption: {selectedBucket.details.encryption}</p>
          <p>Public access protection: {selectedBucket.details.publicAccess}</p>
          <p>Versioning: {selectedBucket.details.versioning}</p>
          <p>Logging: {selectedBucket.details.logging}</p>
          <p>Lifecycle policy: {selectedBucket.details.lifecycle}</p>
          <p>
            {selectedBucket.details.categories.security} security ·{' '}
            {selectedBucket.details.categories.reliability} reliability ·{' '}
            {selectedBucket.details.categories.cost} cost ·{' '}
            {selectedBucket.details.categories.configuration + selectedBucket.details.categories.operations} configuration
          </p>
        </div>
      )}
    </div>
  );
}

export default FriendlyS3BucketsTable;
