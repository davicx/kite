import { buildS3VersioningFixContext } from '../../../functions/findings/s3VersioningFixContext';

describe('s3VersioningFixContext', () => {
  test('builds the versioning fix payload for the clicked bucket', () => {
    const context = buildS3VersioningFixContext({
      finding: {
        findingID: 's3-versioning-off-kite-assets',
        ruleID: 's3_versioning_disabled',
        recommendationAction: 'ENABLE_VERSIONING',
        resourceName: 'kite-assets',
        title: 'Versioning disabled',
      },
      resourceName: 'kite-assets',
      scanSnapshotId: 42,
    });

    expect(context).toEqual({
      action: 'enable_s3_versioning',
      bucketName: 'kite-assets',
      bucket_name: 'kite-assets',
      ruleId: 's3_versioning_disabled',
      service: 's3',
      title: 'Versioning disabled',
      findingId: 's3-versioning-off-kite-assets',
      scanSnapshotId: 42,
    });
  });

  test('leaves other findings without an automatic fix payload', () => {
    const context = buildS3VersioningFixContext({
      finding: {
        recommendationAction: 'ENABLE_DEFAULT_ENCRYPTION',
        resourceName: 'kite-assets',
      },
      resourceName: 'kite-assets',
      scanSnapshotId: 42,
    });

    expect(context).toBeNull();
  });
});
