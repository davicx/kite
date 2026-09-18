import React from 'react';

function LoginHowItWorks() {
  return (
    <section className="section how-it-works" id="how">
      <div className="container how-grid">
        <div>
          <div className="section-label">
            How it works
          </div>

          <h2 className="section-title">
            Talk to your infrastructure like you would talk to a teammate.
          </h2>

          <p className="section-description">
            Ask CloudPilot what you need. It investigates the systems and context behind your question, explains what it finds, and helps you decide what happens next.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <div>
              <h3>Ask</h3>
              <p>
                Ask CloudPilot about your infrastructure, costs, a problem you're investigating, or something you want to change.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <div>
              <h3>Investigate</h3>
              <p>
                CloudPilot pulls together infrastructure, logs, configurations, history, and organizational context to figure out what's happening.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <div>
              <h3>Understand</h3>
              <p>
                CloudPilot explains what it found, why it matters, and the relevant systems and context behind it.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <div>
              <h3>Act</h3>
              <p>
                Decide what happens next, and let CloudPilot help you safely carry it out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginHowItWorks;
