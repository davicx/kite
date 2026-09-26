/**
 * Payload for the one versioning finding the user clicked.
 * Other S3 findings do not use this.
 */

import { resolveS3RecommendationKey } from './s3FindingDisplay';

export function isAutomaticS3VersioningFix(finding) {
  return resolveS3RecommendationKey(finding) === 'ENABLE_VERSIONING';
}

export function buildS3VersioningFixContext({ finding, resourceName, scanSnapshotId }) {
  if (!isAutomaticS3VersioningFix(finding)) {
    return null;
  }

  const bucketName = String(
    resourceName || finding.resourceName || finding.resourceID || ''
  ).trim();

  if (!bucketName) {
    return null;
  }

  const context = {
    action: 'enable_s3_versioning',
    bucketName,
    bucket_name: bucketName,
    ruleId: finding.ruleID || finding.rule_id || 's3_versioning_disabled',
    service: 's3',
    title: finding.friendlyTitle || finding.title || 'Versioning is off',
  };

  const findingId = finding.findingID || finding.id || '';
  if (findingId) {
    context.findingId = String(findingId);
  }

  if (scanSnapshotId != null && scanSnapshotId !== '') {
    context.scanSnapshotId = scanSnapshotId;
  }

  return context;
}
