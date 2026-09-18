import React from 'react';
import { Layers, AlertTriangle } from 'lucide-react';
import { resourceFilters, viewOptions } from '../architectureData';

function ResourceSidebar({ activeFilter, onFilterChange }) {
    return (
        <aside className="sdp-sidebar">
            <div className="sdp-sidebar__section">
                <h2 className="sdp-sidebar__heading">
                    <Layers size={13} strokeWidth={2} />
                    Resources
                </h2>
                <ul className="sdp-sidebar__list">
                    {resourceFilters.map((filter) => (
                        <li key={filter.id}>
                            <button
                                type="button"
                                className={
                                    'sdp-sidebar__item' +
                                    (activeFilter === filter.id ? ' sdp-sidebar__item--active' : '')
                                }
                                onClick={() => onFilterChange(filter.id)}
                            >
                                <span>{filter.label}</span>
                                <span className="sdp-sidebar__count">{filter.count}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sdp-sidebar__section">
                <h2 className="sdp-sidebar__heading">Views</h2>
                <ul className="sdp-sidebar__list">
                    {viewOptions.map((view) => (
                        <li key={view}>
                            <button
                                type="button"
                                className={
                                    'sdp-sidebar__item' +
                                    (view === 'Architecture' ? ' sdp-sidebar__item--active' : '')
                                }
                            >
                                <span>{view}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sdp-sidebar__findings">
                <div className="sdp-sidebar__findings-title">
                    <AlertTriangle size={13} strokeWidth={2} />
                    2 findings need attention
                </div>
                <div className="sdp-sidebar__findings-tags">
                    <span className="sdp-tag sdp-tag--amber">1 cost</span>
                    <span className="sdp-tag sdp-tag--red">1 security</span>
                </div>
            </div>
        </aside>
    );
}

export default ResourceSidebar;
