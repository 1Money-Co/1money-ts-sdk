/**
 * if a starts with b in ignore case
 * @param a string
 * @param b string
 * @returns { boolean }
 */
export function startsWithIgnoreCase(a: string, b: string) {
  return a.toLowerCase().startsWith(b.toLowerCase());
}

/**
 * if a equal to b in ignore case
 * @param a string
 * @param b string
 * @returns { boolean }
 */
export function equalIgnoreCase(a: string, b: string) {
  if (a == undefined || b == undefined) return false;
  return a?.toLowerCase() === b?.toLowerCase();
}