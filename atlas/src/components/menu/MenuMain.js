import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from './MenuIcon';

function TemporaryMenuItem({ icon, label }) {
  return (
    <button type="button" className="menu-item">
      <MenuIcon name={icon} />
      <span className="menu-item-label">{label}</span>
    </button>
  );
}

function MenuMain() {
  return (
    <section className="menu-section">
      <h2 className="menu-section-title">Cloud Pilot</h2>
      <nav className="menu-items" aria-label="Cloud Pilot">
        <TemporaryMenuItem icon="home" label="Home" />
        <TemporaryMenuItem icon="dashboard" label="Dashboard" />
        <Link to="/chat" className="menu-item menu-item-active">
          <MenuIcon name="newChat" />
          <span className="menu-item-label">New Chat</span>
        </Link>
        <TemporaryMenuItem icon="todo" label="To Do" />
        <TemporaryMenuItem icon="team" label="Team" />
        <TemporaryMenuItem icon="connections" label="Connections" />
      </nav>
    </section>
  );
}

export default MenuMain;
