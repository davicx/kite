/**
 * Mock architecture data for the System Design page.
 * Frontend-only demo — no AWS calls, no backend.
 *
 * Node positions are React Flow coordinates. Children of a boundary
 * (parentId) use positions relative to that boundary.
 */

import { MarkerType } from '@xyflow/react';

//DATA A: Resource nodes + boundaries
export function createInitialNodes() {
    return [
        //Outside AWS: Users → Route 53 → CloudFront
        {
            id: 'users',
            type: 'awsResource',
            position: { x: 20, y: 430 },
            data: {
                icon: 'users',
                service: 'Users',
                name: 'External traffic',
                category: 'Networking',
                filterCategory: 'networking',
                status: 'healthy',
                metric: '1.2k sessions',
            },
        },
        {
            id: 'route53',
            type: 'awsResource',
            position: { x: 265, y: 430 },
            data: {
                icon: 'route53',
                service: 'Route 53',
                name: 'kitecloud.io',
                category: 'Networking',
                filterCategory: 'networking',
                status: 'healthy',
                metric: '3 records',
            },
        },
        {
            id: 'cloudfront',
            type: 'awsResource',
            position: { x: 505, y: 430 },
            data: {
                icon: 'cloudfront',
                service: 'CloudFront',
                name: 'd1kite8x2.cloudfront.net',
                category: 'Networking',
                filterCategory: 'networking',
                status: 'healthy',
                metric: '92% cache hit',
            },
        },

        //AWS Account boundary
        {
            id: 'aws-account',
            type: 'awsBoundary',
            position: { x: 760, y: 40 },
            draggable: false,
            selectable: false,
            style: { width: 1010, height: 880 },
            data: {
                kind: 'account',
                title: 'AWS Account',
                subtitle: 'Production • 123456789012',
            },
        },
        {
            id: 'cloudwatch',
            type: 'awsResource',
            parentId: 'aws-account',
            extent: 'parent',
            position: { x: 410, y: 44 },
            data: {
                icon: 'cloudwatch',
                service: 'CloudWatch',
                name: 'cloudpilot-monitoring',
                category: 'Monitoring',
                filterCategory: 'monitoring',
                status: 'healthy',
                metric: '14 alarms',
            },
        },

        //VPC boundary (inside account)
        {
            id: 'vpc',
            type: 'awsBoundary',
            parentId: 'aws-account',
            position: { x: 40, y: 180 },
            draggable: false,
            selectable: false,
            style: { width: 930, height: 560 },
            data: {
                kind: 'vpc',
                title: 'VPC',
                subtitle: 'cloudpilot-production-vpc',
                detail: '10.0.0.0/16',
            },
        },
        {
            id: 'alb',
            type: 'awsResource',
            parentId: 'vpc',
            extent: 'parent',
            position: { x: 36, y: 225 },
            data: {
                icon: 'alb',
                service: 'Application Load Balancer',
                name: 'cloudpilot-web-alb',
                category: 'Networking',
                filterCategory: 'networking',
                status: 'healthy',
                metric: '124 req/min',
            },
        },

        //Auto Scaling Group boundary (inside VPC) with two EC2 instances
        {
            id: 'asg',
            type: 'awsBoundary',
            parentId: 'vpc',
            position: { x: 330, y: 90 },
            draggable: false,
            style: { width: 268, height: 322 },
            data: {
                kind: 'asg',
                title: 'EC2 Auto Scaling Group',
                subtitle: 'cloudpilot-api-asg',
                filterCategory: 'compute',
            },
        },
        {
            id: 'ec2-a',
            type: 'awsResource',
            parentId: 'asg',
            extent: 'parent',
            position: { x: 32, y: 54 },
            selected: true,
            data: {
                icon: 'ec2',
                service: 'EC2',
                name: 'kite-api-01',
                description: 't3.medium',
                category: 'Compute',
                filterCategory: 'compute',
                status: 'healthy',
                metric: 'CPU 18%',
            },
        },
        {
            id: 'ec2-b',
            type: 'awsResource',
            parentId: 'asg',
            extent: 'parent',
            position: { x: 32, y: 188 },
            data: {
                icon: 'ec2',
                service: 'EC2',
                name: 'kite-api-02',
                description: 't3.medium',
                category: 'Compute',
                filterCategory: 'compute',
                status: 'healthy',
                metric: 'CPU 4%',
                badge: { tone: 'amber', text: 'Possible resize' },
            },
        },
        {
            id: 'rds',
            type: 'awsResource',
            parentId: 'vpc',
            extent: 'parent',
            position: { x: 680, y: 265 },
            data: {
                icon: 'rds',
                service: 'RDS PostgreSQL',
                name: 'cloudpilot-production',
                description: 'db.t3.medium',
                category: 'Databases',
                filterCategory: 'databases',
                status: 'healthy',
                metric: '12 connections',
            },
        },
        {
            id: 'secrets',
            type: 'awsResource',
            parentId: 'vpc',
            extent: 'parent',
            position: { x: 360, y: 448 },
            data: {
                icon: 'secrets',
                service: 'Secrets Manager',
                name: 'cloudpilot/prod',
                category: 'Security',
                filterCategory: 'security',
                status: 'healthy',
                metric: '4 secrets',
            },
        },

        //In account, below the VPC
        {
            id: 's3',
            type: 'awsResource',
            parentId: 'aws-account',
            extent: 'parent',
            position: { x: 410, y: 772 },
            data: {
                icon: 's3',
                service: 'Amazon S3',
                name: 'kite-assets-prod',
                description: 'Standard storage',
                category: 'Storage',
                filterCategory: 'storage',
                status: 'warning',
                metric: '218 GB',
                badge: { tone: 'red', text: 'Review public access' },
            },
        },
    ];
}

