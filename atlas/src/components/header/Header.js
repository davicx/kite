import React from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderPages from './HeaderPages';
import HeaderSearch from './HeaderSearch';
import HeaderProfile from './HeaderProfile';

function Header() {
  return (
    <header className="cloudpilot-header">
      <HeaderLogo />
      <HeaderPages />
      <div className="header-right">
        <HeaderSearch />
        <HeaderProfile />
      </div>
    </header>
  );
}

export default Header;
