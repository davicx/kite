import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RECENT_ITEMS = [
  {
    id: 1,
    day: 'Today · September 23',
    title: 'Testing dashboard',
    description: 'S3 scan · us-west-2 · 3 buckets · 18 findings',
    kind: 'scan',
    label: 'S3 scan',
    status: 'Completed',
    time: '4:14 PM',
    icon: '↺',
    action: 'View results',
  },
  {
    id: 2,
    day: 'Today · September 23',
    title: 'Create EC2 instance',
    description: 'Requested a new instance in us-west-2',
    kind: 'request',
    label: 'Change request',
    status: 'Awaiting confirmation',
    time: '3:42 PM',
    icon: '+',
    action: 'Continue',
  },
  {
    id: 3,
    day: 'Today · September 23',
    title: 'S3 Buckets',
    description: 'Saved view · 3 buckets across 2 regions',
    kind: 'dashboard',
    label: 'Dashboard',
    status: 'Available',
    time: '2:30 PM',
    icon: '▣',
    action: 'Open dashboard',
  },
  {
    id: 4,
    day: 'Yesterday · September 22',
    title: 'Kite deployment',
    description: 'EC2 scan · us-west-2 · 2 instances · 4 findings',
    kind: 'scan',
    label: 'EC2 scan',
    status: 'Completed',
    time: '5:18 PM',
    icon: '↺',
    action: 'View results',
  },
  {
    id: 5,
    day: 'Yesterday · September 22',
    title: 'Pause EC2 instance',
    description: 'kite-api-prod · us-west-2',
    kind: 'request',
    label: 'Change request',
    status: 'Completed',
    time: '4:03 PM',
    icon: 'Ⅱ',
    action: 'View request',
  },
  {
    id: 6,
    day: 'Yesterday · September 22',
    title: 'S3 security scan',
    description: 'S3 scan · account-wide · 3 buckets · 18 findings',
    kind: 'scan',
    label: 'S3 scan',
    status: 'Completed',
    time: '11:42 AM',
    icon: '↺',
    action: 'View results',
  },
  {
    id: 7,
    day: 'September 20',
    title: 'Resume EC2 instance',
    description: 'kite-api-dev · us-west-2',
    kind: 'request',
    label: 'Change request',
    status: 'Cancelled',
    time: '3:24 PM',
    icon: '▶',
    action: 'View request',
  },
  {
    id: 8,
    day: 'September 20',
    title: 'List EC2 instances',
    description: 'Inventory request · us-west-2 · 2 instances',
    kind: 'request',
    label: 'Information',
    status: 'Completed',
    time: '1:09 PM',
    icon: '≡',
    action: 'View result',
  },
  {
    id: 9,
    day: 'September 19',
    title: 'EC2 health check',
    description: 'EC2 scan · us-west-2 · scan could not finish',
    kind: 'scan',
    label: 'EC2 scan',
    status: 'Failed',
    time: '9:15 AM',
    icon: '↺',
    action: 'View details',
  },
];

const FILTERS = [
  ['all', 'All'],
  ['scan', 'Scans'],
  ['request', 'Requests'],
  ['dashboard', 'Dashboards'],
];

function RecentsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return RECENT_ITEMS.filter((item) => {
      const matchesFilter = filter === 'all' || item.kind === filter;
      const searchable =
        `${item.title} ${item.description} ${item.status} ${item.label}`.toLowerCase();
      return matchesFilter && (!term || searchable.includes(term));
    });
  }, [filter, search]);

  const groups = useMemo(() => {
    return filteredItems.reduce((result, item) => {
      const previous = result[result.length - 1];
      if (!previous || previous.day !== item.day) {
        result.push({ day: item.day, items: [item] });
      } else {
        previous.items.push(item);
      }
      return result;
    }, []);
  }, [filteredItems]);

  function openItem(item) {
    navigate(item.kind === 'request' ? '/chat' : '/dashboard');
  }

  return (
    <main className="recents-page">
      <style>{`
        .recents-page {
          box-sizing: border-box;
          min-height: calc(100vh - 72px);
          padding: 52px clamp(28px, 7vw, 150px) 100px;
          background: #fff;
          color: #202a29;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .recents-page *,
        .recents-page *::before,
        .recents-page *::after { box-sizing: border-box; }
        .recents-page button,
        .recents-page input { font: inherit; }
        .recents-page button { cursor: pointer; }
        .recents-page .rp-content { max-width: 1400px; margin: auto; }
        .recents-page .rp-eyebrow {
          display: inline-block;
          padding: 11px 16px;
          border: 1px solid #d1e7de;
          border-radius: 25px;
          background: #f6fcf9;
          color: #276c57;
          font-size: 12px;
          font-weight: 750;
          letter-spacing: .07em;
        }
        .recents-page .rp-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 20px;
          margin: 15px 0 31px;
        }
        .recents-page h1 {
          margin: 0 0 8px;
          font-size: 36px;
          letter-spacing: -.035em;
        }
        .recents-page .rp-sub { margin: 0; color: #65716f; font-size: 16px; }
        .recents-page .rp-count {
          color: #74817e;
          font-size: 13px;
          white-space: nowrap;
        }
        .recents-page .rp-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 19px;
        }
        .recents-page .rp-search {
          width: min(370px, 100%);
          padding: 12px 15px;
          border: 1px solid #dce7e2;
          border-radius: 10px;
          color: #33413e;
          outline: none;
        }
        .recents-page .rp-search:focus { border-color: #79ae9b; }
        .recents-page .rp-filters { display: flex; gap: 7px; flex-wrap: wrap; }
        .recents-page .rp-filter {
          padding: 10px 14px;
          border: 1px solid transparent;
          border-radius: 9px;
          background: #fff;
          color: #687573;
          font-size: 14px;
          font-weight: 650;
        }
        .recents-page .rp-filter.active {
          border-color: #d7eee5;
          background: #edf8f4;
          color: #206c54;
        }
        .recents-page .rp-day {
          margin: 29px 0 12px;
          color: #788582;
          font-size: 13px;
          font-weight: 750;
          letter-spacing: .05em;
          text-transform: uppercase;
        }
        .recents-page .rp-list {
          overflow: hidden;
          border: 1px solid #dfe8e4;
          border-radius: 15px;
          background: #fff;
        }
        .recents-page .rp-row {
          display: grid;
          grid-template-columns: minmax(300px, 1fr) 160px 170px 135px;
          align-items: center;
          gap: 18px;
          min-height: 92px;
          padding: 0 24px 0 0;
          border-bottom: 1px solid #e7edeb;
          background: #fff;
        }
        .recents-page .rp-row:last-child { border-bottom: 0; }
        .recents-page .rp-row:hover { background: #fbfefd; }
        .recents-page .rp-row-lead {
          align-self: stretch;
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          align-items: center;
          gap: 18px;
          padding: 20px 24px;
          border-right: 1px solid #d9e8e2;
          background: #eef8f4;
        }
        .recents-page .rp-row:hover .rp-row-lead {
          background: #e7f5ef;
        }
        .recents-page .rp-row-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: #edf8f4;
          color: #28775d;
          font-size: 19px;
          font-weight: 800;
        }
        .recents-page .rp-row-icon.request { background: #f1f5f9; color: #52728a; }
        .recents-page .rp-row-icon.info { background: #f5f3ec; color: #8c7950; }
        .recents-page .rp-row-title { margin-bottom: 5px; font-size: 15px; font-weight: 700; }
        .recents-page .rp-row-desc {
          color: #71807b;
          font-size: 13px;
          line-height: 1.4;
        }
        .recents-page .rp-kind { color: #53625e; font-size: 14px; }
        .recents-page .rp-kind small {
          display: block;
          margin-top: 5px;
          color: #8a9691;
        }
        .recents-page .rp-status {
          font-size: 13px;
          font-weight: 650;
          white-space: nowrap;
        }
        .recents-page .rp-status::before {
          content: "";
          width: 8px;
          height: 8px;
          display: inline-block;
          margin-right: 9px;
          border-radius: 50%;
          background: #2d9a70;
        }
        .recents-page .rp-status.waiting::before { background: #d59a37; }
        .recents-page .rp-status.cancelled::before { background: #9aa5a1; }
        .recents-page .rp-status.failed::before { background: #d44e55; }
        .recents-page .rp-time { margin-top: 6px; color: #75827f; font-size: 13px; }
        .recents-page .rp-open {
          padding: 8px;
          border: 0;
          background: none;
          color: #23765b;
          font-size: 14px;
          font-weight: 700;
          text-align: right;
          white-space: nowrap;
        }
        .recents-page .rp-empty {
          padding: 45px;
          color: #687573;
          text-align: center;
        }
        .recents-page .rp-note { margin: 20px 0; color: #8a9691; font-size: 12px; }
        @media (max-width: 1150px) {
          .recents-page .rp-row {
            grid-template-columns: minmax(230px, 1fr) 120px 125px;
            gap: 10px;
          }
          .recents-page .rp-kind { display: none; }
          .recents-page { padding: 40px 30px; }
        }
        @media (max-width: 750px) {
          .recents-page { padding: 32px 16px; }
          .recents-page .rp-heading { align-items: start; flex-direction: column; }
          .recents-page .rp-toolbar { align-items: stretch; flex-direction: column; }
          .recents-page .rp-row {
            grid-template-columns: 1fr auto;
            gap: 12px;
            padding: 0 16px 0 0;
          }
          .recents-page .rp-row-lead {
            grid-template-columns: 42px 1fr;
            gap: 12px;
            padding: 16px;
          }
          .recents-page .rp-status-wrap { grid-column: 1; padding-left: 16px; }
          .recents-page .rp-time { display: none; }
          .recents-page .rp-open { grid-column: 2; grid-row: 1 / span 2; }
          .recents-page .rp-row-desc { font-size: 12px; }
        }
      `}</style>

      <div className="rp-content">
        <span className="rp-eyebrow">YOUR ACTIVITY</span>
        <div className="rp-heading">
          <div>
            <h1>Recents</h1>
            <p className="rp-sub">
              Pick up where you left off. Reopen a scan, request, or dashboard result.
            </p>
          </div>
          <span className="rp-count">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="rp-toolbar">
          <input
            className="rp-search"
            type="search"
            placeholder="Search recents..."
            aria-label="Search recents"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="rp-filters" role="group" aria-label="Filter activity">
            {FILTERS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={filter === value ? 'rp-filter active' : 'rp-filter'}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {groups.length === 0 ? (
          <div className="rp-list rp-empty">No recents match your search.</div>
        ) : (
          groups.map((group) => (
            <section key={group.day}>
              <h2 className="rp-day">{group.day}</h2>
              <div className="rp-list">
                {group.items.map((item) => {
                  const statusClass =
                    item.status === 'Awaiting confirmation'
                      ? 'waiting'
                      : item.status.toLowerCase();
                  const iconClass =
                    item.label === 'Information'
                      ? 'rp-row-icon info'
                      : `rp-row-icon ${item.kind}`;
                  return (
                    <article className="rp-row" key={item.id}>
                      <div className="rp-row-lead">
                        <span className={iconClass} aria-hidden="true">
                          {item.icon}
                        </span>
                        <div>
                          <div className="rp-row-title">{item.title}</div>
                          <div className="rp-row-desc">{item.description}</div>
                        </div>
                      </div>
                      <div className="rp-kind">
                        {item.label}
                        <small>
                          {item.kind === 'scan'
                            ? 'Saved scan result'
                            : item.kind === 'dashboard'
                              ? 'Saved view'
                              : 'Request'}
                        </small>
                      </div>
                      <div className="rp-status-wrap">
                        <div className={`rp-status ${statusClass}`}>{item.status}</div>
                        <div className="rp-time">{item.time}</div>
                      </div>
                      <button
                        className="rp-open"
                        type="button"
                        onClick={() => openItem(item)}
                      >
                        {item.action} →
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          ))
        )}

        <p className="rp-note">
          Design preview · Sample activity and links shown for layout only.
        </p>
      </div>
    </main>
  );
}

export default RecentsPage;
