import React from 'react';
import ScanResultCard from './scan/ScanResultCard';
import FixOptionsCard, { splitFixOptionsMessage } from './FixOptionsCard';

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

  return (
    <div className={`msg ai${isLoading ? ' loading' : ''}`}>
      <div className="bot-avatar" aria-hidden="true">
        C
      </div>
      <div className="answer">
        {content.text}
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
