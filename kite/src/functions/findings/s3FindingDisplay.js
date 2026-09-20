/**
 * Friendly S3 finding copy for the Dashboard.
 * Presentation only — does not change scanner / Atlas truth.
 *
 * Lookup order: recommendationAction → ruleID → issueCode
 */

import { normalizeResourceTags } from './resourceTags';

export const S3_FINDING_DISPLAY = {
  ENABLE_PUBLIC_ACCESS_BLOCK: {
    title: 'Public access protection is off',
    meaning: 'This bucket could be more exposed than intended.',
    action: 'Fix',
  },
  ENABLE_DEFAULT_ENCRYPTION: {
    title: 'Encryption is off',
    meaning: "New files aren't encrypted by default.",
    action: 'Fix',
  },
  REVIEW_BUCKET_POLICY: {
    title: 'Bucket may allow public access',
    meaning: 'The bucket policy needs to be reviewed.',
    action: 'Review',
  },
  REMOVE_PUBLIC_ACL: {
    title: 'Public file permissions found',
    meaning: 'Some files may be publicly accessible.',
    action: 'Fix',
  },
  ENABLE_VERSIONING: {
    title: 'Versioning is off',
    meaning: 'Deleted or overwritten files may be harder to recover.',
    action: 'Fix',
  },
  ADD_LIFECYCLE_POLICY: {
    title: 'No lifecycle policy',
    meaning: 'Old files may be costing more than necessary.',
    action: 'Fix',
  },
  ENABLE_ACCESS_LOGGING: {
    title: 'Access logging is off',
    meaning: 'You have less visibility into who accesses this bucket.',
    action: 'Fix',
  },
  ADD_NAME_TAG: {
    title: 'Missing Name tag',
    meaning: 'This bucket is harder to identify and organize.',
    action: 'Fix',
  },
};

