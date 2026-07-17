import React, { useState } from 'react';
import { ExternalLink, MessageSquare, MoreHorizontal, MousePointerClick, X } from 'lucide-react';

const TABS = ['Overview', 'Metrics', 'Connections', 'Findings'];

function StatusPill({ status, tone }) {
    return <span className={`sdp-pill sdp-pill--${tone || 'green'}`}>{status}</span>;
}

function ResourceDetailsPanel({ resource, onClose }) {
    const [activeTab, setActiveTab] = useState('Overview');

    if (!resource) {
        return (
            <aside className="sdp-details">
                <div className="sdp-details__empty">
                    <MousePointerClick size={22} strokeWidth={1.6} />
                    <p>Select a resource on the canvas to see its details.</p>
                </div>
            </aside>
        );
    }

    const tags = Object.entries(resource.tags || {});

    return (
        <aside className="sdp-details">
            <button type="button" className="sdp-details__close" onClick={onClose} aria-label="Hide details">
                <X size={15} />
            </button>

            <div className="sdp-details__header">
                <div className="sdp-details__service">{resource.service}</div>
                <div className="sdp-details__name">{resource.name}</div>
                <div className="sdp-details__id">{resource.resourceId}</div>
            </div>

            <div className="sdp-details__actions">
                <button type="button" className="sdp-btn sdp-btn--primary">
                    <ExternalLink size={13} />
                    View resource
                </button>
                <button type="button" className="sdp-btn">
                    <MessageSquare size={13} />
                    Ask CloudPilot
                </button>
                <button type="button" className="sdp-btn sdp-btn--icon" aria-label="More actions">
                    <MoreHorizontal size={15} />
                </button>
            </div>

            <div className="sdp-details__tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        className={'sdp-details__tab' + (activeTab === tab ? ' sdp-details__tab--active' : '')}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                        {tab === 'Findings' && resource.finding && <span className="sdp-details__tab-dot" />}
                    </button>
                ))}
            </div>

            <div className="sdp-details__body">
                {resource.finding && (
                    <div className={`sdp-finding sdp-finding--${resource.finding.tone}`}>
                        <div className="sdp-finding__kind">{resource.finding.kind}</div>
                        <div className="sdp-finding__title">{resource.finding.title}</div>
                        <p className="sdp-finding__text">{resource.finding.text}</p>
                    </div>
                )}

                <dl className="sdp-details__grid">
                    <dt>Status</dt>
                    <dd><StatusPill status={resource.status} tone={resource.statusTone} /></dd>
                    <dt>Region</dt>
                    <dd>{resource.region}</dd>
                    <dt>Estimated cost</dt>
                    <dd>{resource.cost}</dd>
                    {(resource.overview || []).map((row) => (
                        <React.Fragment key={row.label}>
                            <dt>{row.label}</dt>
                            <dd>{row.value}</dd>
                        </React.Fragment>
                    ))}
                </dl>

                {resource.metrics && resource.metrics.length > 0 && (
                    <>
                        <h3 className="sdp-details__subheading">Key metrics</h3>
                        <dl className="sdp-details__grid">
                            {resource.metrics.map((metric) => (
                                <React.Fragment key={metric.label}>
                                    <dt>{metric.label}</dt>
                                    <dd>{metric.value}</dd>
                                </React.Fragment>
                            ))}
                        </dl>
                    </>
                )}

                {resource.connections && resource.connections.length > 0 && (
                    <>
                        <h3 className="sdp-details__subheading">Connected resources</h3>
                        <ul className="sdp-details__connections">
                            {resource.connections.map((connection) => (
                                <li key={connection}>{connection}</li>
                            ))}
                        </ul>
                    </>
                )}

                {tags.length > 0 && (
                    <>
                        <h3 className="sdp-details__subheading">Tags</h3>
                        <div className="sdp-details__tags">
                            {tags.map(([key, value]) => (
                                <span key={key} className="sdp-tag">
                                    {key}: {value}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}

export default ResourceDetailsPanel;
