import React from 'react';

function FromUser({ initials, name, cloudpilot, image }) {
  return (
    <div className="from">
      <div className="from-user">
        <div className={cloudpilot ? 'from-avatar cloudpilot-avatar' : 'from-avatar'}>
          {image ? <img src={image} alt="" /> : initials}
        </div>
        <span>{name}</span>
      </div>
    </div>
  );
}

function ToDoPage() {
  return (
    <div className="todo-page">
      <style>{`
        .todo-page {
          box-sizing: border-box;
          --green: #2f9874;
          --green-dark: #23775b;
          --green-soft: #eef8f4;
          --green-border: #d9ebe3;
          --text: #17201d;
          --text-secondary: #5f6b67;
          --text-muted: #8a9691;
          --border: #e4e9e6;
          --background: #fbfcfb;
          --white: #ffffff;
          --red: #d92d3a;
          --orange: #c47b20;
          min-height: 100%;
          padding: 48px 56px 80px;
          background: var(--background);
          color: var(--text);
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .todo-page *,
        .todo-page *::before,
        .todo-page *::after { box-sizing: border-box; }
        .todo-page button { font: inherit; }
        .todo-page .content { max-width: 1180px; margin: 0 auto; }
        .todo-page .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
          color: var(--text-muted);
          font-size: 13px;
        }
        .todo-page .page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 30px;
        }
        .todo-page .eyebrow {
          margin-bottom: 8px;
          color: var(--green-dark);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .todo-page h1 {
          margin: 0;
          font-size: 30px;
          font-weight: 720;
          letter-spacing: -0.03em;
        }
        .todo-page .page-description {
          margin: 8px 0 0;
          color: var(--text-secondary);
          font-size: 14px;
        }
        .todo-page .add-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          height: 40px;
          padding: 0 15px;
          border: 1px solid var(--green);
          border-radius: 9px;
          background: var(--green);
          color: white;
          font-size: 13px;
          font-weight: 650;
          cursor: pointer;
        }
        .todo-page .summary {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
          padding: 17px 20px;
          background: var(--green-soft);
          border: 1px solid var(--green-border);
          border-radius: 12px;
        }
        .todo-page .summary-icon {
          width: 30px;
          height: 30px;
          flex: 0 0 30px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: var(--green);
          color: white;
          font-size: 14px;
          font-weight: 700;
        }
        .todo-page .summary strong {
          display: block;
          font-size: 14px;
          font-weight: 680;
        }
        .todo-page .summary p {
          margin: 4px 0 0;
          color: var(--text-secondary);
          font-size: 12px;
        }
        .todo-page .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 14px;
        }
        .todo-page .filters {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .todo-page .filter {
          padding: 7px 11px;
          border: 1px solid transparent;
          border-radius: 7px;
          background: transparent;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 620;
          cursor: pointer;
        }
        .todo-page .filter.active {
          border-color: var(--green-border);
          background: var(--white);
          color: var(--green-dark);
        }
        .todo-page .sort { color: var(--text-muted); font-size: 12px; }
        .todo-page .todo-section { margin-bottom: 30px; }
        .todo-page .section-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 10px 2px;
        }
        .todo-page .section-heading h2 {
          margin: 0;
          font-size: 12px;
          font-weight: 720;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .todo-page .section-count {
          min-width: 20px;
          height: 20px;
          display: grid;
          place-items: center;
          padding: 0 6px;
          border-radius: 999px;
          background: #eef1ef;
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 700;
        }
        .todo-page .todo-list {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 13px;
          overflow: hidden;
        }
        .todo-page .todo {
          display: grid;
          grid-template-columns: 34px minmax(280px, 1fr) 130px 160px 110px 34px;
          gap: 14px;
          align-items: center;
          min-height: 82px;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
        }
        .todo-page .todo:last-child { border-bottom: 0; }
        .todo-page .todo:hover { background: #fafcfb; }
        .todo-page .check {
          width: 20px;
          height: 20px;
          display: grid;
          place-items: center;
          border: 1.5px solid #bdc8c3;
          border-radius: 6px;
          background: white;
          color: white;
          cursor: pointer;
        }
        .todo-page .todo-title {
          margin-bottom: 5px;
          color: var(--text);
          font-size: 14px;
          font-weight: 650;
        }
        .todo-page .todo-description {
          max-width: 620px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text-secondary);
          font-size: 12px;
        }
        .todo-page .from-user {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          color: #5f6b67;
          font-size: 12px;
          font-weight: 600;
        }
        .todo-page .from-user span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .todo-page .from-avatar {
          width: 24px;
          height: 24px;
          flex: 0 0 24px;
          display: grid;
          place-items: center;
          overflow: hidden;
          border-radius: 50%;
          background: #eef3f0;
          color: #23775b;
          font-size: 9px;
          font-weight: 700;
        }
        .todo-page .from-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .todo-page .cloudpilot-avatar {
          background: #2f9874;
          color: white;
        }
        .todo-page .resource-type {
          margin-bottom: 4px;
          color: var(--text-muted);
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .todo-page .resource-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--green-dark);
          font-size: 12px;
          font-weight: 620;
        }
        .todo-page .priority {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 650;
        }
        .todo-page .priority-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .todo-page .priority.high .priority-dot { background: var(--red); }
        .todo-page .priority.medium .priority-dot { background: var(--orange); }
        .todo-page .priority.low .priority-dot { background: #87928d; }
        .todo-page .open {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 7px;
          background: transparent;
          color: var(--text-muted);
          font-size: 18px;
          cursor: pointer;
        }
        .todo-page .manual-badge {
          display: inline-flex;
          margin-left: 7px;
          padding: 3px 6px;
          border-radius: 5px;
          background: #f2f4f3;
          color: var(--text-muted);
          font-size: 9px;
          font-weight: 650;
          vertical-align: 2px;
        }
        .todo-page .completed .todo-title {
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .todo-page .completed .todo-description { color: #a0aaa6; }
        .todo-page .completed .check {
          border-color: var(--green);
          background: var(--green);
        }
        .todo-page .completed .check::after {
          content: "✓";
          color: white;
          font-size: 11px;
          font-weight: 700;
        }
        @media (max-width: 900px) {
          .todo-page { padding: 30px 20px 60px; }
          .todo-page .todo { grid-template-columns: 34px 1fr 34px; }
          .todo-page .from,
          .todo-page .resource,
          .todo-page .priority { display: none; }
        }
        @media (max-width: 650px) {
          .todo-page .page-header {
            align-items: flex-start;
            flex-direction: column;
          }
          .todo-page .toolbar {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      <div className="content">
        <nav className="breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>To Do</span>
        </nav>

        <header className="page-header">
          <div>
            <div className="eyebrow">To Do</div>
            <h1>Things to take care of</h1>
            <p className="page-description">
              Findings, follow-ups, and infrastructure work you want to come back to.
            </p>
          </div>
          <button className="add-button" type="button">
            <span>＋</span>
            Add to do
          </button>
        </header>

        <section className="summary">
          <div className="summary-icon">✓</div>
          <div>
            <strong>You have 5 things to look at</strong>
            <p>Two are high priority. I&apos;d start with the public EC2 instance.</p>
          </div>
        </section>

        <div className="toolbar">
          <div className="filters">
            <button className="filter active" type="button">Open</button>
            <button className="filter" type="button">High priority</button>
            <button className="filter" type="button">Findings</button>
            <button className="filter" type="button">Mine</button>
            <button className="filter" type="button">Completed</button>
          </div>
          <div className="sort">Priority ↓</div>
        </div>

        <section className="todo-section">
          <div className="section-heading">
            <h2>Needs attention</h2>
            <div className="section-count">2</div>
          </div>
          <div className="todo-list">
            <div className="todo">
              <button className="check" type="button" aria-label="Mark complete" />
              <div className="todo-main">
                <div className="todo-title">Review public EC2 instance</div>
                <div className="todo-description">
                  This instance has a public IP and may be more exposed than intended.
                </div>
              </div>
              <FromUser initials="DV" name="David" image="/user-images/david.jpg" />
              <div className="resource">
                <div className="resource-type">EC2 Instance</div>
                <div className="resource-name">cloudpilot-demo</div>
              </div>
              <div>
                <span className="priority high">
                  <span className="priority-dot" />
                  High
                </span>
              </div>
              <button className="open" type="button" aria-label="Open">›</button>
            </div>
            <div className="todo">
              <button className="check" type="button" aria-label="Mark complete" />
              <div className="todo-main">
                <div className="todo-title">Enable encryption</div>
                <div className="todo-description">
                  New files in this bucket aren&apos;t encrypted by default.
                </div>
              </div>
              <FromUser initials="C" name="CloudPilot" cloudpilot />
              <div className="resource">
                <div className="resource-type">S3 Bucket</div>
                <div className="resource-name">codepipeline-us-west-2</div>
              </div>
              <div>
                <span className="priority high">
                  <span className="priority-dot" />
                  High
                </span>
              </div>
              <button className="open" type="button" aria-label="Open">›</button>
            </div>
          </div>
        </section>

        <section className="todo-section">
          <div className="section-heading">
            <h2>Coming up</h2>
            <div className="section-count">3</div>
          </div>
          <div className="todo-list">
            <div className="todo">
              <button className="check" type="button" aria-label="Mark complete" />
              <div className="todo-main">
                <div className="todo-title">Review EC2 savings opportunity</div>
                <div className="todo-description">
                  CloudPilot found an instance that may be larger than it needs to be.
                </div>
              </div>
              <FromUser initials="C" name="CloudPilot" cloudpilot />
              <div className="resource">
                <div className="resource-type">EC2 Instance</div>
                <div className="resource-name">cloudpilot-demo</div>
              </div>
              <div>
                <span className="priority medium">
                  <span className="priority-dot" />
                  Medium
                </span>
              </div>
              <button className="open" type="button" aria-label="Open">›</button>
            </div>
            <div className="todo">
              <button className="check" type="button" aria-label="Mark complete" />
              <div className="todo-main">
                <div className="todo-title">Add lifecycle rules to Wishlist images</div>
                <div className="todo-description">
                  Older objects may be staying in standard storage longer than needed.
                </div>
              </div>
              <FromUser initials="C" name="CloudPilot" cloudpilot />
              <div className="resource">
                <div className="resource-type">S3 Bucket</div>
                <div className="resource-name">wishlist-images</div>
              </div>
              <div>
                <span className="priority medium">
                  <span className="priority-dot" />
                  Medium
                </span>
              </div>
              <button className="open" type="button" aria-label="Open">›</button>
            </div>
            <div className="todo">
              <button className="check" type="button" aria-label="Mark complete" />
              <div className="todo-main">
                <div className="todo-title">Check Wishlist deployment</div>
                <div className="todo-description">
                  Make sure the API is healthy after the next deployment.
                </div>
              </div>
              <FromUser initials="SV" name="Sam" image="/user-images/default_2.jpg" />
              <div className="resource">
                <div className="resource-type">Project</div>
                <div className="resource-name">Wishlist</div>
              </div>
              <div>
                <span className="priority low">
                  <span className="priority-dot" />
                  Low
                </span>
              </div>
              <button className="open" type="button" aria-label="Open">›</button>
            </div>
          </div>
        </section>

        <section className="todo-section">
          <div className="section-heading">
            <h2>Recently completed</h2>
            <div className="section-count">1</div>
          </div>
          <div className="todo-list">
            <div className="todo completed">
              <button className="check" type="button" aria-label="Completed" />
              <div className="todo-main">
                <div className="todo-title">Enable S3 versioning</div>
                <div className="todo-description">
                  Versioning was enabled successfully.
                </div>
              </div>
              <FromUser initials="C" name="CloudPilot" cloudpilot />
              <div className="resource">
                <div className="resource-type">S3 Bucket</div>
                <div className="resource-name">cloudpilot-data</div>
              </div>
              <div />
              <button className="open" type="button" aria-label="Open">›</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ToDoPage;
