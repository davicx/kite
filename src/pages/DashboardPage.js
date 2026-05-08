import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DashboardPage() {
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
              <Link to="/login" className="text-decoration-none text-dark">Login</Link>
              <Link to="/groups" className="text-decoration-none text-dark">Groups</Link>
              <Link to="/profile" className="text-decoration-none text-dark">Profile</Link>
              <Link to="/posts" className="text-decoration-none text-dark">Posts</Link>
              <Link to="/users" className="text-decoration-none text-dark">Users</Link>
              <Link to="/playground" className="text-decoration-none text-dark">Playground</Link>
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
        style={{ maxWidth: 800, flex: 1, minHeight: 0, minWidth: 0, width: '100%' }}
      >
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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>John</td>
                  <td>Doe</td>
                  <td>@social</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
