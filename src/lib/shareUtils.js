/**
 * Social sharing utility for SaferCode posts.
 * Uses Web Share API on mobile, falls back to intent URLs on desktop.
 * Instagram: copies link to clipboard (no direct share API exists).
 *
 * KEY FIX: We resolve the URL at call-time (not at module load) and ensure
 * navigator.share is both defined AND callable before attempting it.
 */

export async function sharePost(url, title) {
  // Defensive: ensure URL is a valid string
  const safeUrl = url && url.length > 0 ? url : window.location.href;

  // Only use Web Share API when it's truly supported (mobile + desktop Chrome)
  // We guard against browsers where share exists but throws immediately
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text: title, url: safeUrl });
      return { method: 'native' };
    } catch (e) {
      if (e.name === 'AbortError') return { method: 'cancelled' };
      // Non-abort errors (e.g. NotAllowedError on desktop) → fall through to intents
    }
  }

  // Desktop / fallback: return intent URLs for the UI to render
  return { method: 'intents', intents: buildIntents(safeUrl, title) };
}

export function buildIntents(url, title) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    telegram: `https://t.me/share/url?url=${encoded}&text=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
  };
}

export async function copyToClipboard(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through
    }
  }
  // Legacy fallback
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

