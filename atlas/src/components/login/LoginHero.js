import React from 'react';

function LoginHero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="eyebrow">
          <span className="eyebrow-dot"></span>
          Meet your AI cloud teammate
        </div>

        <h1>
          Your cloud shouldn't require
          <span>a team of experts.</span>
        </h1>

        <p className="hero-description">
          CloudPilot understands your cloud, watches for problems,
          finds ways to save money, and helps you make changes —
          simply by talking to it.
        </p>

        <div className="hero-actions">
          <a href="#login" className="button button-primary">
            Try CloudPilot →
          </a>

          <a href="#how" className="button button-secondary">
            See how it works
          </a>
        </div>

        <div className="hero-note">
          Connect your cloud. Ask questions. Get useful answers.
        </div>
      </div>
    </section>
  );
}

export default LoginHero;
