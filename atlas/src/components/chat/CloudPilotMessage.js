import React from 'react';
import ScanResultCard from './scan/ScanResultCard';

function CloudPilotMessage({ message, isLoading = false, scanResult = null }) {
  return (
    <div className={`msg ai${isLoading ? ' loading' : ''}`}>
      <div className="bot-avatar" aria-hidden="true">
        C
      </div>
      <div className="answer">
        {message.content}
        {scanResult ? <ScanResultCard scanResult={scanResult} /> : null}
      </div>
    </div>
  );
}

export default CloudPilotMessage;
