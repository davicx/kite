import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLogo() {
  return (
    <Link to="/chat" className="header-logo">
      <span className="header-logo-mark">C</span>
      <span className="header-logo-text">CloudPilot</span>
    </Link>
  );
}

export default HeaderLogo;
