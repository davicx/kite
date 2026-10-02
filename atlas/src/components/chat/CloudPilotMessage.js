import React from 'react';
import ReactMarkdown from 'react-markdown';
import ScanResultCard from './scan/ScanResultCard';
import FixOptionsCard, { splitFixOptionsMessage } from './FixOptionsCard';

// Undo: set this to false to render assistant text as plain pre-wrap again.
const USE_ASSISTANT_MARKDOWN = true;

function keepSingleLineBreaks(text) {
  return String(text || '')
    .split(/(```[\s\S]*?```)/g)
    .map((chunk, index) => {
      if (index % 2 === 1) {
        return chunk;
      }
      return chunk.replace(/([^\n])\n(?!\n)/g, '$1  \n');
    })
    .join('');
}

function CloudPilotMessage({
  message,
  isLoading = false,
  scanResult = null,
  onShowAll,
  showFixOptions = false,
  fixOptionsDisabled = false,
  onSelectFixOption,
}) {
  const content = splitFixOptionsMessage(message.content);
  const useMarkdown = USE_ASSISTANT_MARKDOWN && !isLoading;

  return (
    <div className={`msg ai${isLoading ? ' loading' : ''}`}>
      <div className="bot-avatar" aria-hidden="true">
        C
      </div>
      <div
        className={
          useMarkdown
            ? 'answer chat-message-content chat-message-content--assistant'
            : 'answer answer--plain'
        }
      >
        {useMarkdown ? (
          <ReactMarkdown>{keepSingleLineBreaks(content.text)}</ReactMarkdown>
        ) : (
          content.text
        )}
        {showFixOptions ? (
          <FixOptionsCard
            disabled={fixOptionsDisabled}
            onSelect={onSelectFixOption}
          />
        ) : null}
        {scanResult ? (
          <ScanResultCard scanResult={scanResult} onShowAll={onShowAll} />
        ) : null}
      </div>
    </div>
  );
}

export default CloudPilotMessage;
