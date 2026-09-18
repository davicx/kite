import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
Design page — index of app pages + static design mocks
*/

function DesignPage() {
  return (
    <div className="container py-4">

      <h1 className="h3 mb-4">Design</h1>

      <h2 className="h5 mb-2">Pages</h2>
      <ul className="list-group mb-4" style={{ maxWidth: 420 }}>
        <li className="list-group-item">
          <Link to="/openai">Open AI</Link>
        </li>
        <li className="list-group-item">
          <Link to="/todos">To Dos</Link>
        </li>
        <li className="list-group-item">
          <Link to="/system-design">System Design</Link>
        </li>
      </ul>

      <h2 className="h5 mb-2">Chat Landing</h2>
      <ul className="list-group mb-4" style={{ maxWidth: 420 }}>
        <li className="list-group-item">
          <a
            href="/design/cloudPilot/landingPage/chat/sky/chatLandingPageSky.html"
            target="_blank"
            rel="noreferrer"
          >
            Sky
          </a>
        </li>
        <li className="list-group-item">
          <a
            href="/design/cloudPilot/landingPage/chat/skyFull/index.html"
            target="_blank"
            rel="noreferrer"
          >
            Sky Full
          </a>
        </li>
      </ul>

      <h2 className="h5 mb-2">Ideas</h2>
      <ul className="list-group" style={{ maxWidth: 420 }}>
        <li className="list-group-item">
          <a href="/design/cloudPilot/chat/index.html" target="_blank" rel="noreferrer">
            Chat
          </a>
        </li>
        <li className="list-group-item">
          <a href="/design/cloudPilot/dashboard/findings/index.html" target="_blank" rel="noreferrer">
            Findings (S3 Buckets)
          </a>
        </li>
        <li className="list-group-item">
          <a
            href="/design/cloudPilot/dashboard/individualFinding/index.html"
            target="_blank"
            rel="noreferrer"
          >
            Individual Finding
          </a>
        </li>
        <li className="list-group-item">
          <a href="/design/cloudPilot/dashboard/ticket/index.html" target="_blank" rel="noreferrer">
            Ticket / Incident
          </a>
        </li>
      </ul>

    </div>
  );
}

export default DesignPage;
