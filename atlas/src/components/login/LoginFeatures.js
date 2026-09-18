import React from 'react';

function LoginFeatures() {
  return (
    <section className="section" id="product-features">
      <div className="container section-center">
        <div className="section-label">
          What CloudPilot does
        </div>

        <h2 className="section-title">
          CloudPilot helps you understand what's actually happening in your cloud.
        </h2>

        <p className="section-description">
          Instead of digging through dashboards, logs, billing pages, and configuration screens, ask CloudPilot what you want to know — and get clear answers about what's happening and what to do next.
        </p>

        <div className="features">
          <article className="feature-card">
            <div className="feature-icon green">
              ◎
            </div>
            <h3>
              Understand what you have
            </h3>
            <p>
              CloudPilot brings together your infrastructure and the context around it, so you can understand what's running, how it fits together, and what's happening across your environment.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon blue">
              ↓
            </div>
            <h3>
              Find waste and problems
            </h3>
            <p>
              Find unnecessary spending, risky configurations, forgotten resources, and the frustrating issues behind crashes, slowdowns, timeouts, and other problems.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon orange">
              ✦
            </div>
            <h3>
              Help you take action
            </h3>
            <p>
              Understand what should change and why, then let CloudPilot guide the fix or safely handle supported changes for you.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default LoginFeatures;
