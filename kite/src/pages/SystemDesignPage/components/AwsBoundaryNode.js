import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './AwsBoundaryNode.css';

/**
 * Visual boundary (AWS Account / VPC / Auto Scaling Group).
 * Size comes from the node's style { width, height }.
 */
function AwsBoundaryNode({ data, selected }) {
    const classes = [
        'aws-boundary',
        `aws-boundary--${data.kind}`,
        data.faded ? 'aws-boundary--faded' : '',
        selected ? 'aws-boundary--selected' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes}>
            {/* Handles so monitoring edges can target the ASG boundary */}
            <Handle id="in-top" type="target" position={Position.Top} className="aws-boundary__handle" />
            <Handle id="out-bottom" type="source" position={Position.Bottom} className="aws-boundary__handle" />

            <div className="aws-boundary__label">
                <span className="aws-boundary__title">{data.title}</span>
                {data.subtitle && <span className="aws-boundary__subtitle">{data.subtitle}</span>}
                {data.detail && <span className="aws-boundary__subtitle">{data.detail}</span>}
            </div>
        </div>
    );
}

export default React.memo(AwsBoundaryNode);
