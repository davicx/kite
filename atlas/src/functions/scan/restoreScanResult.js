import { normalizeScanResult } from './normalizeScanResult';

/**
 * Restores a database snapshot into the same shape used by DashboardPage.
 */
export function restoreScanResult(storedScan) {
  if (!storedScan || typeof storedScan !== 'object') {
    return null;
  }

  const payload = storedScan.payload;
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const schemaVersion = Number(
    storedScan.schemaVersion || payload.schemaVersion || 1
  );
  if (schemaVersion !== 1) {
    return null;
  }

  const navigatorData = payload.navigatorResponse?.data || null;
  const service =
    storedScan.service ||
    (Array.isArray(payload.buckets) ? 's3' : null) ||
    (Array.isArray(payload.instances) ? 'ec2' : null);

  if (service !== 's3' && service !== 'ec2') {
    return null;
  }

  return {
    service,
    findings: Array.isArray(payload.findings) ? payload.findings : [],
    navigatorData,
    summary: payload.summary || null,
    scanResult: normalizeScanResult(payload),
    snapshotID: storedScan.id || null,
    conversationID: storedScan.conversationId || null,
    cloudPilotMessageID: storedScan.cloudPilotMessageId || null,
    scanName: storedScan.scanName || null,
    completedAt: storedScan.completedAt || null,
    snapshotSaved: true,
  };
}

export default restoreScanResult;
