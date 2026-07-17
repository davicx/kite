import React, { useCallback, useEffect, useState } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    Panel,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
    Search,
    RefreshCw,
    MoreHorizontal,
    Maximize2,
    LayoutGrid,
    PanelRight,
} from 'lucide-react';

import AwsResourceNode from './components/AwsResourceNode';
import AwsBoundaryNode from './components/AwsBoundaryNode';
import ResourceSidebar from './components/ResourceSidebar';
import ResourceDetailsPanel from './components/ResourceDetailsPanel';
import {
    createInitialNodes,
    createInitialEdges,
    resourceDetails,
} from './architectureData';
import './SystemDesignPage.css';

const nodeTypes = {
    awsResource: AwsResourceNode,
    awsBoundary: AwsBoundaryNode,
};

const FIT_VIEW_OPTIONS = { padding: 0.15, duration: 350 };

//COMPONENT A: Canvas (needs ReactFlowProvider context for fitView)
function ArchitectureCanvas({ activeFilter, onSelectResource }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(createInitialNodes());
    const [edges, , onEdgesChange] = useEdgesState(createInitialEdges());
    const [showLabels, setShowLabels] = useState(true);
    const [groupByVpc, setGroupByVpc] = useState(true);
    const { fitView } = useReactFlow();

    //Dim nodes that do not match the active sidebar filter
    useEffect(() => {
        setNodes((currentNodes) =>
            currentNodes.map((node) => {
                if (node.type !== 'awsResource') {
                    return node;
                }
                const dimmed = activeFilter !== 'all' && node.data.filterCategory !== activeFilter;
                if (node.data.dimmed === dimmed) {
                    return node;
                }
                return { ...node, data: { ...node.data, dimmed } };
            })
        );
    }, [activeFilter, setNodes]);

    //"Group by VPC" hides boundary chrome without moving anything
    useEffect(() => {
        setNodes((currentNodes) =>
            currentNodes.map((node) => {
                if (node.type !== 'awsBoundary') {
                    return node;
                }
                return { ...node, data: { ...node.data, faded: !groupByVpc } };
            })
        );
    }, [groupByVpc, setNodes]);

    const handleNodeClick = useCallback(
        (event, node) => {
            if (resourceDetails[node.id]) {
                onSelectResource(node.id);
            }
        },
        [onSelectResource]
    );

    const handleFitView = useCallback(() => {
        fitView(FIT_VIEW_OPTIONS);
    }, [fitView]);

    //Reset dragged nodes to the original layout, then refit
    const handleAutoLayout = useCallback(() => {
        setNodes(createInitialNodes());
        window.requestAnimationFrame(() => fitView(FIT_VIEW_OPTIONS));
    }, [setNodes, fitView]);

    return (
        <div className={'sdp-canvas' + (showLabels ? '' : ' sdp-canvas--hide-labels')}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={handleNodeClick}
                nodesConnectable={false}
                fitView
                fitViewOptions={FIT_VIEW_OPTIONS}
                minZoom={0.25}
                maxZoom={1.75}
                proOptions={{ hideAttribution: true }}
            >
                <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} color="#d3d9e1" />
                <Controls position="bottom-left" showInteractive={false} />
                <MiniMap
                    position="top-right"
                    pannable
                    zoomable
                    nodeColor={(node) => (node.type === 'awsBoundary' ? '#eef2f7' : '#c7d2fe')}
                    maskColor="rgba(241, 245, 249, 0.7)"
                />

                <Panel position="top-left" className="sdp-canvas-panel">
                    <button type="button" className="sdp-btn sdp-btn--small" onClick={handleFitView}>
                        <Maximize2 size={12} />
                        Fit view
                    </button>
                    <button type="button" className="sdp-btn sdp-btn--small" onClick={handleAutoLayout}>
                        <LayoutGrid size={12} />
                        Auto layout
                    </button>
                    <label className="sdp-toggle">
                        <input
                            type="checkbox"
                            checked={showLabels}
                            onChange={(event) => setShowLabels(event.target.checked)}
                        />
                        Show labels
                    </label>
                    <label className="sdp-toggle">
                        <input
                            type="checkbox"
                            checked={groupByVpc}
                            onChange={(event) => setGroupByVpc(event.target.checked)}
                        />
                        Group by VPC
                    </label>
                </Panel>

                <Panel position="bottom-right" className="sdp-legend">
                    <div className="sdp-legend__item">
                        <span className="sdp-legend__dot sdp-legend__dot--green" /> Healthy
                    </div>
                    <div className="sdp-legend__item">
                        <span className="sdp-legend__dot sdp-legend__dot--amber" /> Review
                    </div>
                    <div className="sdp-legend__item">
                        <span className="sdp-legend__dot sdp-legend__dot--red" /> Critical
                    </div>
                    <div className="sdp-legend__item">
                        <span className="sdp-legend__dash" /> Monitoring
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
}

//COMPONENT B: Page shell (header + sidebar + canvas + details)
function SystemDesignPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedId, setSelectedId] = useState('ec2-a');
    const [detailsOpen, setDetailsOpen] = useState(true);

    const handleSelectResource = useCallback((resourceId) => {
        setSelectedId(resourceId);
        setDetailsOpen(true);
    }, []);

    const selectedResource = selectedId ? resourceDetails[selectedId] : null;

    return (
        <div className="sdp">
            <header className="sdp-header">
                <div className="sdp-header__left">
                    <h1 className="sdp-header__title">AWS Backend Architecture</h1>
                    <span className="sdp-header__chip">Production</span>
                    <span className="sdp-header__chip sdp-header__chip--plain">us-west-2</span>
                    <span className="sdp-header__status">
                        <span className="sdp-legend__dot sdp-legend__dot--green" />
                        Healthy
                    </span>
                    <span className="sdp-header__scanned">Last scanned 2 minutes ago</span>
                </div>
                <div className="sdp-header__right">
                    <button type="button" className="sdp-btn sdp-btn--icon" aria-label="Search">
                        <Search size={15} />
                    </button>
                    <button type="button" className="sdp-btn">
                        <RefreshCw size={13} />
                        Refresh scan
                    </button>
                    <button
                        type="button"
                        className="sdp-btn sdp-btn--icon sdp-details-toggle"
                        aria-label="Toggle details panel"
                        onClick={() => setDetailsOpen((open) => !open)}
                    >
                        <PanelRight size={15} />
                    </button>
                    <button type="button" className="sdp-btn sdp-btn--icon" aria-label="More options">
                        <MoreHorizontal size={15} />
                    </button>
                </div>
            </header>

            <div className="sdp-body">
                <ResourceSidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

                <ReactFlowProvider>
                    <ArchitectureCanvas
                        activeFilter={activeFilter}
                        onSelectResource={handleSelectResource}
                    />
                </ReactFlowProvider>

                <div className={'sdp-details-wrap' + (detailsOpen ? ' sdp-details-wrap--open' : '')}>
                    <ResourceDetailsPanel
                        resource={selectedResource}
                        onClose={() => setDetailsOpen(false)}
                    />
                </div>
            </div>
        </div>
    );
}

export default SystemDesignPage;
