import { createContext } from 'react';

/** Shared active conversation for Atlas Menu (Projects) + ChatPage. */
export const ChatConversationContext = createContext({
  conversationID: null,
  setConversationID: () => {},
});
