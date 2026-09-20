import React, { useState } from 'react';

const SERVICES = [
  {
    id: 'AWS',
    mark: 'AWS',
    icoClass: 'aws',
    name: 'Amazon Web Services',
    type: 'Cloud infrastructure',
    desc: 'EC2 and S3 are connected. CloudPilot can inspect resources, scan for findings, and help with supported changes.',
    connected: 'Connected · Account 631447262459',
    action: 'Manage',
    actionClass: 'manage',
  },
  {
    id: 'Gmail',
    mark: 'M',
    icoClass: 'gmail',
    name: 'Gmail',
    type: 'Email & organizational knowledge',
    desc: 'Find engineering decisions, incident context, vendor conversations, and useful information in email.',
    action: 'Connect',
    actionClass: 'connect',
  },
  {
    id: 'Jira',
    mark: 'J',
    icoClass: 'jira',
    name: 'Jira',
    type: 'Issues & project work',
    desc: "Bring tickets, bugs, incidents, ownership, and project history into CloudPilot's understanding of your work.",
    action: 'Connect',
    actionClass: 'connect',
  },
  {
    id: 'Slack',
    mark: 'S',
    icoClass: 'slack',
    name: 'Slack',
    type: 'Team communication',
    desc: 'Find relevant discussions, decisions, incident conversations, and context shared across your team.',
    action: 'Connect',
    actionClass: 'connect',
  },
  {
    id: 'Azure',
    mark: 'Az',
    icoClass: 'azure',
    name: 'Microsoft Azure',
    type: 'Cloud infrastructure',
    desc: 'Connect Azure resources so CloudPilot can understand infrastructure across more than one cloud provider.',
    action: 'Connect',
    actionClass: 'connect',
  },
  {
    id: 'Team',
    mark: 'T',
    icoClass: 'team',
    name: 'Team',
    type: 'People & ownership',
    desc: 'Add teammates so CloudPilot understands who works on what and can make collaboration part of the engineering context.',
    action: 'Set up',
    actionClass: 'connect',
  },
];

