/**
 * Social sharing utility for SaferCode posts.
 * Uses Web Share API on mobile, falls back to intent URLs on desktop.
 * Instagram: copies link to clipboard (no direct share API exists).
 */

/**
 * @param {string} url - Full URL of the post
 * @param {string} title - Title of the post
 * @param {function} [onCopy] - Callback when link is copied (for Instagram)
 */
export async function sharePost(url, title, onCopy) {
  const text = `${title}\n${url}`;

  // Mobile: Web Share API
  if (navigator.share) {
    try {
      await navigator.share({ title, text: title, url });
      return { method: 'native' };
    } catch (e) {
      // User cancelled – don't fallback to intents
      if (e.name === 'AbortError') return { method: 'cancelled' };
    }
  }

  // Desktop: return intent URLs for UI to open
  return { method: 'intents', intents: buildIntents(url, title) };
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

export async function copyToClipboard(url) {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}
