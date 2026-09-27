import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from './MenuIcon';

function MenuMain() {
  const location = useLocation();
  const onChat = location.pathname === '/chat';
  const onDashboard = location.pathname === '/dashboard';
  const onConnections = location.pathname === '/connections';
  const onTodo = location.pathname === '/todo';
  const onRecents = location.pathname === '/recents';
  const onTeam = location.pathname === '/team';

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
        <Link
          to="/dashboard"
          className={
            onDashboard ? 'menu-item menu-item-active' : 'menu-item'
          }
        >
          <MenuIcon name="dashboard" />
          <span className="menu-item-label">Dashboard</span>
        </Link>
        <Link
          to="/chat"
          className={onChat ? 'menu-item menu-item-active' : 'menu-item'}
        >
          <MenuIcon name="newChat" />
          <span className="menu-item-label">New Chat</span>
        </Link>
        <Link
          to="/todo"
          className={onTodo ? 'menu-item menu-item-active' : 'menu-item'}
        >
          <MenuIcon name="todo" />
          <span className="menu-item-label">To Do</span>
        </Link>
        <Link
          to="/recents"
          className={onRecents ? 'menu-item menu-item-active' : 'menu-item'}
        >
          <MenuIcon name="recent" />
          <span className="menu-item-label">Recents</span>
        </Link>
        <Link
          to="/team"
          className={onTeam ? 'menu-item menu-item-active' : 'menu-item'}
        >
          <MenuIcon name="team" />
          <span className="menu-item-label">Team</span>
        </Link>
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
