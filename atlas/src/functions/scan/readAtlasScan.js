import { getCurrentScanKind } from '../findings/currentScan';

/**
 * Keep the raw scan payload the dashboard needs.
 * Returns null when the reply is not an S3 or EC2 scan.
 */
export function readAtlasScan(atlasResponse) {
  if (!atlasResponse || typeof atlasResponse !== 'object') {
    return null;
  }

  const navigatorData = atlasResponse.navigatorResponse?.data || null;
  const findings = Array.isArray(atlasResponse.findings)
    ? atlasResponse.findings
    : [];
  const service =
    getCurrentScanKind(navigatorData) ||
    (Array.isArray(atlasResponse.buckets) ? 's3' : null) ||
    (Array.isArray(atlasResponse.instances) ? 'ec2' : null);

  if (service !== 's3' && service !== 'ec2') {
    return null;
  }

  return {
    service,
    findings,
    navigatorData,
    summary: atlasResponse.summary || null,
  };
}
