import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AtlasFindingsContext } from '../functions/context/AtlasFindingsContext';
import NavigatorDataRenderer from '../components/navigator/NavigatorDataRenderer';

function DashboardPage() {
  const { findings: findingsFromContext, navigatorData } = useContext(AtlasFindingsContext) || {};
  const findings = findingsFromContext ?? [];
  const hasNavigatorData =
    navigatorData &&
    (
      (Array.isArray(navigatorData.stats) && navigatorData.stats.length > 0) ||
      (Array.isArray(navigatorData.tables) && navigatorData.tables.length > 0) ||
      (Array.isArray(navigatorData.alerts) && navigatorData.alerts.length > 0) ||
      (Array.isArray(navigatorData.cards) && navigatorData.cards.length > 0)
    );

  return (
    <div
      className="d-flex flex-column bg-light"
      style={{
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <header
        className="bg-white border-bottom shadow-sm py-2 flex-shrink-0"
        style={{ position: 'relative', height: 'auto', width: '100%' }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between px-4">
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex align-items-center">
              <span className="text-dark fs-5 fw-bold me-0" style={{ fontFamily: 'monospace' }}>{'{'}</span>
              <div
                className="d-flex align-items-center justify-content-center rounded-2 mx-1"
                style={{ width: 36, height: 36, backgroundColor: '#1a1a1a' }}
              >
                <span className="text-white fw-bold">B</span>
              </div>
              <span className="text-dark fs-5 fw-bold ms-0" style={{ fontFamily: 'monospace' }}>{'}'}</span>
            </div>
            <nav className="d-flex gap-3">
              <Link to="/chat" className="text-decoration-none text-dark">Chat</Link>
              <Link to="/dashboard" className="text-decoration-none text-dark">Dashboard</Link>
            </nav>
          </div>
          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              className="form-control border-0 bg-light rounded-3"
              placeholder="Search..."
              style={{ width: 200 }}
            />
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36, backgroundColor: '#6c5ce7' }}
              >
                <span className="text-white fw-bold small">U</span>
              </div>
              <span className="ms-1 text-muted" style={{ fontSize: 10 }}>▼</span>
            </div>
          </div>
        </div>
      </header>

      <main
        className="d-flex flex-column flex-grow-1 bg-light mx-auto overflow-auto"
        style={{ maxWidth: 1100, flex: 1, minHeight: 0, minWidth: 0, width: '100%' }}>
        <div className="px-4 pt-3 pb-0 flex-shrink-0">
          <h1 className="h5 mb-0">Dashboard</h1>
        </div>

        <div
          className="flex-grow-1 d-flex flex-column p-4"
          style={{ flex: 1, minHeight: 0 }}
        >
          <div
            className="bg-white rounded-3 shadow-sm flex-grow-1 overflow-auto p-4 mb-3"
            style={{ minHeight: 0, flex: 1 }}
          >
            {hasNavigatorData ? (
              <NavigatorDataRenderer navigatorData={navigatorData} />
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Severity</th>
                      <th scope="col">Resource</th>
                      <th scope="col">Issue</th>
                      <th scope="col">Recommendation</th>
                      <th scope="col">Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {findings.map((finding) => (
                      <tr key={finding.findingID}>
                        <td>{finding.severity}</td>
                        <td>{finding.resourceName}</td>
                        <td>{finding.title}</td>
                        <td>{finding.recommendation}</td>
                        <td>{`$${finding.estimatedMonthlySavings}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {findings.length === 0 && (
                  <p className="text-muted small mb-0">Run an EC2 scan from Chat to populate this table.</p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
