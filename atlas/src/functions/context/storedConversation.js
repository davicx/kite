const CONVERSATION_KEY = 'atlasConversationID';

export function readStoredConversationID() {
  try {
    const id = Number(sessionStorage.getItem(CONVERSATION_KEY));
    return id > 0 ? id : null;
  } catch (error) {
    return null;
  }
}

export function writeStoredConversationID(id) {
  try {
    if (id == null || Number(id) <= 0) {
      sessionStorage.removeItem(CONVERSATION_KEY);
      return;
    }
    sessionStorage.setItem(CONVERSATION_KEY, String(Number(id)));
  } catch (error) {
    // Session storage can be unavailable.
  }
}
