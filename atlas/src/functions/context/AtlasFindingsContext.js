import { createContext } from 'react';

/** Latest scan payload. Chat and Dashboard chat write it; Dashboard reads it. */
export const AtlasFindingsContext = createContext(null);
