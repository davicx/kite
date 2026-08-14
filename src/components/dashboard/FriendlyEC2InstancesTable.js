import React, { useState } from 'react';
import FriendlyTagsPanel from './FriendlyTagsPanel';
import './friendlyDashboard.css';

/**
 * Friendly EC2 instances overview (new).
 * Does not replace the original Navigator EC2 Instances table (including Tags).
 */
function FriendlyEC2InstancesTable({ instances }) {
  const [expanded, setExpanded] = useState(null);

  if (!Array.isArray(instances) || instances.length === 0) {
    return null;
  }

  const selectedInstance =
    expanded && instances.find((instance) => instance.instanceName === expanded.name) || null;

  const toggle = (name, kind) => {
    setExpanded((current) => {
      if (current && current.name === name && current.kind === kind) {
        return null;
      }
      return { name, kind };
    });
  };

  return (
    <div className="friendly-section">
      <h2 className="friendly-section__title">EC2 Instances</h2>
      <table className="friendly-table">
        <thead>
          <tr>
            <th scope="col">Instance</th>
            <th scope="col">Type</th>
            <th scope="col">State</th>
            <th scope="col">Cost</th>
            <th scope="col">Health</th>
            <th scope="col">Findings</th>
            <th scope="col">Tags</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {instances.map((instance) => {
            const tagCount = Array.isArray(instance.tags) ? instance.tags.length : 0;
            const isViewOpen =
              expanded && expanded.name === instance.instanceName && expanded.kind === 'view';

            return (
              <tr key={instance.instanceId || instance.instanceName}>
                <td className="friendly-table__finding">{instance.instanceName}</td>
                <td className="friendly-table__resource">{instance.instanceType || '—'}</td>
                <td>{instance.state || '—'}</td>
                <td>{instance.costLabel}</td>
                <td className="friendly-table__priority">{instance.healthLabel}</td>
                <td>
                  <strong>{instance.findingLabel}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    className="friendly-action"
                    onClick={() => toggle(instance.instanceName, 'tags')}
                  >
                    Tags ({tagCount})
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="friendly-action"
                    onClick={() => toggle(instance.instanceName, 'view')}
                  >
                    {isViewOpen ? 'Hide' : 'View'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedInstance && expanded.kind === 'tags' && (
        <FriendlyTagsPanel
          title={`Tags — ${selectedInstance.instanceName}`}
          tags={selectedInstance.tags}
        />
      )}

      {selectedInstance && expanded.kind === 'view' && (
        <div className="friendly-bucket-detail">
          <h3>{selectedInstance.instanceName}</h3>
          <p>Instance ID: {selectedInstance.instanceId || '—'}</p>
          <p>Region: {selectedInstance.region || '—'}</p>
          <p>Type: {selectedInstance.instanceType || '—'}</p>
          <p>State: {selectedInstance.state || '—'}</p>
          <p>Avg CPU: {selectedInstance.avgCpu}</p>
          <p>Role: {selectedInstance.role}</p>
          <p>Monthly cost: {selectedInstance.costLabel}</p>
        </div>
      )}
    </div>
  );
}

export default FriendlyEC2InstancesTable;