//DATA B: Connections
const ARROW = { type: MarkerType.ArrowClosed, width: 16, height: 16, color: '#94a3b8' };
const MONITOR_STYLE = { stroke: '#a5b0c2', strokeDasharray: '5 4' };

export function createInitialEdges() {
    return [
        { id: 'e-users-route53', source: 'users', target: 'route53', sourceHandle: 'out-right', targetHandle: 'in-left', label: 'DNS', type: 'smoothstep', markerEnd: ARROW },
        { id: 'e-route53-cloudfront', source: 'route53', target: 'cloudfront', sourceHandle: 'out-right', targetHandle: 'in-left', type: 'smoothstep', markerEnd: ARROW },
        { id: 'e-cloudfront-alb', source: 'cloudfront', target: 'alb', sourceHandle: 'out-right', targetHandle: 'in-left', label: 'HTTPS', type: 'smoothstep', markerEnd: ARROW },

        { id: 'e-alb-ec2a', source: 'alb', target: 'ec2-a', sourceHandle: 'out-right', targetHandle: 'in-left', type: 'smoothstep', markerEnd: ARROW },
        { id: 'e-alb-ec2b', source: 'alb', target: 'ec2-b', sourceHandle: 'out-right', targetHandle: 'in-left', type: 'smoothstep', markerEnd: ARROW },

        { id: 'e-ec2a-rds', source: 'ec2-a', target: 'rds', sourceHandle: 'out-right', targetHandle: 'in-left', label: 'SQL', type: 'smoothstep', markerEnd: ARROW },
        { id: 'e-ec2b-rds', source: 'ec2-b', target: 'rds', sourceHandle: 'out-right', targetHandle: 'in-left', type: 'smoothstep', markerEnd: ARROW },

        { id: 'e-ec2a-s3', source: 'ec2-a', target: 's3', sourceHandle: 'out-bottom', targetHandle: 'in-top', type: 'smoothstep', markerEnd: ARROW },
        { id: 'e-ec2b-s3', source: 'ec2-b', target: 's3', sourceHandle: 'out-bottom', targetHandle: 'in-top', type: 'smoothstep', markerEnd: ARROW },

        { id: 'e-secrets-ec2a', source: 'secrets', target: 'ec2-a', sourceHandle: 'out-top', targetHandle: 'in-bottom', label: 'Credentials', type: 'smoothstep', markerEnd: ARROW },
        { id: 'e-secrets-ec2b', source: 'secrets', target: 'ec2-b', sourceHandle: 'out-top', targetHandle: 'in-bottom', type: 'smoothstep', markerEnd: ARROW },

        //Monitoring (dashed)
        { id: 'e-cw-alb', source: 'cloudwatch', target: 'alb', sourceHandle: 'out-bottom', targetHandle: 'in-top', label: 'Logs', type: 'smoothstep', markerEnd: ARROW, style: MONITOR_STYLE },
        { id: 'e-cw-asg', source: 'cloudwatch', target: 'asg', sourceHandle: 'out-bottom', targetHandle: 'in-top', type: 'smoothstep', markerEnd: ARROW, style: MONITOR_STYLE },
        { id: 'e-cw-rds', source: 'cloudwatch', target: 'rds', sourceHandle: 'out-bottom', targetHandle: 'in-top', type: 'smoothstep', markerEnd: ARROW, style: MONITOR_STYLE },
    ];
}

