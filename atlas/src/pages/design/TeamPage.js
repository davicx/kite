import React from 'react';

function TeamPage() {
  return (
    <div className="team-page">
      <style>{`
        .team-page {
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
          min-height: 100%;
          padding: 48px 56px 80px;
          background: var(--background);
          color: var(--text);
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .team-page *,
        .team-page *::before,
        .team-page *::after { box-sizing: border-box; }
        .team-page button,
        .team-page input { font: inherit; }
        .team-page button { cursor: pointer; }
        .team-page .content { max-width: 1180px; margin: 0 auto; }
        .team-page .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
          color: var(--text-muted);
          font-size: 13px;
        }
        .team-page .breadcrumb button {
          padding: 0;
          border: 0;
          background: transparent;
          color: var(--green-dark);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
        }
        .team-page .page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 32px;
        }
        .team-page .eyebrow {
          margin-bottom: 8px;
          color: var(--green-dark);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .team-page h1 {
          margin: 0;
          font-size: 34px;
          font-weight: 720;
          letter-spacing: -0.03em;
        }
        .team-page .page-description {
          margin: 8px 0 0;
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.5;
        }
        .team-page .invite-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          height: 44px;
          padding: 0 15px;
          border: 1px solid var(--green);
          border-radius: 9px;
          background: var(--green);
          color: white;
          font-size: 13px;
          font-weight: 650;
        }
        .team-page .invite-button:hover { background: #288566; }
        .team-page .section {
          margin-bottom: 34px;
          padding: 0;
        }
        .team-page .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 13px;
        }
        .team-page .section-title {
          max-width: none;
          margin: 0;
          font-family: inherit;
          font-size: 19px;
          font-weight: 680;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .team-page .section-description {
          max-width: none;
          margin: 4px 0 0;
          color: var(--text-muted);
          font-size: 14px;
        }
        .team-page .view-all {
          border: 0;
          background: transparent;
          color: var(--green-dark);
          font-size: 12px;
          font-weight: 650;
        }
        .team-page .team-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .team-page .person-card {
          padding: 24px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 15px;
          transition: 0.15s ease;
          cursor: pointer;
        }
        .team-page .person-card:hover {
          border-color: #c9ddd4;
          box-shadow: 0 3px 10px rgba(30, 60, 48, 0.04);
        }
        .team-page .person-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .team-page .avatar {
          width: 46px;
          height: 46px;
          flex: 0 0 46px;
          display: grid;
          place-items: center;
          overflow: hidden;
          border-radius: 50%;
          background: var(--green-soft);
          color: var(--green-dark);
          font-size: 13px;
          font-weight: 750;
        }
        .team-page .avatar img,
        .team-page .table-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .team-page .avatar.you {
          background: var(--green);
          color: white;
        }
        .team-page .person-name {
          font-size: 16px;
          font-weight: 680;
        }
        .team-page .you-label {
          margin-left: 4px;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 500;
        }
        .team-page .person-role {
          margin-top: 4px;
          color: var(--text-muted);
          font-size: 13px;
        }
        .team-page .person-info {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #edf0ee;
        }
        .team-page .person-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 10px;
          font-size: 13px;
        }
        .team-page .person-info-row:last-child { margin-bottom: 0; }
        .team-page .info-label { color: var(--text-muted); }
        .team-page .info-value {
          color: var(--text-secondary);
          font-weight: 600;
        }
        .team-page .online {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .team-page .online-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
        }
        .team-page .people-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
        }
        .team-page .people-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 16px 18px;
          border-bottom: 1px solid var(--border);
        }
        .team-page .search {
          width: 280px;
          height: 42px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 11px;
          border: 1px solid #dce3df;
          border-radius: 8px;
          background: #fbfcfb;
        }
        .team-page .search-icon {
          color: var(--text-muted);
          font-size: 13px;
        }
        .team-page .search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text);
          font-size: 14px;
        }
        .team-page .search input::placeholder { color: #9aa39f; }
        .team-page .people-count {
          color: var(--text-muted);
          font-size: 13px;
        }
        .team-page table {
          width: 100%;
          border-collapse: collapse;
        }
        .team-page th {
          padding: 14px 20px;
          text-align: left;
          background: #fbfcfb;
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .team-page td {
          padding: 18px 20px;
          border-top: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 14px;
        }
        .team-page tbody tr {
          transition: 0.12s ease;
          cursor: pointer;
        }
        .team-page tbody tr:hover { background: #fafcfb; }
        .team-page .table-person {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .team-page .table-avatar {
          width: 38px;
          height: 38px;
          flex: 0 0 38px;
          display: grid;
          place-items: center;
          overflow: hidden;
          border-radius: 50%;
          background: var(--green-soft);
          color: var(--green-dark);
          font-size: 11px;
          font-weight: 750;
        }
        .team-page .table-name {
          color: var(--text);
          font-size: 14px;
          font-weight: 650;
        }
        .team-page .table-title {
          margin-top: 3px;
          color: var(--text-muted);
          font-size: 12px;
        }
        .team-page .slack {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .team-page .slack-icon {
          width: 18px;
          height: 18px;
          display: grid;
          place-items: center;
          border-radius: 5px;
          background: #f2f5f3;
          color: var(--text-secondary);
          font-size: 9px;
          font-weight: 750;
        }
        .team-page .team-pill {
          display: inline-flex;
          padding: 5px 9px;
          border-radius: 6px;
          background: #f2f5f3;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
        }
        .team-page .row-arrow {
          text-align: right;
          color: var(--text-muted);
          font-size: 17px;
        }
        .team-page .department-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .team-page .department {
          display: flex;
          align-items: center;
          gap: 13px;
          min-height: 92px;
          padding: 18px 20px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 15px;
          cursor: pointer;
          transition: 0.15s ease;
        }
        .team-page .department:hover {
          border-color: #c9ddd4;
          background: #fcfdfc;
        }
        .team-page .department-icon {
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: var(--green-soft);
          color: var(--green-dark);
          font-size: 13px;
          font-weight: 700;
        }
        .team-page .department-name {
          color: var(--text);
          font-size: 15px;
          font-weight: 650;
        }
        .team-page .department-meta {
          margin-top: 4px;
          color: var(--text-muted);
          font-size: 12px;
        }
        .team-page .department-arrow {
          margin-left: auto;
          color: var(--text-muted);
          font-size: 17px;
        }
        @media (max-width: 900px) {
          .team-page { padding: 30px 20px 60px; }
          .team-page .team-grid,
          .team-page .department-grid { grid-template-columns: 1fr; }
          .team-page .people-card { overflow-x: auto; }
          .team-page table { min-width: 750px; }
        }
        @media (max-width: 650px) {
          .team-page .page-header {
            align-items: flex-start;
            flex-direction: column;
          }
          .team-page .people-toolbar {
            align-items: flex-start;
            flex-direction: column;
          }
          .team-page .search { width: 100%; }
        }
      `}</style>

      <div className="content">
        <nav className="breadcrumb">
          <button type="button">Home</button>
          <span>/</span>
          <span>Team</span>
        </nav>

        <header className="page-header">
          <div>
            <div className="eyebrow">Team</div>
            <h1>Your team</h1>
            <p className="page-description">
              The people and teams you work with in CloudPilot.
            </p>
          </div>
          <button className="invite-button" type="button">
            ＋ Invite someone
          </button>
        </header>

        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Your Team</h2>
              <p className="section-description">
                The people you work with most closely.
              </p>
            </div>
          </div>
          <div className="team-grid">
            <article className="person-card">
              <div className="person-top">
                <div className="avatar you">
                  <img src="/user-images/david.jpg" alt="" />
                </div>
                <div>
                  <div className="person-name">
                    David
                    <span className="you-label">You</span>
                  </div>
                  <div className="person-role">Software Engineer</div>
                </div>
              </div>
              <div className="person-info">
                <div className="person-info-row">
                  <span className="info-label">Team</span>
                  <span className="info-value">Engineering</span>
                </div>
                <div className="person-info-row">
                  <span className="info-label">Slack</span>
                  <span className="info-value online">
                    <span className="online-dot" />
                    @david
                  </span>
                </div>
              </div>
            </article>

            <article className="person-card">
              <div className="person-top">
                <div className="avatar">
                  <img src="/user-images/default_2.jpg" alt="" />
                </div>
                <div>
                  <div className="person-name">Sam Kim</div>
                  <div className="person-role">Software Engineer</div>
                </div>
              </div>
              <div className="person-info">
                <div className="person-info-row">
                  <span className="info-label">Team</span>
                  <span className="info-value">Engineering</span>
                </div>
                <div className="person-info-row">
                  <span className="info-label">Slack</span>
                  <span className="info-value online">
                    <span className="online-dot" />
                    @sam
                  </span>
                </div>
              </div>
            </article>

            <article className="person-card">
              <div className="person-top">
                <div className="avatar">
                  <img src="/user-images/becca.jpg" alt="" />
                </div>
                <div>
                  <div className="person-name">Maya Rivera</div>
                  <div className="person-role">DevOps Engineer</div>
                </div>
              </div>
              <div className="person-info">
                <div className="person-info-row">
                  <span className="info-label">Team</span>
                  <span className="info-value">Infrastructure</span>
                </div>
                <div className="person-info-row">
                  <span className="info-label">Slack</span>
                  <span className="info-value online">
                    <span className="online-dot" />
                    @maya
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">People</h2>
              <p className="section-description">
                Other people in your organization.
              </p>
            </div>
          </div>
          <div className="people-card">
            <div className="people-toolbar">
              <div className="search">
                <span className="search-icon">⌕</span>
                <input type="text" placeholder="Search people..." />
              </div>
              <div className="people-count">8 people</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Slack</th>
                  <th>Team</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="table-person">
                      <div className="table-avatar">
                        <img src="/user-images/11.jpg" alt="" />
                      </div>
                      <div>
                        <div className="table-name">Alex Chen</div>
                        <div className="table-title">Software Engineer</div>
                      </div>
                    </div>
                  </td>
                  <td>alex@company.com</td>
                  <td>
                    <span className="slack">
                      <span className="slack-icon">#</span>
                      @alex
                    </span>
                  </td>
                  <td>
                    <span className="team-pill">Engineering</span>
                  </td>
                  <td className="row-arrow">›</td>
                </tr>
                <tr>
                  <td>
                    <div className="table-person">
                      <div className="table-avatar">
                        <img src="/user-images/brian.jpg" alt="" />
                      </div>
                      <div>
                        <div className="table-name">Jordan Patel</div>
                        <div className="table-title">Engineering Manager</div>
                      </div>
                    </div>
                  </td>
                  <td>jordan@company.com</td>
                  <td>
                    <span className="slack">
                      <span className="slack-icon">#</span>
                      @jordan
                    </span>
                  </td>
                  <td>
                    <span className="team-pill">Engineering</span>
                  </td>
                  <td className="row-arrow">›</td>
                </tr>
                <tr>
                  <td>
                    <div className="table-person">
                      <div className="table-avatar">
                        <img src="/user-images/galadriel.jpg" alt="" />
                      </div>
                      <div>
                        <div className="table-name">Lauren Torres</div>
                        <div className="table-title">Security Engineer</div>
                      </div>
                    </div>
                  </td>
                  <td>lauren@company.com</td>
                  <td>
                    <span className="slack">
                      <span className="slack-icon">#</span>
                      @lauren
                    </span>
                  </td>
                  <td>
                    <span className="team-pill">Security</span>
                  </td>
                  <td className="row-arrow">›</td>
                </tr>
                <tr>
                  <td>
                    <div className="table-person">
                      <div className="table-avatar">
                        <img src="/user-images/124592282_p0.jpg" alt="" />
                      </div>
                      <div>
                        <div className="table-name">Noah Williams</div>
                        <div className="table-title">Product Manager</div>
                      </div>
                    </div>
                  </td>
                  <td>noah@company.com</td>
                  <td>
                    <span className="slack">
                      <span className="slack-icon">#</span>
                      @noah
                    </span>
                  </td>
                  <td>
                    <span className="team-pill">Product</span>
                  </td>
                  <td className="row-arrow">›</td>
                </tr>
                <tr>
                  <td>
                    <div className="table-person">
                      <div className="table-avatar">
                        <img src="/user-images/merry.jpg" alt="" />
                      </div>
                      <div>
                        <div className="table-name">Emma Brooks</div>
                        <div className="table-title">Site Reliability Engineer</div>
                      </div>
                    </div>
                  </td>
                  <td>emma@company.com</td>
                  <td>
                    <span className="slack">
                      <span className="slack-icon">#</span>
                      @emma
                    </span>
                  </td>
                  <td>
                    <span className="team-pill">Infrastructure</span>
                  </td>
                  <td className="row-arrow">›</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Teams</h2>
              <p className="section-description">
                Groups across your organization.
              </p>
            </div>
          </div>
          <div className="department-grid">
            <article className="department">
              <div className="department-icon">◫</div>
              <div>
                <div className="department-name">Engineering</div>
                <div className="department-meta">5 people</div>
              </div>
              <div className="department-arrow">›</div>
            </article>
            <article className="department">
              <div className="department-icon">◫</div>
              <div>
                <div className="department-name">Infrastructure</div>
                <div className="department-meta">3 people</div>
              </div>
              <div className="department-arrow">›</div>
            </article>
            <article className="department">
              <div className="department-icon">◫</div>
              <div>
                <div className="department-name">Security</div>
                <div className="department-meta">2 people</div>
              </div>
              <div className="department-arrow">›</div>
            </article>
            <article className="department">
              <div className="department-icon">◫</div>
              <div>
                <div className="department-name">Product</div>
                <div className="department-meta">4 people</div>
              </div>
              <div className="department-arrow">›</div>
            </article>
            <article className="department">
              <div className="department-icon">◫</div>
              <div>
                <div className="department-name">Design</div>
                <div className="department-meta">2 people</div>
              </div>
              <div className="department-arrow">›</div>
            </article>
            <article className="department">
              <div className="department-icon">◫</div>
              <div>
                <div className="department-name">Data</div>
                <div className="department-meta">3 people</div>
              </div>
              <div className="department-arrow">›</div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeamPage;
