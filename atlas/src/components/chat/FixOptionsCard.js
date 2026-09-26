import React, { useState } from 'react';

export const FIX_OPTIONS_MARKER = '[[cloudpilot:fix-options]]';

const FIX_OPTIONS = [
  {
    id: 'automatic',
    title: 'Automatic',
    description: 'CloudPilot makes the change for you.',
    message: 'Automatic',
  },
  {
    id: 'pr',
    title: 'Pull request',
    description: 'Prepare the infrastructure change for review.',
    message: 'Pull request',
  },
  {
    id: 'cli',
    title: 'CLI command',
    description: 'Give me the exact command to run myself.',
    message: 'CLI command',
  },
  {
    id: 'instructions',
    title: 'Instructions',
    description: 'Walk me through the fix step by step.',
    message: 'Instructions',
  },
];

export function splitFixOptionsMessage(content) {
  const text = String(content || '');
  if (!text.includes(FIX_OPTIONS_MARKER)) {
    return { text, showFixOptions: false };
  }

  return {
    text: text.replace(FIX_OPTIONS_MARKER, '').replace(/\n{3,}/g, '\n\n').trim(),
    showFixOptions: true,
  };
}

function FixOptionsCard({ disabled = false, onSelect }) {
  const [selectedId, setSelectedId] = useState('automatic');
  const selectedOption = FIX_OPTIONS.find((option) => option.id === selectedId);

  function selectOption(option) {
    if (disabled) {
      return;
    }

    setSelectedId(option.id);
  }

  function confirmSelection() {
    if (disabled || !selectedOption || typeof onSelect !== 'function') {
      return;
    }

    onSelect(selectedOption.message);
  }

  function closeRequest() {
    if (disabled || typeof onSelect !== 'function') {
      return;
    }

    onSelect('cancel');
  }

  return (
    <div className="fix-card">
      <div className="fix-card-header">
        <p className="fix-card-title">Choose how to fix it</p>
        <p className="fix-card-subtitle">Nothing will change until you confirm.</p>
      </div>
      {FIX_OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={
            option.id === selectedId ? 'fix-option selected' : 'fix-option'
          }
          onClick={() => selectOption(option)}
          disabled={disabled}
          aria-pressed={option.id === selectedId}
        >
          <span className="fix-radio" aria-hidden="true" />
          <span className="fix-option-content">
            <span className="fix-option-title">{option.title}</span>
            <span className="fix-option-description">{option.description}</span>
          </span>
        </button>
      ))}
      <div className="fix-card-actions">
        <button
          type="button"
          className="fix-confirm"
          onClick={confirmSelection}
          disabled={disabled || !selectedOption}
        >
          Confirm
        </button>
        <button
          type="button"
          className="fix-close"
          onClick={closeRequest}
          disabled={disabled}
        >
          Close request
        </button>
      </div>
    </div>
  );
}

export default FixOptionsCard;
