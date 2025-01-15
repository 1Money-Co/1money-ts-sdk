export type APP_ENV = 'local' | 'staging' | 'prod';

export const ENV = typeof process !== 'undefined' ? ((process.env?.APP_ENV as APP_ENV) || 'prod') : 'prod';

export const APP_NAME = '1money-ts-sdk';