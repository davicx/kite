import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import apiFunctions from '../apiFunctions';
import { fetchLatestScan, fetchScanByID } from '../api/scanAPI';
import { restoreScanResult } from '../scan/restoreScanResult';
import { ChatConversationContext } from './ChatConversationContext';
import { AtlasFindingsContext } from './AtlasFindingsContext';

const api = apiFunctions.getAPI();
const SCAN_KEY = 'atlasLatestScan';

function readStoredScan(conversationID) {
  if (conversationID == null || Number(conversationID) <= 0) {
    return null;
  }

  try {
    const stored = JSON.parse(sessionStorage.getItem(SCAN_KEY) || 'null');
    if (!stored || Number(stored.conversationID) !== Number(conversationID)) {
      return null;
    }
    return stored;
  } catch (error) {
    return null;
  }
}

function writeStoredScan(scan) {
  try {
    if (!scan || scan.conversationID == null) {
      return;
    }
    sessionStorage.setItem(SCAN_KEY, JSON.stringify(scan));
  } catch (error) {
    // Session storage can be unavailable or over quota.
  }
}

function AtlasFindingsProvider({ children }) {
  const { conversationID } = useContext(ChatConversationContext);
  const [scan, setScanState] = useState(null);
  const [scanToken, setScanToken] = useState(0);
  const [listToken, setListToken] = useState(0);
  const [isRestoringScan, setIsRestoringScan] = useState(false);
  const [restoreError, setRestoreError] = useState('');

  const setScan = useCallback((nextScan) => {
    setScanState(nextScan);
    setScanToken((current) => current + 1);
    writeStoredScan(nextScan);
  }, []);

  const openResourceList = useCallback(() => {
    setListToken((current) => current + 1);
  }, []);

  const loadScanByID = useCallback(async (scanID) => {
    setIsRestoringScan(true);
    setRestoreError('');
    try {
      const response = await fetchScanByID({ api, scanID });
      const restored = restoreScanResult(response?.data);
      if (!restored) {
        throw new Error('This saved scan cannot be displayed.');
      }
      setScan(restored);
      openResourceList();
      return restored;
    } catch (error) {
      setRestoreError(error.message || 'Could not restore this scan.');
      return null;
    } finally {
      setIsRestoringScan(false);
    }
  }, [openResourceList, setScan]);

  useEffect(() => {
    let cancelled = false;
    setRestoreError('');
    const cached = readStoredScan(conversationID);
    setScanState(cached);

    if (conversationID == null || Number(conversationID) <= 0) {
      setIsRestoringScan(false);
      return () => {
        cancelled = true;
      };
    }

    setIsRestoringScan(!cached);
    fetchLatestScan({ api, conversationID })
      .then((response) => {
        if (cancelled) {
          return;
        }
        const restored = restoreScanResult(response?.data);
        if (restored) {
          setScanState(restored);
          writeStoredScan(restored);
          // Leave scanToken unchanged. That token sends the dashboard back to
          // the resource list after a new scan. Restoring the saved scan on
          // load must keep ?path= so a refresh stays on the open resource.
          return;
        }
        if (!cached) {
          setScanState(null);
        }
      })
      .catch((error) => {
        if (!cancelled && !cached) {
          setScanState(null);
          setRestoreError(error.message || 'Could not restore the latest scan.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsRestoringScan(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [conversationID]);

  const value = useMemo(
    () => ({
      scan,
      setScan,
      scanToken,
      listToken,
      openResourceList,
      loadScanByID,
      isRestoringScan,
      restoreError,
    }),
    [
      scan,
      setScan,
      scanToken,
      listToken,
      openResourceList,
      loadScanByID,
      isRestoringScan,
      restoreError,
    ]
  );

  return (
    <AtlasFindingsContext.Provider value={value}>
      {children}
    </AtlasFindingsContext.Provider>
  );
}

export default AtlasFindingsProvider;
