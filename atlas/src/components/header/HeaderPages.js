import React from 'react';
import { NavLink } from 'react-router-dom';

function HeaderPages() {
  return (
    <nav className="header-pages">
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          isActive ? 'header-page-link header-page-link-active' : 'header-page-link'
        }
      >
        Chat
      </NavLink>
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          isActive ? 'header-page-link header-page-link-active' : 'header-page-link'
        }
      >
        Cloud
      </NavLink>
      <NavLink
        to="/findings"
        className={({ isActive }) =>
          isActive ? 'header-page-link header-page-link-active' : 'header-page-link'
        }
      >
        Findings
      </NavLink>
    </nav>
  );
}

export default HeaderPages;
