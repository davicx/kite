import React from 'react';
import './friendlyDashboard.css';

/**
 * Friendly findings table (new).
 * Does not replace NavigatorDataRenderer or the existing admin findings table.
 */
function FriendlyFindingsTable({ groups, onFindingAction, sectionId, title }) {
  if (!Array.isArray(groups) || groups.length === 0) {
    return null;
  }

  return (
    <div className="friendly-section" id={sectionId || 'friendly-findings'}>
      <h2 className="friendly-section__title">{title || 'Findings'}</h2>
      {groups.map((group) => {
        const groupName = group.groupName || group.bucketName;
        return (
          <div key={groupName}>
            <h3 className="friendly-section__group-title">{groupName}</h3>
            <table className="friendly-table">
              <thead>
                <tr>
                  <th scope="col">Finding</th>
                  <th scope="col">Resource</th>
                  <th scope="col">Priority</th>
                  <th scope="col">What this means</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {group.findings.map((finding) => (
                  <tr key={finding.findingID || `${groupName}-${finding.recommendationKey}-${finding.friendlyTitle}`}>
                    <td className="friendly-table__finding">{finding.friendlyTitle}</td>
                    <td>
                      <code className="friendly-table__resource">{finding.resourceName}</code>
                    </td>
                    <td className="friendly-table__priority">{finding.friendlyPriority}</td>
                    <td className="friendly-table__meaning">{finding.friendlyMeaning}</td>
                    <td>
                      <button
                        type="button"
                        className="friendly-action"
                        onClick={() => onFindingAction && onFindingAction(finding)}
                      >
                        {finding.friendlyAction}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default FriendlyFindingsTable;
