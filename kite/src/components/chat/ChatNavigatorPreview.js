import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collectS3FindingsFromScan,
  getS3FindingDisplay,
} from '../../functions/findings/s3FindingDisplay';
import {
  collectEC2FindingsFromScan,
  getEC2FindingDisplay,
} from '../../functions/findings/ec2FindingDisplay';
import {
  getCurrentScanKind,
  getNavigatorScanMeta,
  buildScanCompleteCopy,
} from '../../functions/findings/currentScan';

/**
 * Compact Navigator preview under the latest CloudPilot reply.
 * Removable spike — delete this file + ChatPage import if it feels wrong.
 */
function ChatNavigatorPreview({ navigatorData, findings }) {
  const navigate = useNavigate();

  const tables = Array.isArray(navigatorData?.tables) ? navigatorData.tables : [];
  const cards = Array.isArray(navigatorData?.cards) ? navigatorData.cards : [];
  const stats = Array.isArray(navigatorData?.stats) ? navigatorData.stats : [];
  const findingsList = Array.isArray(findings) ? findings : [];
  const s3Findings = collectS3FindingsFromScan({ findings, navigatorData });
  const ec2Findings = collectEC2FindingsFromScan({ findings, navigatorData });
  const friendlyPreviewFindings = s3Findings.length > 0 ? s3Findings : ec2Findings;
  const getFriendlyDisplay = s3Findings.length > 0 ? getS3FindingDisplay : getEC2FindingDisplay;
  const currentScanKind = getCurrentScanKind(navigatorData);
  const scanCompleteCopy = buildScanCompleteCopy(
    currentScanKind,
    getNavigatorScanMeta(navigatorData)
  );

  const previewTable = tables[0] || null;
  const previewColumns = Array.isArray(previewTable?.columns)
    ? previewTable.columns.slice(0, 4)
    : [];
  const previewRows = Array.isArray(previewTable?.rows)
    ? previewTable.rows.slice(0, 4)
    : [];
  const previewCard = cards[0] || null;
  const hasFriendlyPreview = friendlyPreviewFindings.length > 0;
  const hasCompletedScanWithNoFindings = Boolean(currentScanKind) && !hasFriendlyPreview;
  const hasAnything =
    hasFriendlyPreview ||
    hasCompletedScanWithNoFindings ||
    previewTable ||
    previewCard ||
    stats.length > 0 ||
    findingsList.length > 0;

  if (!hasAnything) {
    return null;
  }

  const openDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <button
      type="button"
      className="btn p-0 text-start w-100 mt-2 border-0 bg-transparent"
      onClick={openDashboard}
      aria-label="Open results in Dashboard"
    >
      <div
        className="border rounded-3 overflow-hidden shadow-sm"
        style={{ maxWidth: 520, backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-white">
          <span className="small fw-semibold text-dark">Results preview</span>
          <span className="small text-primary">Open Dashboard →</span>
        </div>

        {hasFriendlyPreview && (
          <div className="px-3 py-2 border-bottom">
            <div className="small fw-semibold mb-1">
              {friendlyPreviewFindings.length} finding{friendlyPreviewFindings.length === 1 ? '' : 's'} worth looking at
            </div>
            <ul className="small text-muted mb-0 ps-3">
              {friendlyPreviewFindings.slice(0, 3).map((finding, index) => {
                const display = getFriendlyDisplay(finding);
                const resourceName = finding.resourceName || finding.resource_name || finding.name || '';
                return (
                  <li key={finding.findingID || finding.row_id || index}>
                    {display.title}
                    {resourceName ? ` · ${resourceName}` : ''}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {hasCompletedScanWithNoFindings && (
          <div className="px-3 py-2 border-bottom">
            <div className="small fw-semibold mb-1">{scanCompleteCopy.headline}</div>
            <div className="small text-muted mb-0">{scanCompleteCopy.detail}</div>
          </div>
        )}

        {previewCard && !hasFriendlyPreview && !hasCompletedScanWithNoFindings && (
          <div className="px-3 py-2 border-bottom">
            {previewCard.title && (
              <div className="small fw-semibold mb-1">{previewCard.title}</div>
            )}
            {previewCard.message && (
              <div className="small text-muted mb-0">{previewCard.message}</div>
            )}
          </div>
        )}

        {!previewCard && !hasFriendlyPreview && findingsList.length > 0 && (
          <div className="px-3 py-2 border-bottom">
            <div className="small fw-semibold mb-1">
              {findingsList.length} recommendation{findingsList.length === 1 ? '' : 's'}
            </div>
            <ul className="small text-muted mb-0 ps-3">
              {findingsList.slice(0, 3).map((finding, index) => (
                <li key={finding.resourceID || finding.title || index}>
                  {finding.title || finding.rule || 'Finding'}
                  {finding.resourceID ? ` · ${finding.resourceID}` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        {stats.length > 0 && !hasFriendlyPreview && !hasCompletedScanWithNoFindings && (
          <div className="d-flex flex-wrap gap-2 px-3 py-2 border-bottom">
            {stats.slice(0, 4).map((stat) => (
              <div
                key={stat.id || stat.label}
                className="rounded-2 bg-white border px-2 py-1"
                style={{ minWidth: 88 }}
              >
                <div className="text-muted" style={{ fontSize: 10 }}>
                  {stat.label || stat.id}
                </div>
                <div className="small fw-semibold">{formatPreviewValue(stat.value)}</div>
              </div>
            ))}
          </div>
        )}

        {previewTable && previewColumns.length > 0 && !hasFriendlyPreview && !hasCompletedScanWithNoFindings && (
          <div className="table-responsive">
            <table className="table table-sm mb-0 align-middle bg-white">
              <thead>
                <tr>
                  {previewColumns.map((column) => (
                    <th key={column.key} scope="col" className="small text-muted">
                      {column.label || column.key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row, rowIndex) => (
                  <tr key={row.row_id || row.history_id || rowIndex}>
                    {previewColumns.map((column) => (
                      <td key={column.key} className="small">
                        {formatPreviewValue(row[column.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {(previewTable.rows || []).length > previewRows.length && (
              <div className="px-3 py-1 small text-muted bg-white border-top">
                +{(previewTable.rows || []).length - previewRows.length} more in Dashboard
              </div>
            )}
          </div>
        )}
      </div>
    </button>
  );
}

function formatPreviewValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }
  if (typeof value === 'object') {
    return '…';
  }
  return String(value);
}

export default ChatNavigatorPreview;