function ConnectionPage() {
  const [modal, setModal] = useState(null);

  function openModal(service, isManage) {
    setModal({
      title: (isManage ? 'Manage ' : 'Connect ') + service,
      text:
        'This is a design mock. In the real product, CloudPilot would open the secure ' +
        service +
        ' connection and permission flow here.',
    });
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <div className="connection-page">
      <style>{`
        .connection-page {
          box-sizing: border-box;
          padding: 44px 56px 80px;
          background: #fbfcfb;
          color: #17201d;
          min-height: 100%;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .connection-page *,
        .connection-page *::before,
        .connection-page *::after {
          box-sizing: border-box;
        }
        .connection-page button {
          font: inherit;
        }
        .connection-page .content {
          max-width: 1120px;
          margin: auto;
        }
        .connection-page .eyebrow {
          font-size: 11px;
          color: #23775b;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .connection-page h1 {
          font-size: 30px;
          margin: 0;
          letter-spacing: -0.025em;
        }
        .connection-page .intro {
          font-size: 14px;
          color: #5f6b67;
          line-height: 1.55;
          margin: 8px 0 30px;
          max-width: 690px;
        }
        .connection-page .summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 0;
        }
        .connection-page .stat {
          background: #fff;
          border: 1px solid #e4e9e6;
          border-radius: 12px;
          padding: 17px 18px;
        }
        .connection-page .stat label {
          font-size: 11px;
          color: #8a9691;
          font-weight: 700;
          text-transform: uppercase;
        }
        .connection-page .stat b {
          display: block;
          font-size: 19px;
          margin-top: 7px;
        }
        .connection-page .stat small {
          color: #5f6b67;
        }
        .connection-page .connections-services {
          margin-top: 60px;
          margin-bottom: 24px;
        }
        .connection-page .connections-services h2 {
          font-size: 18px;
          margin: 0;
        }
        .connection-page .connections-services p {
          font-size: 12px;
          color: #8a9691;
          margin: 4px 0 0;
        }
        .connection-page .services {
          background: #fff;
          border: 1px solid #e4e9e6;
          border-radius: 14px;
          overflow: hidden;
        }
        .connection-page .service {
          display: grid;
          grid-template-columns: 54px minmax(180px, 1.1fr) minmax(260px, 1.8fr) 145px;
          gap: 16px;
          align-items: center;
          padding: 19px 21px;
          border-top: 1px solid #e4e9e6;
        }
        .connection-page .service:first-child {
          border-top: 0;
        }
        .connection-page .service:hover {
          background: #fcfdfc;
        }
        .connection-page .ico {
          width: 42px;
          height: 42px;
          border: 1px solid #e4e9e6;
          border-radius: 11px;
          display: grid;
          place-items: center;
          font-size: 13px;
          font-weight: 800;
        }
        .connection-page .ico.aws { background: #fff8eb; color: #8a5b00; }
        .connection-page .ico.gmail { background: #fff5f5; color: #b43b3b; }
        .connection-page .ico.jira { background: #f2f7ff; color: #3469a7; }
        .connection-page .ico.slack { background: #fbf5ff; color: #75518a; }
        .connection-page .ico.azure { background: #f1f8ff; color: #3976a8; }
        .connection-page .ico.team { background: #eef8f4; color: #23775b; }
        .connection-page .name {
          font-size: 14px;
          font-weight: 700;
        }
        .connection-page .type {
          font-size: 11px;
          color: #8a9691;
          margin-top: 3px;
        }
        .connection-page .desc {
          font-size: 12.5px;
          color: #5f6b67;
          line-height: 1.45;
        }
        .connection-page .connected {
          display: block;
          margin-top: 6px;
          color: #23775b;
          font-size: 11px;
          font-weight: 700;
        }
        .connection-page .connected::before {
          content: "";
          display: inline-block;
          width: 7px;
          height: 7px;
          background: #2f9874;
          border-radius: 50%;
          margin-right: 6px;
        }
        .connection-page .actions {
          text-align: right;
        }
        .connection-page .connect,
        .connection-page .manage {
          min-width: 92px;
          padding: 8px 13px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .connection-page .connect {
          border: 1px solid #2f9874;
          background: #2f9874;
          color: #fff;
        }
        .connection-page .connect:hover {
          background: #23775b;
        }
        .connection-page .manage {
          border: 1px solid #cfe0d9;
          background: #fff;
          color: #23775b;
        }
        .connection-page .manage:hover {
          background: #eef8f4;
        }
        .connection-page .info {
          margin-top: 24px;
          padding: 18px 20px;
          border: 1px solid #d9ebe3;
          background: #eef8f4;
          border-radius: 12px;
          display: flex;
          gap: 13px;
        }
        .connection-page .info .logo {
          width: 28px;
          height: 28px;
          border-radius: 9px;
          background: #2f9874;
          color: #fff;
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 750;
          flex-shrink: 0;
        }
        .connection-page .info b {
          font-size: 13px;
        }
        .connection-page .info p {
          font-size: 12.5px;
          color: #5f6b67;
          line-height: 1.5;
          margin: 4px 0;
        }
        .connection-page .overlay {
          position: fixed;
          inset: 0;
          background: #17201d38;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }
        .connection-page .modal {
          width: 430px;
          max-width: calc(100vw - 32px);
          background: white;
          border: 1px solid #e4e9e6;
          border-radius: 16px;
          padding: 23px;
          box-shadow: 0 20px 60px #17201d29;
        }
        .connection-page .modal h3 {
          margin: 0 0 8px;
        }
        .connection-page .modal p {
          font-size: 13px;
          color: #5f6b67;
          line-height: 1.5;
        }
        .connection-page .modal-actions {
          text-align: right;
          margin-top: 20px;
        }
        .connection-page .modal-actions button {
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
        }
        .connection-page .cancel {
          border: 1px solid #e4e9e6;
          background: #fff;
        }
        .connection-page .continue {
          border: 1px solid #2f9874;
          background: #2f9874;
          color: #fff;
          font-weight: 700;
          margin-left: 7px;
        }
        @media (max-width: 900px) {
          .connection-page {
            padding: 28px 20px 60px;
          }
          .connection-page .summary {
            grid-template-columns: 1fr;
          }
          .connection-page .service {
            grid-template-columns: 50px 1fr 100px;
          }
          .connection-page .desc {
            grid-column: 2 / 4;
          }
        }
      `}</style>

      <div className="content">
        <div className="eyebrow">Workspace</div>
        <h1>Connected Services</h1>
        <p className="intro">
          Connect the tools your team already uses. CloudPilot can use these
          connections to understand what&apos;s happening across your engineering
          environment and help you get work done.
        </p>

        <div className="summary">
          <div className="stat">
            <label>Connected</label>
            <b>1 service</b>
            <small>AWS is ready to use</small>
          </div>
          <div className="stat">
            <label>Available</label>
            <b>6 services</b>
            <small>More integrations can be added</small>
          </div>
          <div className="stat">
            <label>Workspace</label>
            <b>CloudPilot Demo</b>
            <small>Connections are shared with your team</small>
          </div>
        </div>

        <div className="connections-services">
          <h2>Your services</h2>
          <p>Manage what CloudPilot can work with.</p>
        </div>

        <div className="services">
          {SERVICES.map((service) => (
            <div className="service" key={service.id}>
              <div className={`ico ${service.icoClass}`}>{service.mark}</div>
              <div>
                <div className="name">{service.name}</div>
                <div className="type">{service.type}</div>
              </div>
              <div className="desc">
                {service.desc}
                {service.connected ? (
                  <span className="connected">{service.connected}</span>
                ) : null}
              </div>
              <div className="actions">
                <button
                  type="button"
                  className={service.actionClass}
                  onClick={() =>
                    openModal(service.id, service.actionClass === 'manage')
                  }
                >
                  {service.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="info">
          <div className="logo">C</div>
          <div>
            <b>Connections make CloudPilot more useful.</b>
            <p>
              Each connection gives CloudPilot more context to answer questions
              like “What needs my attention?”, “Why did this break?”, and “Who
              knows about this?” from the systems your team already uses.
            </p>
          </div>
        </div>
      </div>

      {modal ? (
        <div
          className="overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="modal" role="dialog" aria-modal="true">
            <h3>{modal.title}</h3>
            <p>{modal.text}</p>
            <div className="modal-actions">
              <button type="button" className="cancel" onClick={closeModal}>
                Cancel
              </button>
              <button type="button" className="continue" onClick={closeModal}>
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ConnectionPage;
