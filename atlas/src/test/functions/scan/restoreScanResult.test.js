import { restoreScanResult } from '../../../functions/scan/restoreScanResult';

describe('restoreScanResult', () => {
  test('restores a saved S3 result', () => {
    const restored = restoreScanResult({
      id: 10,
      conversationId: 12,
      cloudPilotMessageId: 44,
      scanName: 'Finding Fix',
      service: 's3',
      schemaVersion: 1,
      completedAt: '2026-09-23T23:00:00.000Z',
      payload: {
        schemaVersion: 1,
        summary: {
          resourcesScanned: 1,
          findingCount: 1,
          region: 'us-west-2',
        },
        buckets: [{ bucketName: 'kite' }],
        findings: [
          {
            findingID: 's3-encryption-off-kite',
            service: 's3',
            resourceName: 'kite',
            title: 'Encryption is off',
            severity: 'high',
          },
        ],
      },
    });

    expect(restored.service).toBe('s3');
    expect(restored.snapshotID).toBe(10);
    expect(restored.cloudPilotMessageID).toBe(44);
    expect(restored.findings).toHaveLength(1);
    expect(restored.scanResult.totalFindings).toBe(1);
  });

  test('restores a saved EC2 result', () => {
    const restored = restoreScanResult({
      id: 11,
      conversationId: 12,
      service: 'ec2',
      schemaVersion: 1,
      payload: {
        schemaVersion: 1,
        summary: {
          resourcesScanned: 1,
          findingCount: 1,
          region: 'us-west-2',
        },
        instances: [{ instanceId: 'i-123' }],
        findings: [
          {
            findingID: 'ec2-public-ip-i-123',
            service: 'ec2',
            resourceName: 'i-123',
            title: 'Public IP is attached',
            severity: 'medium',
          },
        ],
      },
    });

    expect(restored.service).toBe('ec2');
    expect(restored.findings).toHaveLength(1);
    expect(restored.scanResult.service).toBe('ec2');
  });

  test('rejects unsupported stored schema versions', () => {
    expect(
      restoreScanResult({
        service: 's3',
        schemaVersion: 2,
        payload: { schemaVersion: 2, buckets: [], findings: [] },
      })
    ).toBeNull();
  });
});
