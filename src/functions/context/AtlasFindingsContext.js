import { createContext } from "react";

// Holds Atlas/Navigator data from the last /message POST (Chat writes, Dashboard reads)
export const AtlasFindingsContext = createContext(null);

export const DEFAULT_CHAT_CONTEXT = {
  conversationID: null,
  groupID: 70,
  username: 'anonymous',
};
