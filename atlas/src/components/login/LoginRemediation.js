import React from 'react';

function LoginRemediation() {
  return (
    <section className="section remediation" id="remediation">
      <div className="container">
        <div className="eyebrow">
          <span className="eyebrow-dot"></span>
          You stay in control
        </div>

        <h2 className="section-title">
          Find the problem once.<br />
          Fix it your way.
        </h2>

        <p className="section-copy">
          CloudPilot gives your team control over how changes happen. Choose the approach that fits the task, your workflow, and the level of control you want.
        </p>

        <div className="remediation-grid">
          <article className="remediation-card">
            <div className="remediation-top">
              <span className="remediation-number">01</span>
              <span className="remediation-badge">Hands off</span>
            </div>
            <h3>Automatic</h3>
            <p>
              Let CloudPilot safely perform an approved change directly and verify the result.
            </p>
            <div className="remediation-example">
              CloudPilot → change → verify
            </div>
          </article>

          <article className="remediation-card">
            <div className="remediation-top">
              <span className="remediation-number">02</span>
              <span className="remediation-badge">Developer</span>
            </div>
            <h3>CLI</h3>
            <p>
              Prefer to make the change yourself? Get the exact command you need, with an explanation of what it will do.
            </p>
            <div className="remediation-example">
              $ aws ec2 stop-instances ...
            </div>
          </article>

          <article className="remediation-card">
            <div className="remediation-top">
              <span className="remediation-number">03</span>
              <span className="remediation-badge">Team workflow</span>
            </div>
            <h3>Pull Request</h3>
            <p>
              Turn a recommendation into an infrastructure change your team can review, approve, and deploy through its normal workflow.
            </p>
            <div className="remediation-example">
              CloudPilot → Terraform → Pull Request
            </div>
          </article>

          <article className="remediation-card">
            <div className="remediation-top">
              <span className="remediation-number">04</span>
              <span className="remediation-badge">Manual</span>
            </div>
            <h3>Instructions</h3>
            <p>
              Walk through the change step by step in the tools you already use, with CloudPilot guiding you along the way.
            </p>
            <div className="remediation-example">
              1. Open EC2 → 2. Select instance → 3. ...
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default LoginRemediation;
