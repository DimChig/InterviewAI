const STORAGE_PREFIX = "userContext";

/**
 * Save the given user context string to localStorage.
 * @param context The user context to save.
 * @param userKey Optional custom key to namespace this context.
 */
export function saveUserContext(context: string, userKey?: string): void {
  if (typeof window === "undefined") return;
  const key = userKey ? `${STORAGE_PREFIX}:${userKey}` : STORAGE_PREFIX;
  try {
    window.localStorage.setItem(key, context);
  } catch {
    // silently fail (e.g. storage quota exceeded)
  }
}

/**
 * Load a previously saved user context from localStorage.
 * @param userKey Optional custom key used when saving.
 * @returns The saved context string, or null if none found.
 */
export function loadUserContext(userKey?: string): string | null {
  if (typeof window === "undefined") return null;
  const key = userKey ? `${STORAGE_PREFIX}:${userKey}` : STORAGE_PREFIX;
  console.log(userKey);
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
