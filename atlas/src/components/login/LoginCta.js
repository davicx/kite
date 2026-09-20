import React from 'react';
import LoginUser from './LoginUser';

function LoginCta() {
  return (
    <section className="cta" id="login">
      <div className="container">
        <h2>
          Spend less time managing the cloud.
        </h2>

        <p>
          CloudPilot is currently in early testing. If you're interested, I'd love to show you what we're building and let you try it.
        </p>

        <div className="login-cta-form">
          <LoginUser />
        </div>
      </div>
    </section>
  );
}

export default LoginCta;
