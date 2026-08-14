/**
 * Friendly EC2 finding copy for Chat + Dashboard.
 * Presentation only — does not change scanner / Atlas truth or the Tags table.
 */

import { normalizeResourceTags } from './resourceTags';

export const EC2_FINDING_DISPLAY = {
  RIGHTSIZE: {
    title: 'This instance is barely used',
    meaning: "You're paying for capacity that sits idle most of the time.",
    action: 'Fix',
  },
  ADD_NAME_TAG: {
    title: 'Missing Name tag',
    meaning: 'This instance is harder to identify and organize.',
    action: 'Fix',
  },
  REVIEW_STOPPED_INSTANCE: {
    title: 'This instance is stopped',
    meaning: 'It may still be costing you storage even while it is off.',
    action: 'Review',
  },
  UPGRADE_INSTANCE_TYPE: {
    title: 'This instance type is outdated',
    meaning: 'A newer type may be cheaper and better supported.',
    action: 'Review',
  },
  REMOVE_PUBLIC_IP: {
    title: 'Public IP is attached',
    meaning: 'This instance may be more exposed to the internet than intended.',
    action: 'Review',
  },
};

const EC2_FINDING_ALIASES = {
  ec2_low_cpu: 'RIGHTSIZE',
  LOW_CPU_UTILIZATION: 'RIGHTSIZE',
  low_cpu: 'RIGHTSIZE',

  ec2_missing_name_tag: 'ADD_NAME_TAG',
  MISSING_NAME_TAG: 'ADD_NAME_TAG',
  missing_name_tag: 'ADD_NAME_TAG',

  ec2_stopped_instance: 'REVIEW_STOPPED_INSTANCE',
  STOPPED_INSTANCE: 'REVIEW_STOPPED_INSTANCE',
  stopped_instance: 'REVIEW_STOPPED_INSTANCE',

  ec2_legacy_instance_type: 'UPGRADE_INSTANCE_TYPE',
  LEGACY_INSTANCE_TYPE: 'UPGRADE_INSTANCE_TYPE',
  legacy_instance_type: 'UPGRADE_INSTANCE_TYPE',

  ec2_public_ip_attached: 'REMOVE_PUBLIC_IP',
  PUBLIC_IP_ATTACHED: 'REMOVE_PUBLIC_IP',
  public_ip_attached: 'REMOVE_PUBLIC_IP',
};

const PRIORITY_RANK = {
  high: 0,
  medium: 1,
  low: 2,
};

function firstNonEmpty(values) {
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (value != null && String(value).trim() !== '') {
      return String(value).trim();
    }
  }
  return '';
}

export function resolveEC2RecommendationKey(findingOrCode) {
  if (findingOrCode == null) {
    return '';
  }

  if (typeof findingOrCode === 'string') {
    if (EC2_FINDING_ALIASES[findingOrCode]) {
      return EC2_FINDING_ALIASES[findingOrCode];
    }
    if (EC2_FINDING_DISPLAY[findingOrCode]) {
      return findingOrCode;
    }
    return '';
  }

  const candidates = [
    findingOrCode.recommendationAction,
    findingOrCode.recommendation_action,
    findingOrCode.ruleID,
    findingOrCode.rule_id,
    findingOrCode.issueCode,
    findingOrCode.issue_code,
  ];

  for (let i = 0; i < candidates.length; i += 1) {
    const resolved = resolveEC2RecommendationKey(candidates[i]);
    if (resolved) {
      return resolved;
    }
  }

  return '';
}

export function isEC2Finding(finding) {
  if (!finding || typeof finding !== 'object') {
    return false;
  }

  const service = String(finding.service || '').toLowerCase();
  if (service === 'ec2') {
    return true;
  }
  if (service && service !== 'ec2') {
    return false;
  }

  return Boolean(resolveEC2RecommendationKey(finding));
}

export function getEC2FindingDisplay(findingOrCode) {
  const key = resolveEC2RecommendationKey(findingOrCode);
  if (key && EC2_FINDING_DISPLAY[key]) {
    return {
      recommendationKey: key,
      ...EC2_FINDING_DISPLAY[key],
    };
  }

  const finding = findingOrCode && typeof findingOrCode === 'object' ? findingOrCode : {};

  return {
    recommendationKey: key || '',
    title: firstNonEmpty([finding.title, finding.finding, 'EC2 finding']),
    meaning: firstNonEmpty([
      finding.description,
      finding.summary,
      finding.recommendation,
      'CloudPilot found something worth looking at on this instance.',
    ]),
    action: 'Review',
  };
}

