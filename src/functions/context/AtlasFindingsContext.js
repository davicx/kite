import { createContext } from "react";

// Holds Atlas/Navigator data from the last /message POST (Chat writes, Dashboard reads)
// selectedFinding = row the user clicked on Dashboard (Chat sends with next question)
// instructionsData = Mode 1 walkthrough payload (type: "instructions")
export const AtlasFindingsContext = createContext(null);

export const DEFAULT_CHAT_CONTEXT = {
  conversationID: null,
  groupID: 70,
  username: 'anonymous',
};