const S3_FINDING_ALIASES = {
  s3_public_access_block_disabled: 'ENABLE_PUBLIC_ACCESS_BLOCK',
  PUBLIC_ACCESS_BLOCK_DISABLED: 'ENABLE_PUBLIC_ACCESS_BLOCK',
  public_access_block_disabled: 'ENABLE_PUBLIC_ACCESS_BLOCK',

  s3_default_encryption_off: 'ENABLE_DEFAULT_ENCRYPTION',
  DEFAULT_ENCRYPTION_OFF: 'ENABLE_DEFAULT_ENCRYPTION',
  default_encryption_off: 'ENABLE_DEFAULT_ENCRYPTION',

  s3_bucket_policy_public: 'REVIEW_BUCKET_POLICY',
  BUCKET_POLICY_PUBLIC: 'REVIEW_BUCKET_POLICY',
  bucket_policy_public: 'REVIEW_BUCKET_POLICY',

  s3_public_acl: 'REMOVE_PUBLIC_ACL',
  PUBLIC_ACL: 'REMOVE_PUBLIC_ACL',
  public_acl: 'REMOVE_PUBLIC_ACL',

  s3_versioning_disabled: 'ENABLE_VERSIONING',
  VERSIONING_DISABLED: 'ENABLE_VERSIONING',
  versioning_disabled: 'ENABLE_VERSIONING',

  s3_no_lifecycle_policy: 'ADD_LIFECYCLE_POLICY',
  NO_LIFECYCLE_POLICY: 'ADD_LIFECYCLE_POLICY',
  no_lifecycle_policy: 'ADD_LIFECYCLE_POLICY',

  s3_access_logging_disabled: 'ENABLE_ACCESS_LOGGING',
  ACCESS_LOGGING_DISABLED: 'ENABLE_ACCESS_LOGGING',
  access_logging_disabled: 'ENABLE_ACCESS_LOGGING',

  s3_missing_name_tag: 'ADD_NAME_TAG',
  MISSING_NAME_TAG: 'ADD_NAME_TAG',
  missing_name_tag: 'ADD_NAME_TAG',
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

export function resolveS3RecommendationKey(findingOrCode) {
  if (findingOrCode == null) {
    return '';
  }

  if (typeof findingOrCode === 'string') {
    const alias = S3_FINDING_ALIASES[findingOrCode];
    if (alias) {
      return alias;
    }
    if (S3_FINDING_DISPLAY[findingOrCode]) {
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
    const resolved = resolveS3RecommendationKey(candidates[i]);
    if (resolved) {
      return resolved;
    }
  }

  return '';
}

export function isS3Finding(finding) {
  if (!finding || typeof finding !== 'object') {
    return false;
  }

  const service = String(finding.service || '').toLowerCase();
  if (service === 's3') {
    return true;
  }
  if (service && service !== 's3') {
    return false;
  }

  return Boolean(resolveS3RecommendationKey(finding));
}

export function getS3FindingDisplay(findingOrCode) {
  const key = resolveS3RecommendationKey(findingOrCode);
  if (key && S3_FINDING_DISPLAY[key]) {
    return {
      recommendationKey: key,
      ...S3_FINDING_DISPLAY[key],
    };
  }

  const finding = findingOrCode && typeof findingOrCode === 'object' ? findingOrCode : {};

  return {
    recommendationKey: key || '',
    title: firstNonEmpty([finding.title, finding.finding, 'S3 finding']),
    meaning: firstNonEmpty([
      finding.description,
      finding.summary,
      finding.recommendation,
      'CloudPilot found something worth looking at on this bucket.',
    ]),
    action: 'Review',
  };
}

export function getS3PriorityLabel(severity) {
  const normalized = String(severity || '').toLowerCase();
  if (normalized === 'high') {
    return { rank: 0, label: 'High', display: '🔴 High' };
  }
  if (normalized === 'medium') {
    return { rank: 1, label: 'Medium', display: '🟡 Medium' };
  }
  if (normalized === 'low') {
    return { rank: 2, label: 'Low', display: '🟢 Low' };
  }
  return { rank: 3, label: 'Unknown', display: String(severity || 'Unknown') };
}

export function toFriendlyS3Finding(finding) {
  const display = getS3FindingDisplay(finding);
  const priority = getS3PriorityLabel(finding.severity || finding.priority);
  const resourceName = firstNonEmpty([
    finding.resourceName,
    finding.resource_name,
    finding.bucket,
    finding.name,
  ]);

  return {
    ...finding,
    resourceName,
    friendlyTitle: display.title,
    friendlyMeaning: display.meaning,
    friendlyAction: display.action,
    friendlyPriority: priority.display,
    friendlyPriorityRank: priority.rank,
    recommendationKey: display.recommendationKey,
  };
}

export function groupFriendlyS3FindingsByBucket(findings) {
  const list = Array.isArray(findings) ? findings : [];
  const s3Findings = list.filter(isS3Finding).map(toFriendlyS3Finding);
  const groupsByBucket = {};

  s3Findings.forEach((finding) => {
    const bucketName = finding.resourceName || 'Unknown bucket';
    if (!groupsByBucket[bucketName]) {
      groupsByBucket[bucketName] = [];
    }
    groupsByBucket[bucketName].push(finding);
  });

  return Object.keys(groupsByBucket)
    .sort()
    .map((bucketName) => {
      const bucketFindings = groupsByBucket[bucketName].slice().sort((left, right) => {
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
        bucketName,
        groupName: bucketName,
        findings: bucketFindings,
      };
    });
}

export function collectS3FindingsFromScan({ findings, navigatorData }) {
  const fromFindings = Array.isArray(findings) ? findings.filter(isS3Finding) : [];
  if (fromFindings.length > 0) {
    return fromFindings;
  }

  const tables = Array.isArray(navigatorData?.tables) ? navigatorData.tables : [];
  const findingsTable = tables.find((table) => {
    return table.id === 's3_findings' || table.title === 'S3 Findings';
  });
  const navigatorRows = Array.isArray(findingsTable?.rows) ? findingsTable.rows : [];
  return navigatorRows.filter(isS3Finding);
}

export function buildS3EnvironmentSummary(groups) {
  const list = Array.isArray(groups) ? groups : [];
  let findingCount = 0;
  let securityCount = 0;
  let leadBucketName = '';
  let leadBucketFindingCount = 0;

  list.forEach((group) => {
    const bucketFindings = Array.isArray(group.findings) ? group.findings : [];
    findingCount += bucketFindings.length;
    if (bucketFindings.length > leadBucketFindingCount) {
      leadBucketFindingCount = bucketFindings.length;
      leadBucketName = group.bucketName;
    }
    bucketFindings.forEach((finding) => {
      if (String(finding.category || '').toLowerCase() === 'security') {
        securityCount += 1;
      }
    });
  });

  const resourceCount = list.length;
  const resourceLabel = resourceCount === 1 ? 'resource needs attention' : 'resources need attention';
  const findingLabel = findingCount === 1 ? 'thing worth looking at' : 'things worth looking at';
  let detail = `CloudPilot found ${findingCount} ${findingLabel}.`;

  if (leadBucketName) {
    detail = `CloudPilot found ${findingCount} ${findingLabel} in ${leadBucketName}.`;
  }

  if (securityCount > 0) {
    const securityLabel = securityCount === 1 ? 'is security-related' : 'are security-related';
    detail += ` ${securityCount} ${securityLabel}, so I'd start there.`;
  }

  return {
    headline: `${resourceCount} ${resourceLabel}`,
    detail,
    findingCount,
    resourceCount,
    securityCount,
    leadBucketName,
  };
}

export function isS3SelectedFinding(selectedFinding) {
  if (!selectedFinding || typeof selectedFinding !== 'object') {
    return false;
  }

  const service = String(selectedFinding.service || '').toLowerCase();
  if (service === 's3') {
    return true;
  }

  return Boolean(resolveS3RecommendationKey(selectedFinding));
}

function countFindingCategories(findings) {
  const counts = {
    security: 0,
    reliability: 0,
    cost: 0,
    configuration: 0,
    operations: 0,
  };

  (Array.isArray(findings) ? findings : []).forEach((finding) => {
    const category = String(finding.category || '').toLowerCase();
    if (counts[category] == null) {
      counts.configuration += 1;
      return;
    }
    counts[category] += 1;
  });

  return counts;
}

function statusToOnOff(value) {
  const normalized = String(value || '').toLowerCase();
  if (normalized === 'enabled' || normalized === 'yes' || normalized === 'on') {
    return 'On';
  }
  return 'Off';
}

export function buildFriendlyS3Buckets({ navigatorData, findingGroups }) {
  const groups = Array.isArray(findingGroups) ? findingGroups : [];
  const findingsByBucket = {};
  groups.forEach((group) => {
    findingsByBucket[group.bucketName || group.groupName] = group.findings || [];
  });

  const tables = Array.isArray(navigatorData?.tables) ? navigatorData.tables : [];
  const bucketsTable = tables.find((table) => {
    return table.id === 's3_buckets' || table.title === 'S3 Buckets';
  });
  const rows = Array.isArray(bucketsTable?.rows) ? bucketsTable.rows : [];

  if (rows.length > 0) {
    return rows.map((row) => {
      const bucketName = row.name || row.bucketName || 'Unknown bucket';
      const bucketFindings = findingsByBucket[bucketName] || [];
      const findingCount = bucketFindings.length;
      const categories = countFindingCategories(bucketFindings);

      return {
        bucketName,
        region: row.region || '',
        health: findingCount > 0 ? 'needs_attention' : 'healthy',
        healthLabel: findingCount > 0 ? '🔴 Needs attention' : '🟢 Healthy',
        findingCount,
        findingLabel: findingCount === 0 ? 'No findings' : `${findingCount} finding${findingCount === 1 ? '' : 's'}`,
        tags: normalizeResourceTags(row.tags),
        details: {
          encryption: statusToOnOff(row.encryption_enabled),
          publicAccess: statusToOnOff(row.public_access_block),
          versioning: statusToOnOff(row.versioning_enabled),
          logging: statusToOnOff(row.access_logging_enabled),
          lifecycle: String(row.lifecycle_configured || '').toLowerCase() === 'yes' ? 'Yes' : 'None',
          categories,
        },
      };
    });
  }

  return groups.map((group) => {
    const bucketName = group.bucketName || group.groupName;
    const bucketFindings = group.findings || [];
    const findingCount = bucketFindings.length;
    return {
      bucketName,
      region: '',
      health: 'needs_attention',
      healthLabel: '🔴 Needs attention',
      findingCount,
      findingLabel: `${findingCount} finding${findingCount === 1 ? '' : 's'}`,
      tags: [],
      details: {
        encryption: '—',
        publicAccess: '—',
        versioning: '—',
        logging: '—',
        lifecycle: '—',
        categories: countFindingCategories(bucketFindings),
      },
    };
  });
}

