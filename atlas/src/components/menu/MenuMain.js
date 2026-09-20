import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const onChat = location.pathname === '/chat';
  const onConnections = location.pathname === '/connections';

  return (
    <section className="menu-section">
      <h2 className="menu-section-title">Cloud Pilot</h2>
      <nav className="menu-items" aria-label="Cloud Pilot">
        <Link
          to="/chat"
          className={onChat ? 'menu-item menu-item-active' : 'menu-item'}
        >
          <MenuIcon name="home" />
          <span className="menu-item-label">Home</span>
        </Link>
        <TemporaryMenuItem icon="dashboard" label="Dashboard" />
        <Link
          to="/chat"
          className={onChat ? 'menu-item menu-item-active' : 'menu-item'}
        >
          <MenuIcon name="newChat" />
          <span className="menu-item-label">New Chat</span>
        </Link>
        <TemporaryMenuItem icon="todo" label="To Do" />
        <TemporaryMenuItem icon="team" label="Team" />
        <Link
          to="/connections"
          className={
            onConnections ? 'menu-item menu-item-active' : 'menu-item'
          }
        >
          <MenuIcon name="connections" />
          <span className="menu-item-label">Connections</span>
        </Link>
      </nav>
    </section>
  );
}

export default MenuMain;
