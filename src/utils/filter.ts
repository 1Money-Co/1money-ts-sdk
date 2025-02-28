/**
 * Filter out undefined null and empty string values from an object
 * @param obj - The object to filter
 * @returns A new object with undefined and empty string values removed
 */
export function filterEmpty<T extends Record<string, any>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        v = filterEmpty(v);
      }
      return [k, v];
    }).filter(([_, v]) => v != undefined && v !== '')
  ) as T;
}
