// ─────────────────────────────────────────────
//  Common Utility Helpers
// ─────────────────────────────────────────────

/**
 * Debounce a callback function.
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Format a number with commas as thousands separators.
 */
export function formatNumber(value: string | number): string {
  const num = typeof value === 'string' ? parseInt(value.replace(/,/g, ''), 10) : value;
  if (isNaN(num)) return String(value);
  return num.toLocaleString();
}

/**
 * Returns a placeholder poster URL when no poster is available.
 */
export function getPosterFallback(): string {
  return '/poster-placeholder.png';
}
