import React from 'react';
import './friendlyDashboard.css';

function FriendlyTagsPanel({ title, tags }) {
  const list = Array.isArray(tags) ? tags : [];

  return (
    <div className="friendly-bucket-detail">
      <h3>{title}</h3>
      {list.length === 0 ? (
        <p>No tags</p>
      ) : (
        <table className="friendly-table">
          <thead>
            <tr>
              <th scope="col">Tag Key</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {list.map((tag) => (
              <tr key={tag.key}>
                <td className="friendly-table__finding">{tag.key}</td>
                <td>{tag.value || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FriendlyTagsPanel;
