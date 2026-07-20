import React from 'react';

/**
 * Compact PR result — View Pull Request opens GitHub in a new tab.
 * Expects atlasResponse when type === "pr" and pullRequestUrl is set.
 */
function ChatPullRequestPanel({ pullRequest }) {
  if (
    !pullRequest ||
    pullRequest.type !== 'pr' ||
    !pullRequest.pullRequestUrl
  ) {
    return null;
  }

  const statusLabel =
    pullRequest.status === 'existing'
      ? 'Already open — reusing for this demo'
      : 'Created';

  return (
    <div className="w-100 mt-2 text-start">
      <div className="card w-100 shadow-sm">
        <div className="card-body">
          <div className="fw-semibold text-dark mb-1">
            ✓ Pull Request {statusLabel}
          </div>
          <div className="mb-2">
            {pullRequest.title || 'Infrastructure change'}
          </div>
          {pullRequest.repository ? (
            <div className="small text-muted mb-1">
              Repository: {pullRequest.repository}
            </div>
          ) : null}
          {pullRequest.filePath ? (
            <div className="small text-muted mb-2">
              File: {pullRequest.filePath}
            </div>
          ) : null}
          {pullRequest.diff ? (
            <pre
              className="small bg-light border rounded p-2 mb-3"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {pullRequest.diff}
            </pre>
          ) : null}
          <div className="small text-muted mb-3">
            No AWS changes have been applied.
          </div>
          <a
            href={pullRequest.pullRequestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            View Pull Request
          </a>
        </div>
      </div>
    </div>
  );
}

export default ChatPullRequestPanel;
