import React from 'react';

function NavigatorDataRenderer({ navigatorData }) {
  if (!navigatorData) {
    return null;
  }

  const stats = Array.isArray(navigatorData.stats) ? navigatorData.stats : [];
  const tables = Array.isArray(navigatorData.tables) ? navigatorData.tables : [];
  const alerts = Array.isArray(navigatorData.alerts) ? navigatorData.alerts : [];
  const cards = Array.isArray(navigatorData.cards) ? navigatorData.cards : [];
  const actions = Array.isArray(navigatorData.actions) ? navigatorData.actions : [];

  return (
    <div className="d-flex flex-column gap-3">
      {stats.length > 0 && <NavigatorStats stats={stats} />}

      {alerts.map((alert, index) => (
        <div key={alert.id || index} className="alert alert-warning mb-0">
          {alert.message || alert.title || String(alert)}
        </div>
      ))}

      {cards.map((card, index) => (
        <div key={card.id || index} className="border rounded-3 p-3">
          {card.title && <h2 className="h6 mb-2">{card.title}</h2>}
          {card.message && <p className="small mb-0">{card.message}</p>}
        </div>
      ))}

      {tables.map((table, index) => (
        <GenericTable key={table.id || table.title || index} table={table} />
      ))}

      {actions.length > 0 && <NavigatorActions actions={actions} />}

      {stats.length === 0 &&
        tables.length === 0 &&
        alerts.length === 0 &&
        cards.length === 0 &&
        actions.length === 0 && (
          <p className="text-muted small mb-0">No Navigator data to display yet.</p>
        )}
    </div>
  );
}

function NavigatorStats({ stats }) {
  return (
    <div className="row g-2">
      {stats.map((stat) => (
        <div key={stat.id || stat.label} className="col-6 col-md-3">
          <div className="border rounded-3 p-3 bg-light h-100">
            <div className="text-muted small">{stat.label || stat.id || 'Stat'}</div>
            <div className="fw-semibold">{formatNavigatorValue(stat.value, stat.type)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GenericTable({ table }) {
  const columns = Array.isArray(table.columns) ? table.columns : [];
  const rows = Array.isArray(table.rows) ? table.rows : [];
  const hasColumns = columns.length > 0;

  return (
    <div className="border rounded-3 overflow-hidden">
      {table.title && (
        <div className="bg-light border-bottom px-3 py-2 fw-semibold">
          {table.title}
        </div>
      )}

      {hasColumns ? (
        <div className="table-responsive">
          <table className="table table-sm mb-0 align-middle">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label || column.key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row.row_id || rowIndex}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {formatNavigatorValue(row[column.key], column.type)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-muted small px-3 py-2">No columns to display.</div>
      )}

      {hasColumns && rows.length === 0 && (
        <div className="text-muted small px-3 py-2">No rows to display.</div>
      )}
    </div>
  );
}

function NavigatorActions({ actions }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {actions.map((action, index) => (
        <button
          key={action.id || action.label || index}
          type="button"
          className="btn btn-outline-secondary btn-sm"
          disabled
        >
          {action.label || action.title || action.id || 'Action'}
        </button>
      ))}
    </div>
  );
}

function formatNavigatorValue(value, type) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  if (type === 'currency') {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return String(value);
    }

    return '$' + numericValue.toFixed(2);
  }

  if (type === 'number') {
    return String(value);
  }

  if (type === 'status') {
    return (
      <span className="badge rounded-pill bg-light text-dark border">
        {String(value)}
      </span>
    );
  }

  return String(value);
}

export default NavigatorDataRenderer;
