/**
 * Returns a stable, anonymous user fingerprint stored in localStorage.
 * Used to track likes/comments without requiring a login system.
 */
export function getFingerprint() {
  const STORAGE_KEY = 'safer_uid';
  let uid = localStorage.getItem(STORAGE_KEY);
  if (!uid) {
    uid = crypto.randomUUID ? crypto.randomUUID() : generateFallbackUUID();
    localStorage.setItem(STORAGE_KEY, uid);
  }
  return uid;
}

function generateFallbackUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
