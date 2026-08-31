// ============================================================================
// MoKa Cafe — Shared Utilities Module
// Robust HTML Escaping, Hashing, and Sanitization
// ============================================================================

/**
 * Sanitize & escape HTML strings defensively (XSS Protection).
 * Handles &, <, >, ", and '.
 * @param {any} str - Input string to escape
 * @returns {string} Escaped safe HTML string
 */
export function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Compute cryptographic SHA-256 hash of a string using Web Crypto API.
 * @param {string} message - Text to hash
 * @returns {Promise<string>} Hexadecimal hash string
 */
export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(String(message));
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Sanitize a URL to prevent javascript: and data: URI injection in dynamic links.
 * @param {string} url - URL string to validate
 * @param {string} defaultUrl - Safe fallback URL
 * @returns {string} Sanitized URL
 */
export function sanitizeUrl(url, defaultUrl = "#") {
  if (!url || typeof url !== "string") return defaultUrl;
  const trimmed = url.trim();
  if (/^(https?:|\/|#|tel:|mailto:|data:image\/)/i.test(trimmed)) {
    return trimmed;
  }
  return defaultUrl;
}
