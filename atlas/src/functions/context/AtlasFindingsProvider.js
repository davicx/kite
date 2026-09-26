import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import apiFunctions from '../apiFunctions';
import { fetchLatestScan, fetchScanByID } from '../api/scanAPI';
import { restoreScanResult } from '../scan/restoreScanResult';
import { ChatConversationContext } from './ChatConversationContext';
import { AtlasFindingsContext } from './AtlasFindingsContext';

const api = apiFunctions.getAPI();

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
    setScanState(null);
    setRestoreError('');

    if (conversationID == null || Number(conversationID) <= 0) {
      setIsRestoringScan(false);
      return () => {
        cancelled = true;
      };
    }

    setIsRestoringScan(true);
    fetchLatestScan({ api, conversationID })
      .then((response) => {
        if (cancelled) {
          return;
        }
        const restored = restoreScanResult(response?.data);
        setScanState(restored);
        if (restored) {
          setScanToken((current) => current + 1);
        }
      })
      .catch((error) => {
        if (!cancelled) {
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
