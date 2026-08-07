import React, { useEffect, useState } from 'react';
import apiFunctions from '../../functions/apiFunctions';
import { fetchAiUsageSummary } from '../../functions/api/aiUsageAPI';

const api = apiFunctions.getAPI();

function formatUsd(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    return '$0.00';
  }
  if (n > 0 && n < 0.01) {
    return `$${n.toFixed(6)}`;
  }
  return `$${n.toFixed(2)}`;
}

/**
 * Small Dashboard card — GET /ai/usage/summary
 * Today / Month / Requests / Average. No charts.
 */
function AiUsageCard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchAiUsageSummary({ api });
        if (cancelled) {
          return;
        }

        if (!response || response.success === false || !response.data) {
          setError('Could not load AI usage.');
          setSummary(null);
          return;
        }

        setSummary(response.data);
      } catch (err) {
        if (!cancelled) {
          setError('Could not load AI usage.');
          setSummary(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = summary
    ? [
        { label: "Today's Cost", value: formatUsd(summary.today_cost) },
        { label: 'Month', value: formatUsd(summary.month_cost) },
        {
          label: 'Requests',
          value: String(Number(summary.month_requests) || 0),
        },
        {
          label: 'Average',
          value: formatUsd(summary.average_request_cost),
        },
      ]
    : [];

  return (
    <div className="border rounded-3 p-3 bg-light mb-4">
      <div className="d-flex align-items-baseline justify-content-between mb-2">
        <h2 className="h6 mb-0">AI Usage</h2>
        <span className="text-muted small">Estimated OpenAI spend</span>
      </div>

      {loading && <p className="text-muted small mb-0">Loading…</p>}

      {!loading && error && (
        <p className="text-muted small mb-0">{error}</p>
      )}

      {!loading && !error && summary && (
        <div className="row g-2">
          {stats.map((stat) => (
            <div key={stat.label} className="col-6 col-md-3">
              <div className="border rounded-3 p-3 bg-white h-100">
                <div className="text-muted small">{stat.label}</div>
                <div className="fw-semibold">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AiUsageCard;
