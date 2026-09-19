import React from 'react';
import MenuIcon from './MenuIcon';

function TemporaryRecentItem({ label }) {
  return (
    <button type="button" className="menu-item">
      <MenuIcon name="recent" />
      <span className="menu-item-label">{label}</span>
    </button>
  );
}

function MenuRecent() {
  return (
    <section className="menu-section">
      <h2 className="menu-section-title">Recent</h2>
      <nav className="menu-items" aria-label="Recent">
        <TemporaryRecentItem label="Kite deployment" />
        <TemporaryRecentItem label="S3 security scan" />
        <TemporaryRecentItem label="Create EC2 instance" />
      </nav>
    </section>
  );
}

export default MenuRecent;
