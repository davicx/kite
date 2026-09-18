import React from 'react';

/**
 * Guided walkthrough — one Bootstrap card per step, full width of parent.
 * Expects atlasResponse when type === "instructions". Uses imageUrl as-is.
 */
function ChatInstructionsPanel({ instructions }) {
  const steps = Array.isArray(instructions?.steps) ? instructions.steps : [];

  if (!instructions || instructions.type !== 'instructions' || steps.length === 0) {
    return null;
  }

  return (
    <div className="w-100 mt-2 text-start">
      <div className="d-flex align-items-baseline justify-content-between gap-2 mb-2">
        <div>
          <div className="fw-semibold text-dark">
            {instructions.title || 'Walkthrough'}
          </div>
          <div className="small text-muted">
            {steps.length} step{steps.length === 1 ? '' : 's'}
            {instructions.instructionFor
              ? ` · ${instructions.instructionFor}`
              : ''}
          </div>
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {steps.map((step) => {
          const warnings = Array.isArray(step?.warnings) ? step.warnings : [];
          const stepNumber = step.stepNumber ?? step.instructionId;

          return (
            <div key={step.instructionId || stepNumber} className="card w-100 shadow-sm">
              {step.imageUrl ? (
                <img
                  src={step.imageUrl}
                  className="card-img-top"
                  alt={step.title || `Step ${stepNumber}`}
                  style={{
                    maxHeight: 320,
                    objectFit: 'contain',
                    backgroundColor: '#f8fafc',
                  }}
                />
              ) : null}

              <div className="card-body">
                <div className="d-flex align-items-start justify-content-between gap-2 mb-1">
                  <h5 className="card-title mb-0">
                    <span className="text-muted small me-2">Step {stepNumber}</span>
                    {step.title}
                  </h5>
                  <div className="d-flex align-items-center gap-2 flex-shrink-0">
                    {step.optional ? (
                      <span className="badge text-bg-secondary">Optional</span>
                    ) : null}
                    {step.estimatedTime ? (
                      <span className="small text-muted">{step.estimatedTime}</span>
                    ) : null}
                  </div>
                </div>
                <p className="card-text mb-0">{step.instruction}</p>

                {warnings.length > 0 && (
                  <div className="alert alert-warning py-2 px-3 small mb-0 mt-3">
                    {warnings.map((warning, index) => (
                      <div key={index} className={index > 0 ? 'mt-1' : ''}>
                        {warning?.message || String(warning)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="alert alert-secondary mt-3 mb-0" role="status">
        <div className="fw-semibold mb-1">Next up</div>
        <p className="mb-1 small">
          Would you like Cloud Pilot to make sure you set things up correctly.
          We can give you an estimate of your monthly cost and let you know if
          we find any security issues.
        </p>
        <p className="mb-0 small text-muted">Coming soon.</p>
      </div>
    </div>
  );
}

export default ChatInstructionsPanel;
