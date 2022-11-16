import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginHeader() {  
    return (
      <header className = "header">
          <Link className="link" to="/groups"> Groups </Link>
      </header>
    );
  }

export default LoginHeader;
