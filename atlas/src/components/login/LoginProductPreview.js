import React from 'react';

function LoginProductPreview() {
  return (
    <section className="product-preview" id="product">
      <div className="container">
        <div className="app-window">
          <div className="app-window-bar">
            <span className="app-window-dot"></span>
            <span className="app-window-dot"></span>
            <span className="app-window-dot"></span>
          </div>

          <div className="app-layout">
            <aside className="app-sidebar">
              <div className="app-sidebar-brand">
                CloudPilot
              </div>

              <nav className="app-sidebar-menu">
                <a href="#product" className="app-sidebar-item active">Chat</a>
                <a href="#product" className="app-sidebar-item">Cloud</a>
                <a href="#product" className="app-sidebar-item">Findings</a>
                <a href="#product" className="app-sidebar-item">History</a>
              </nav>
            </aside>

            <main className="app-main">
              <div className="chat-body">
                <div className="message message-user">
                  Why did our AWS bill jump this month?
                </div>

                <div className="message assistant-row">
                  <div className="assistant-icon">C</div>
                  <div className="assistant-content">
                    Most of the increase is coming from
                    <strong> analytics-prod</strong>. Two EC2 instances were
                    added 18 days ago and are contributing roughly
                    <strong> $340/month</strong>.
                  </div>
                </div>

                <div className="message message-user">
                  Do we still need both?
                </div>

                <div className="message assistant-row">
                  <div className="assistant-icon">C</div>
                  <div className="assistant-content">
                    The secondary instance looks intentional, so I wouldn't
                    remove it. The primary instance is running continuously
                    but has very low utilization.
                    <strong> I can investigate that one instead.</strong>
                  </div>
                </div>

                <div className="finding">
                  <div className="finding-label">Finding</div>
                  <div className="finding-row">
                    <div className="finding-copy">
                      <div className="finding-title">
                        EC2 instance appears underutilized
                      </div>
                      <div className="finding-meta">
                        analytics-primary · us-west-2 · estimated $168/month
                      </div>
                    </div>
                    <div className="finding-saving">
                      Save ~$42/mo
                    </div>
                  </div>
                </div>

                <div className="chat-actions">
                  <button type="button" className="mini-button primary">
                    Investigate primary
                  </button>
                  <button type="button" className="mini-button">
                    Show me the account
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginProductPreview;
