import React from 'react';
import MenuMain from './MenuMain';
import MenuProjects from './MenuProjects';
import MenuRecent from './MenuRecent';

function Menu() {
  return (
    <aside className="cloudpilot-menu" aria-label="Main menu">
      <MenuMain />
      <div className="menu-divider" role="separator" />
      <MenuProjects />
      <div className="menu-divider" role="separator" />
      <MenuRecent />
    </aside>
  );
}

export default Menu;