//DATA C: Details panel content per resource
export const resourceDetails = {
    users: {
        service: 'End Users',
        name: 'External traffic',
        resourceId: 'internet',
        status: 'Active',
        statusTone: 'green',
        region: 'Global',
        cost: '—',
        overview: [
            { label: 'Active sessions', value: '1.2k' },
            { label: 'Peak today', value: '2.4k sessions' },
        ],
        connections: ['Route 53'],
        tags: {},
        metrics: [{ label: 'Requests', value: '124 req/min' }],
    },
    route53: {
        service: 'Amazon Route 53',
        name: 'kitecloud.io',
        resourceId: 'Z0482727KITECLOUD',
        status: 'Available',
        statusTone: 'green',
        region: 'Global',
        cost: '$0.50/month',
        overview: [
            { label: 'Hosted zone', value: 'Public' },
            { label: 'Records', value: '3' },
        ],
        connections: ['Users', 'CloudFront'],
        tags: { Team: 'Platform', Environment: 'Production' },
        metrics: [{ label: 'DNS queries', value: '38k/day' }],
    },
    cloudfront: {
        service: 'Amazon CloudFront',
        name: 'd1kite8x2.cloudfront.net',
        resourceId: 'E2M9KITE8X2CDN',
        status: 'Deployed',
        statusTone: 'green',
        region: 'Global',
        cost: '$8.40/month',
        overview: [
            { label: 'Origin', value: 'cloudpilot-web-alb' },
            { label: 'Price class', value: 'North America + Europe' },
        ],
        connections: ['Route 53', 'Application Load Balancer'],
        tags: { Team: 'Platform', Environment: 'Production' },
        metrics: [
            { label: 'Cache hit rate', value: '92%' },
            { label: 'Data out', value: '61 GB/month' },
        ],
    },
    alb: {
        service: 'Application Load Balancer',
        name: 'cloudpilot-web-alb',
        resourceId: 'arn:...:loadbalancer/app/cloudpilot-web-alb',
        status: 'Healthy',
        statusTone: 'green',
        region: 'us-west-2',
        cost: '$22.27/month',
        overview: [
            { label: 'Scheme', value: 'internet-facing' },
            { label: 'Target group', value: 'cloudpilot-api-tg (2 healthy)' },
        ],
        connections: ['CloudFront', 'EC2 kite-api-01', 'EC2 kite-api-02', 'CloudWatch'],
        tags: { Team: 'Platform', Environment: 'Production' },
        metrics: [
            { label: 'Requests', value: '124 req/min' },
            { label: 'Latency p95', value: '182 ms' },
        ],
    },
    asg: {
        service: 'EC2 Auto Scaling Group',
        name: 'cloudpilot-api-asg',
        resourceId: 'cloudpilot-api-asg',
        status: 'In service',
        statusTone: 'green',
        region: 'us-west-2',
        cost: 'Included in EC2',
        overview: [
            { label: 'Desired capacity', value: '2' },
            { label: 'Min / Max', value: '2 / 4' },
        ],
        connections: ['Application Load Balancer', 'EC2 kite-api-01', 'EC2 kite-api-02', 'CloudWatch'],
        tags: { Team: 'Platform', Environment: 'Production' },
        metrics: [{ label: 'Instances in service', value: '2 of 4' }],
    },
    'ec2-a': {
        service: 'Amazon EC2',
        name: 'kite-api-01',
        resourceId: 'i-065f09252b2ea0471',
        status: 'Running',
        statusTone: 'green',
        region: 'us-west-2',
        cost: '$30.37/month',
        overview: [
            { label: 'Instance type', value: 't3.medium' },
            { label: 'AMI', value: 'al2023-kite-api' },
        ],
        connections: ['Application Load Balancer', 'RDS PostgreSQL', 'Amazon S3', 'Secrets Manager'],
        tags: { Team: 'Platform', Environment: 'Production' },
        metrics: [
            { label: 'CPU average', value: '18%' },
            { label: 'Network out', value: '4.2 GB/day' },
        ],
    },
    'ec2-b': {
        service: 'Amazon EC2',
        name: 'kite-api-02',
        resourceId: 'i-0b81d4f2ac09e2318',
        status: 'Running',
        statusTone: 'green',
        region: 'us-west-2',
        cost: '$30.37/month',
        overview: [
            { label: 'Instance type', value: 't3.medium' },
            { label: 'AMI', value: 'al2023-kite-api' },
        ],
        connections: ['Application Load Balancer', 'RDS PostgreSQL', 'Amazon S3', 'Secrets Manager'],
        tags: { Team: 'Platform', Environment: 'Production' },
        metrics: [
            { label: 'CPU average', value: '4%' },
            { label: 'Network out', value: '0.8 GB/day' },
        ],
        finding: {
            tone: 'amber',
            kind: 'Cost finding',
            title: 'Possible resize',
            text: 'Average CPU utilization is 4% over the last 7 days. This instance may be oversized. Estimated savings: $12/month.',
        },
    },
    rds: {
        service: 'Amazon RDS PostgreSQL',
        name: 'cloudpilot-production',
        resourceId: 'db-KITE7GXA2PROD',
        status: 'Available',
        statusTone: 'green',
        region: 'us-west-2',
        cost: '$58.40/month',
        overview: [
            { label: 'Instance class', value: 'db.t3.medium' },
            { label: 'Engine', value: 'PostgreSQL 15.4' },
            { label: 'Multi-AZ', value: 'Yes' },
        ],
        connections: ['EC2 kite-api-01', 'EC2 kite-api-02', 'CloudWatch'],
        tags: { Team: 'Platform', Environment: 'Production' },
        metrics: [
            { label: 'Connections', value: '12' },
            { label: 'Free storage', value: '61 GB' },
        ],
    },
    s3: {
        service: 'Amazon S3',
        name: 'kite-assets-prod',
        resourceId: 'arn:aws:s3:::kite-assets-prod',
        status: 'Review',
        statusTone: 'amber',
        region: 'us-west-2',
        cost: '$4.10/month',
        overview: [
            { label: 'Storage class', value: 'Standard' },
            { label: 'Objects', value: '48,211' },
            { label: 'Versioning', value: 'Enabled' },
        ],
        connections: ['EC2 kite-api-01', 'EC2 kite-api-02'],
        tags: { Team: 'Platform', Environment: 'Production' },
        metrics: [{ label: 'Stored', value: '218 GB' }],
        finding: {
            tone: 'red',
            kind: 'Security finding',
            title: 'Review public access',
            text: "The bucket's public-access-block configuration is incomplete. Review the configuration before storing sensitive data.",
        },
    },
    cloudwatch: {
        service: 'Amazon CloudWatch',
        name: 'cloudpilot-monitoring',
        resourceId: 'cloudpilot-monitoring',
        status: 'Collecting',
        statusTone: 'green',
        region: 'us-west-2',
        cost: '$6.30/month',
        overview: [
            { label: 'Alarms', value: '14 (0 in alarm)' },
            { label: 'Dashboards', value: '3' },
        ],
        connections: ['Application Load Balancer', 'EC2 Auto Scaling Group', 'RDS PostgreSQL'],
        tags: { Team: 'Platform', Environment: 'Production' },
        metrics: [{ label: 'Log ingestion', value: '2.1 GB/day' }],
    },
    secrets: {
        service: 'AWS Secrets Manager',
        name: 'cloudpilot/prod',
        resourceId: 'arn:...:secret:cloudpilot/prod',
        status: 'Active',
        statusTone: 'green',
        region: 'us-west-2',
        cost: '$0.80/month',
        overview: [
            { label: 'Secrets', value: '4' },
            { label: 'Rotation', value: 'Enabled (30 days)' },
        ],
        connections: ['EC2 kite-api-01', 'EC2 kite-api-02'],
        tags: { Team: 'Platform', Environment: 'Production' },
        metrics: [{ label: 'API calls', value: '310/day' }],
    },
};

//DATA D: Sidebar content
export const resourceFilters = [
    { id: 'all', label: 'All Resources', count: 11 },
    { id: 'networking', label: 'Networking', count: 4 },
    { id: 'compute', label: 'Compute', count: 3 },
    { id: 'databases', label: 'Databases', count: 1 },
    { id: 'storage', label: 'Storage', count: 1 },
    { id: 'monitoring', label: 'Monitoring', count: 1 },
    { id: 'security', label: 'Security', count: 1 },
];

export const viewOptions = ['Architecture', 'Cost Flow', 'Network Flow', 'Security'];
