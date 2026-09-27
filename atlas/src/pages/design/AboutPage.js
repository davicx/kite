import React from 'react';

/**
 * Center content for /about.
 * Header, left menu, and chat stay on the About route.
 */
function AboutContent({ eyebrow, name, meta, backLabel, onBack, onAsk }) {
  return (
    <div className="about-center">
      <style>{`
        .about-center {
          box-sizing: border-box;
        }
        .about-center *,
        .about-center *::before,
        .about-center *::after {
          box-sizing: border-box;
        }
        .about-center .about-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 32px;
          margin-bottom: 36px;
        }
        .about-center .about-eyebrow {
          margin-bottom: 9px;
          color: #23775b;
          font-size: 12px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .about-center h1 {
          margin: 0;
          color: #17201d;
          font-size: 31px;
          font-weight: 720;
          letter-spacing: -0.035em;
        }
        .about-center .about-meta {
          margin: 9px 0 0;
          color: #5f6b67;
          font-size: 14px;
        }
        .about-center .about-actions {
          display: flex;
          gap: 10px;
        }
        .about-center .about-button {
          height: 42px;
          padding: 0 17px;
          border: 1px solid #d5dfda;
          border-radius: 9px;
          background: #fff;
          color: #23775b;
          font-size: 13px;
          font-weight: 650;
          cursor: pointer;
        }
        .about-center .about-button.primary {
          border-color: #2f9874;
          background: #2f9874;
          color: #fff;
        }
        .about-center .about-intro {
          margin-bottom: 18px;
        }
        .about-center .about-intro h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 680;
          letter-spacing: -0.015em;
        }
        .about-center .about-intro p {
          margin: 6px 0 0;
          color: #8a9691;
          font-size: 13px;
          line-height: 1.5;
        }
        .about-center .about-card {
          display: flex;
          gap: 16px;
          padding: 22px 24px;
          background: #fff;
          border: 1px solid #e4e9e6;
          border-radius: 14px;
        }
        .about-center .about-icon {
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: #eef8f4;
          color: #23775b;
          font-size: 16px;
        }
        .about-center .about-label {
          margin-bottom: 7px;
          color: #23775b;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        .about-center .about-title {
          margin: 0 0 7px;
          font-size: 16px;
          font-weight: 680;
        }
        .about-center .about-text {
          max-width: 760px;
          margin: 0;
          color: #5f6b67;
          font-size: 14px;
          line-height: 1.65;
        }
        .about-center .about-source {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          color: #8a9691;
          font-size: 11px;
        }
        .about-center .about-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2f9874;
        }
        .about-center .about-related,
        .about-center .about-recent {
          margin-top: 32px;
        }
        .about-center .about-section-label {
          margin-bottom: 12px;
          color: #8a9691;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        .about-center .about-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .about-center .about-info {
          min-height: 112px;
          padding: 18px 20px;
          background: #fff;
          border: 1px solid #e4e9e6;
          border-radius: 12px;
        }
        .about-center .about-info-label {
          margin-bottom: 9px;
          color: #8a9691;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        .about-center .about-info.important .about-info-label {
          color: #a76a18;
        }
        .about-center .about-info-value {
          color: #17201d;
          font-size: 14px;
          font-weight: 630;
          line-height: 1.5;
        }
        .about-center .about-info-description {
          margin-top: 4px;
          color: #5f6b67;
          font-size: 12px;
          line-height: 1.5;
        }
        .about-center .about-recent-card {
          background: #fff;
          border: 1px solid #e4e9e6;
          border-radius: 12px;
          overflow: hidden;
        }
        .about-center .about-recent-row {
          display: grid;
          grid-template-columns: 85px 1fr;
          gap: 18px;
          padding: 15px 20px;
          border-bottom: 1px solid #e4e9e6;
        }
        .about-center .about-recent-row:last-child {
          border-bottom: 0;
        }
        .about-center .about-recent-date {
          color: #8a9691;
          font-size: 12px;
        }
        .about-center .about-recent-text {
          color: #5f6b67;
          font-size: 13px;
        }
        @media (max-width: 700px) {
          .about-center .about-header {
            align-items: flex-start;
            flex-direction: column;
          }
          .about-center .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header className="about-header">
        <div>
          <div className="about-eyebrow">{eyebrow}</div>
          <h1>{name}</h1>
          <p className="about-meta">{meta}</p>
        </div>
        <div className="about-actions">
          {backLabel ? (
            <button type="button" className="about-button" onClick={onBack}>
              {backLabel}
            </button>
          ) : null}
          <button type="button" className="about-button primary" onClick={onAsk}>
            Ask CloudPilot
          </button>
        </div>
      </header>

      <div className="about-intro">
        <h2>About this resource</h2>
        <p>Organizational context CloudPilot has found for this resource.</p>
      </div>

      <section className="about-card">
        <div className="about-icon">✦</div>
        <div>
          <div className="about-label">Demo environment</div>
          <h3 className="about-title">
            This instance was created for the CloudPilot demo.
          </h3>
          <p className="about-text">
            It is used to demonstrate EC2 scanning and remediation.
            This resource is intended for development and demos and
            should not be used for production workloads.
          </p>
          <div className="about-source">
            <span className="about-dot" />
            <span>Project knowledge</span>
            <span>·</span>
            <span>Updated Sep 24</span>
          </div>
        </div>
      </section>

      <section className="about-related">
        <div className="about-section-label">Related information</div>
        <div className="about-grid">
          <div className="about-info">
            <div className="about-info-label">Purpose</div>
            <div className="about-info-value">CloudPilot demo environment</div>
            <div className="about-info-description">
              Used for testing scans, findings, and remediation.
            </div>
          </div>
          <div className="about-info">
            <div className="about-info-label">Ownership</div>
            <div className="about-info-value">CloudPilot project</div>
            <div className="about-info-description">
              Development infrastructure.
            </div>
          </div>
          <div className="about-info important">
            <div className="about-info-label">Important</div>
            <div className="about-info-value">
              Do not use for production workloads.
            </div>
            <div className="about-info-description">
              This resource may be stopped, resized, or modified during demos.
            </div>
          </div>
          <div className="about-info">
            <div className="about-info-label">Related resource</div>
            <div className="about-info-value">kite-demo</div>
            <div className="about-info-description">EC2 instance · us-west-2</div>
          </div>
        </div>
      </section>

      <section className="about-recent">
        <div className="about-section-label">Recent context</div>
        <div className="about-recent-card">
          <div className="about-recent-row">
            <div className="about-recent-date">Sep 24</div>
            <div className="about-recent-text">
              Instance used during the CloudPilot EC2 remediation demo.
            </div>
          </div>
          <div className="about-recent-row">
            <div className="about-recent-date">Sep 20</div>
            <div className="about-recent-text">
              Added to the CloudPilot demo environment.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutContent;
