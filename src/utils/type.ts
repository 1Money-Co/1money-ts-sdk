export type TypeofResult =
  | 'string'
  | 'number'
  | 'boolean'
  | 'bigint'
  | 'symbol'
  | 'object'
  | 'array'
  | 'function'
  | 'date'
  | 'regexp'
  | 'set'
  | 'map'
  | 'weakmap'
  | 'weakset'
  | 'error'
  | 'promise'
  | 'uint8array'
  | 'uint16array'
  | 'uint32array'
  | 'int8array'
  | 'int16array'
  | 'int32array'
  | 'null'
  | 'undefined';

export function _typeof(ele: any): TypeofResult {
  if (typeof ele !== 'object') return (typeof ele).toLowerCase() as any;
  const typeStr = Object.prototype.toString.call(ele);
  return typeStr.slice(8, typeStr.length - 1).toLowerCase() as TypeofResult;
}
