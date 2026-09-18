import React from 'react';
import './friendlyDashboard.css';

function FriendlyScanComplete({ title, headline, detail }) {
  return (
    <div className="friendly-section friendly-empty">
      <h2 className="friendly-section__title">{title}</h2>
      <p className="friendly-summary__headline">{headline}</p>
      {detail ? <p className="friendly-summary__detail">{detail}</p> : null}
    </div>
  );
}

export default FriendlyScanComplete;