export function getEC2PriorityLabel(severity) {
  const normalized = String(severity || '').toLowerCase();
  if (normalized === 'high') {
    return { rank: 0, display: '🔴 High' };
  }
  if (normalized === 'medium') {
    return { rank: 1, display: '🟡 Medium' };
  }
  if (normalized === 'low') {
    return { rank: 2, display: '🟢 Low' };
  }
  return { rank: 3, display: String(severity || 'Unknown') };
}

export function toFriendlyEC2Finding(finding) {
  const display = getEC2FindingDisplay(finding);
  const priority = getEC2PriorityLabel(finding.severity || finding.priority);
  const resourceName = firstNonEmpty([
    finding.resourceName,
    finding.resource_name,
    finding.name,
    finding.resourceID,
    finding.resource_id,
    finding.instanceId,
  ]);

  return {
    ...finding,
    service: finding.service || 'ec2',
    resourceName,
    friendlyTitle: display.title,
    friendlyMeaning: display.meaning,
    friendlyAction: display.action,
    friendlyPriority: priority.display,
    recommendationKey: display.recommendationKey,
  };
}

export function collectEC2FindingsFromScan({ findings, navigatorData }) {
  const fromFindings = Array.isArray(findings) ? findings.filter(isEC2Finding) : [];
  if (fromFindings.length > 0) {
    return fromFindings;
  }

  const tables = Array.isArray(navigatorData?.tables) ? navigatorData.tables : [];
  const findingsTable = tables.find((table) => {
    return table.id === 'ec2_findings' || table.title === 'EC2 Findings';
  });
  const navigatorRows = Array.isArray(findingsTable?.rows) ? findingsTable.rows : [];
  return navigatorRows.filter(isEC2Finding);
}

export function groupFriendlyEC2FindingsByInstance(findings) {
  const list = Array.isArray(findings) ? findings : [];
  const friendlyFindings = list.filter(isEC2Finding).map(toFriendlyEC2Finding);
  const groupsByInstance = {};

  friendlyFindings.forEach((finding) => {
    const instanceName = finding.resourceName || 'Unknown instance';
    if (!groupsByInstance[instanceName]) {
      groupsByInstance[instanceName] = [];
    }
    groupsByInstance[instanceName].push(finding);
  });

  return Object.keys(groupsByInstance)
    .sort()
    .map((groupName) => {
      const instanceFindings = groupsByInstance[groupName].slice().sort((left, right) => {
        const leftRank = PRIORITY_RANK[String(left.severity || '').toLowerCase()];
        const rightRank = PRIORITY_RANK[String(right.severity || '').toLowerCase()];
        const leftValue = leftRank == null ? 3 : leftRank;
        const rightValue = rightRank == null ? 3 : rightRank;
        if (leftValue !== rightValue) {
          return leftValue - rightValue;
        }
        return String(left.friendlyTitle).localeCompare(String(right.friendlyTitle));
      });

      return {
        groupName,
        findings: instanceFindings,
      };
    });
}

function formatMonthlyCost(value) {
  if (value == null || value === '') {
    return '—';
  }
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return String(value);
  }
  return `$${amount.toFixed(2)}`;
}

export function buildFriendlyEC2Instances({ navigatorData, findingGroups }) {
  const groups = Array.isArray(findingGroups) ? findingGroups : [];
  const findingsByInstance = {};
  groups.forEach((group) => {
    findingsByInstance[group.groupName] = group.findings || [];
  });

  const tables = Array.isArray(navigatorData?.tables) ? navigatorData.tables : [];
  const instancesTable = tables.find((table) => {
    return table.id === 'ec2_instances' || table.title === 'EC2 Instances';
  });
  const rows = Array.isArray(instancesTable?.rows) ? instancesTable.rows : [];

  return rows.map((row) => {
    const instanceName = row.name || row.instance_id || 'Unknown instance';
    const instanceFindings = findingsByInstance[instanceName] || [];
    const findingCount = instanceFindings.length;

    return {
      instanceName,
      instanceId: row.instance_id || '',
      region: row.region || '',
      instanceType: row.instance_type || '',
      state: row.state || '',
      costLabel: formatMonthlyCost(row.estimated_monthly_cost),
      avgCpu: row.avg_cpu == null || row.avg_cpu === '' ? '—' : String(row.avg_cpu),
      role: row.role || '—',
      health: findingCount > 0 ? 'needs_attention' : 'healthy',
      healthLabel: findingCount > 0 ? '🔴 Needs attention' : '🟢 Healthy',
      findingCount,
      findingLabel: findingCount === 0 ? 'No findings' : `${findingCount} finding${findingCount === 1 ? '' : 's'}`,
      tags: normalizeResourceTags(row.tags),
    };
  });
}

