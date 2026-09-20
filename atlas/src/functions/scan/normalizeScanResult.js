import { getCurrentScanKind } from '../findings/currentScan';
import {
  collectS3FindingsFromScan,
  getS3FindingDisplay,
  getS3PriorityLabel,
} from '../findings/s3FindingDisplay';
import {
  collectEC2FindingsFromScan,
  getEC2FindingDisplay,
  getEC2PriorityLabel,
} from '../findings/ec2FindingDisplay';

const PRIORITY_RANK = {
  high: 0,
  medium: 1,
  low: 2,
};

function pickPriority(finding) {
  return String(finding?.severity || finding?.priority || '').toLowerCase();
}

function sortByPriority(findings) {
  return findings.slice().sort((left, right) => {
    const leftRank = PRIORITY_RANK[pickPriority(left)];
    const rightRank = PRIORITY_RANK[pickPriority(right)];
    const leftValue = leftRank == null ? 3 : leftRank;
    const rightValue = rightRank == null ? 3 : rightRank;
    return leftValue - rightValue;
  });
}

function buildHeadline(service, totalResources, totalFindings) {
  if (service === 'ec2') {
    const resourceWord = totalResources === 1 ? 'instance' : 'instances';
    const verb = totalResources === 1 ? 'has' : 'have';
    return `${totalResources} EC2 ${resourceWord} ${verb} ${totalFindings} security and configuration findings`;
  }

  const resourceWord = totalResources === 1 ? 'bucket' : 'buckets';
  const verb = totalResources === 1 ? 'has' : 'have';
  return `${totalResources} S3 ${resourceWord} ${verb} ${totalFindings} security and configuration findings`;
}

function buildTopFinding(service, finding) {
  if (!finding) {
    return null;
  }

  const display =
    service === 'ec2'
      ? getEC2FindingDisplay(finding)
      : getS3FindingDisplay(finding);
  const priorityInfo =
    service === 'ec2'
      ? getEC2PriorityLabel(finding.severity || finding.priority)
      : getS3PriorityLabel(finding.severity || finding.priority);

  const resource =
    finding.resourceName ||
    finding.resource_name ||
    finding.name ||
    finding.resourceID ||
    finding.resource_id ||
    '';

  let description = display.meaning || finding.description || '';
  if (resource && description && !description.includes(resource)) {
    description = `${description.replace(/\.$/, '')} on ${resource}.`;
  }

  const fixAvailable =
    finding.remediationAvailable === true ||
    String(display.action || '').toLowerCase() === 'fix';

  return {
    title: display.title || finding.title || 'Finding',
    description,
    resource,
    priority: priorityInfo.label || 'Unknown',
    priorityKey: pickPriority(finding) || 'unknown',
    fixAvailable,
  };
}

function formatCostSavings(costSavings) {
  if (costSavings == null) {
    return null;
  }
  if (typeof costSavings === 'string') {
    return costSavings;
  }
  if (typeof costSavings === 'object' && costSavings.amount != null) {
    const period = costSavings.period || 'month';
    return `$${costSavings.amount} / ${period}`;
  }
  return null;
}

/**
 * Normalize live atlasResponse from scan_s3 / scan_ec2 into one UI shape.
 * Returns null when this is not a completed S3/EC2 scan with findings.
 */
export function normalizeScanResult(atlasResponse) {
  if (!atlasResponse || typeof atlasResponse !== 'object') {
    return null;
  }

  const navigatorData = atlasResponse.navigatorResponse?.data || null;
  const summary = atlasResponse.summary || {};
  const service =
    getCurrentScanKind(navigatorData) ||
    (Array.isArray(atlasResponse.buckets) ? 's3' : null) ||
    (Array.isArray(atlasResponse.instances) ? 'ec2' : null);

  if (service !== 's3' && service !== 'ec2') {
    return null;
  }

  return service === 's3'
    ? normalizeS3ScanResult(atlasResponse, navigatorData, summary)
    : normalizeEC2ScanResult(atlasResponse, navigatorData, summary);
}

export function normalizeS3ScanResult(atlasResponse, navigatorData, summary) {
  const findings = collectS3FindingsFromScan({
    findings: atlasResponse.findings,
    navigatorData,
  });
  const totalFindings =
    Number(summary.findingCount ?? navigatorData?.meta?.findingCount) ||
    findings.length;
  const totalResources =
    Number(summary.resourcesScanned ?? navigatorData?.meta?.resourcesScanned) ||
    (Array.isArray(atlasResponse.buckets) ? atlasResponse.buckets.length : 0);

  if (totalFindings <= 0 && findings.length === 0) {
    return null;
  }

  const sorted = sortByPriority(findings);
  const topFinding = buildTopFinding('s3', sorted[0]);
  const highestPriority = topFinding?.priorityKey || null;

  return {
    service: 's3',
    resourceLabel: 'S3',
    totalResources,
    totalFindings: totalFindings || findings.length,
    costSavings: formatCostSavings(atlasResponse.costSavings) || null,
    highestPriority,
    headline: buildHeadline('s3', totalResources, totalFindings || findings.length),
    topFinding,
    findings: sorted,
  };
}

export function normalizeEC2ScanResult(atlasResponse, navigatorData, summary) {
  const findings = collectEC2FindingsFromScan({
    findings: atlasResponse.findings,
    navigatorData,
  });
  const totalFindings =
    Number(summary.findingCount ?? navigatorData?.meta?.findingCount) ||
    findings.length;
  const totalResources =
    Number(summary.resourcesScanned ?? navigatorData?.meta?.resourcesScanned) ||
    (Array.isArray(atlasResponse.instances) ? atlasResponse.instances.length : 0);

  if (totalFindings <= 0 && findings.length === 0) {
    return null;
  }

  const sorted = sortByPriority(findings);
  const topFinding = buildTopFinding('ec2', sorted[0]);
  const highestPriority = topFinding?.priorityKey || null;

  return {
    service: 'ec2',
    resourceLabel: 'EC2',
    totalResources,
    totalFindings: totalFindings || findings.length,
    costSavings: formatCostSavings(atlasResponse.costSavings) || null,
    highestPriority,
    headline: buildHeadline('ec2', totalResources, totalFindings || findings.length),
    topFinding,
    findings: sorted,
  };
}

export default normalizeScanResult;
