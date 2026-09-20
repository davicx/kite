import React from 'react';

function LoginHeader() {
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="logo" href="#login">
          <span className="logo-mark">C</span>
          CloudPilot
        </a>

        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#how">How it works</a>
          <a href="#vision">Vision</a>
        </div>

        <div className="nav-actions">
          <a href="#login" className="button button-primary">
            Try CloudPilot
          </a>
        </div>
      </div>
    </header>
  );
}

export default LoginHeader;
