/**
 * Which scan the Dashboard should show: the latest Navigator payload only.
 */

function tableMatches(table, id, titlePart) {
  if (!table) {
    return false;
  }
  if (table.id === id) {
    return true;
  }
  return String(table.title || '').toLowerCase().includes(titlePart);
}

export function getCurrentScanKind(navigatorData) {
  const tables = Array.isArray(navigatorData?.tables) ? navigatorData.tables : [];
  if (tables.some((table) => tableMatches(table, 's3_buckets', 's3') || tableMatches(table, 's3_findings', 's3'))) {
    return 's3';
  }
  if (tables.some((table) => tableMatches(table, 'ec2_instances', 'ec2') || tableMatches(table, 'ec2_findings', 'ec2'))) {
    return 'ec2';
  }
  return null;
}

export function getNavigatorScanMeta(navigatorData) {
  const meta = navigatorData?.meta || {};
  const stats = Array.isArray(navigatorData?.stats) ? navigatorData.stats : [];
  const statValue = (id) => {
    const stat = stats.find((item) => item.id === id);
    return stat == null ? null : stat.value;
  };

  return {
    region: meta.region || statValue('region') || '',
    resourcesScanned: meta.resourcesScanned ?? statValue('resources_scanned') ?? 0,
    findingCount: meta.findingCount ?? statValue('findings') ?? 0,
  };
}

export function buildScanCompleteCopy(kind, scanMeta) {
  const meta = scanMeta || {};
  const region = meta.region || 'your region';
  const count = Number(meta.resourcesScanned) || 0;
  const resourceLabel = kind === 'ec2'
    ? (count === 1 ? 'instance' : 'instances')
    : (count === 1 ? 'bucket' : 'buckets');

  return {
    title: 'Findings',
    headline: 'Scan completed',
    detail: count
      ? `CloudPilot scanned ${count} ${resourceLabel} in ${region}. Nothing worth looking at right now.`
      : `CloudPilot scanned ${region}. No findings.`,
  };
}

