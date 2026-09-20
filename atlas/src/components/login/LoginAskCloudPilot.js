import React from 'react';

function LoginAskCloudPilot() {
  return (
    <section className="section ask-cloudpilot" id="ask">
      <div className="container section-center">
        <div className="section-label">
          Ask CloudPilot
        </div>

        <h2 className="section-title">
          Start with a question.
        </h2>

        <p className="section-description">
          CloudPilot is designed around the way people actually think about their business — not the way cloud dashboards are organized.
        </p>

        <div className="example-grid">
          <div className="example">
            <div className="example-check">✓</div>
            <div>
              <strong>“Why did our cloud bill go up?”</strong>
              <p>Understand what changed and where the money is going.</p>
            </div>
          </div>

          <div className="example">
            <div className="example-check">✓</div>
            <div>
              <strong>“Are we wasting money anywhere?”</strong>
              <p>Find resources you're paying for but barely using.</p>
            </div>
          </div>

          <div className="example">
            <div className="example-check">✓</div>
            <div>
              <strong>“What is running in our cloud?”</strong>
              <p>Get a clear picture without digging through dozens of screens.</p>
            </div>
          </div>

          <div className="example">
            <div className="example-check">✓</div>
            <div>
              <strong>“Can we safely turn this off?”</strong>
              <p>Understand what something does before making a change.</p>
            </div>
          </div>

          <div className="example">
            <div className="example-check">✓</div>
            <div>
              <strong>“Help me launch my app.”</strong>
              <p>Turn what your application needs into the cloud infrastructure to run it.</p>
            </div>
          </div>

          <div className="example">
            <div className="example-check">✓</div>
            <div>
              <strong>“What should I be paying attention to?”</strong>
              <p>Let CloudPilot surface the things that actually deserve your team's attention.</p>
            </div>
          </div>

          <div className="example">
            <div className="example-check">✓</div>
            <div>
              <strong>“Why did our app go down?”</strong>
              <p>Trace the problem across your infrastructure and logs, understand what likely broke, and get help fixing it.</p>
            </div>
          </div>

          <div className="example">
            <div className="example-check">✓</div>
            <div>
              <strong>“Why is our app suddenly slow?”</strong>
              <p>Investigate infrastructure, logs, and recent changes to find what's causing the slowdown.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginAskCloudPilot;
