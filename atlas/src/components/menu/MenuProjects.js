import React from 'react';
import MenuIcon from './MenuIcon';

function TemporaryProjectItem({ label }) {
  return (
    <button type="button" className="menu-item">
      <MenuIcon name="project" />
      <span className="menu-item-label">{label}</span>
    </button>
  );
}

function MenuProjects() {
  return (
    <section className="menu-section">
      <h2 className="menu-section-title">Projects</h2>
      <nav className="menu-items" aria-label="Projects">
        <TemporaryProjectItem label="Kite" />
        <TemporaryProjectItem label="Wishlist" />
      </nav>
    </section>
  );
}

export default MenuProjects;
