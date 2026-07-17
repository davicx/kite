import React from 'react';
import { Handle, Position } from '@xyflow/react';
import {
    Users,
    Globe,
    Cloud,
    Network,
    Server,
    Database,
    HardDrive,
    Activity,
    KeyRound,
} from 'lucide-react';
import './AwsResourceNode.css';

const ICONS = {
    users: Users,
    route53: Globe,
    cloudfront: Cloud,
    alb: Network,
    ec2: Server,
    rds: Database,
    s3: HardDrive,
    cloudwatch: Activity,
    secrets: KeyRound,
};

function AwsResourceNode({ data, selected }) {
    const Icon = ICONS[data.icon] || Server;

    const classes = [
        'aws-node',
        selected ? 'aws-node--selected' : '',
        data.dimmed ? 'aws-node--dimmed' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes}>
            <Handle id="in-left" type="target" position={Position.Left} className="aws-node__handle" />
            <Handle id="in-top" type="target" position={Position.Top} className="aws-node__handle" />
            <Handle id="in-bottom" type="target" position={Position.Bottom} className="aws-node__handle" />
            <Handle id="out-right" type="source" position={Position.Right} className="aws-node__handle" />
            <Handle id="out-bottom" type="source" position={Position.Bottom} className="aws-node__handle" />
            <Handle id="out-top" type="source" position={Position.Top} className="aws-node__handle" />

            {data.badge && (
                <span className={`aws-node__badge aws-node__badge--${data.badge.tone}`}>
                    {data.badge.text}
                </span>
            )}

            <div className="aws-node__top">
                <span className={`aws-node__icon aws-node__icon--${data.filterCategory}`}>
                    <Icon size={15} strokeWidth={1.9} />
                </span>
                <span className="aws-node__titles">
                    <span className="aws-node__service">{data.service}</span>
                    <span className="aws-node__name">{data.name}</span>
                </span>
                <span className={`aws-node__dot aws-node__dot--${data.status}`} />
            </div>

            <div className="aws-node__meta">
                <span className="aws-node__category">{data.category}</span>
                {data.description && <span className="aws-node__desc">{data.description}</span>}
                {data.metric && <span className="aws-node__metric">{data.metric}</span>}
            </div>
        </div>
    );
}

export default React.memo(AwsResourceNode);
