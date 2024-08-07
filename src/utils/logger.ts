/* eslint-disable no-console */
import chalk from 'chalk';
import dayjs from 'dayjs';

import { APP_NAME, ENV } from '@/constants';
import { _typeof } from './type';

export enum LogLevel {
  debug, // 0
  log, // 1
  info, // 2
  warn, // 3
  error, // 4
  silent, // 5
}

export type LogFormat = 'raw' | 'json' | 'string';

export class Logger {
  private _logLevel: LogLevel;

  private _preLevel: LogLevel;

  private _appName: string;

  private _format: LogFormat;

  private _prefix?: string;

  private _suffix?: string;

  public constructor(options?: {
    appName?: string;
    prefix?: string;
    suffix?: string;
  }) {
    const { appName = '', prefix, suffix } = options || {};
    this._logLevel = LogLevel.info;
    this._preLevel = this._logLevel;
    this._appName = appName;
    this._format = ENV === 'local' ? 'string' : 'json';
    this._prefix = prefix;
    this._suffix = suffix;

    this._handleMsg = this._handleMsg.bind(this);
    this._generateMessage = this._generateMessage.bind(this);

    this.debug = this.debug.bind(this);
    this.log = this.log.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
    this.logger = this.logger.bind(this);
  }

  public get logLevel() {
    return this._logLevel;
  }

  public set logLevel(_level: LogLevel) {
    if (typeof _level !== 'number' || _level < 0 || _level > 6) {
      this.warn('[Logger Level]: Please pass 0 ~ 5 with number!');
      return;
    }
    this._preLevel = this._logLevel;
    this._logLevel = _level;
  }

  public set silent(_silent: boolean) {
    if (_silent && this._logLevel < LogLevel.silent) {
      this._preLevel = this._logLevel;
      this._logLevel = LogLevel.silent;
      return;
    }

    if (!_silent && this._logLevel === LogLevel.silent) {
      this._logLevel =
        this._preLevel < LogLevel.silent ? this._preLevel : LogLevel.info;
    }
  }

  public set appName(_appName: string) {
    this._appName = _appName;
  }

  public set format(_format: LogFormat) {
    this._format = _format;
  }

  public set prefix(_prefix: string) {
    this._prefix = _prefix;
  }

  public set suffix(_suffix: string) {
    this._suffix = _suffix;
  }

  private _handleMsg(msg: any[]): string {
    return msg
      .map((v) => {
        const _type = _typeof(v);
        if (_type === 'object' || _type === 'array') {
          try {
            return JSON.stringify(v);
          } catch (e) {
            return v;
          }
        }
        return v;
      })
      .join(', ');
  }

  private _generateMessage(params: { msg: any; level: keyof typeof LogLevel }) {
    const { msg, level } = params;
    const colors = {
      debug: 'cyan',
      log: 'white',
      info: 'blue',
      warn: 'yellow',
      error: 'red',
      silent: 'black'
    } as const;
    const date = dayjs();
    switch (this._format) {
      case 'raw':
        return msg;
      case 'string':
        return chalk[colors[level]](`<${this._prefix
          ? `${this._prefix}, ${this._appName}`
          : `${this._appName}`
          }, ${chalk.bold(level.toUpperCase())}, ${date.format(
            'ZZ YYYY-MM-DD HH:mm:ss:SSS'
          )}> | ${this._suffix ? `${chalk.underline(msg)} | <${this._suffix}>` : chalk.underline(msg)}`);
      case 'json':
      default:
        return JSON.stringify({
          appName: this._appName,
          level: level?.toUpperCase(),
          timestamp: date.valueOf(),
          datetime: date.format('YYYY.MM.DD HH:mm:ss.SSS'),
          message:
            this._prefix && this._suffix
              ? `<${this._prefix}> | ${msg} | <${this._suffix}>`
              : this._prefix
                ? `<${this._prefix}> | ${msg}`
                : this._suffix
                  ? `${msg} | <${this._suffix}>`
                  : msg
        });
    }
  }

  public debug(...msg: any[]) {
    if (this._logLevel > LogLevel.debug) return;
    console.debug(
      this._generateMessage({
        msg: this._handleMsg(msg),
        level: 'debug'
      })
    );
  }

  public log(...msg: any[]) {
    if (this._logLevel > LogLevel.log) return;
    console.log(
      this._generateMessage({
        msg: this._handleMsg(msg),
        level: 'log'
      })
    );
  }

  public info(...msg: any[]) {
    if (this._logLevel > LogLevel.info) return;
    console.info(
      this._generateMessage({
        msg: this._handleMsg(msg),
        level: 'info'
      })
    );
  }

  public warn(...msg: any[]) {
    if (this._logLevel > LogLevel.warn) return;
    console.warn(
      this._generateMessage({
        msg: this._handleMsg(msg),
        level: 'warn'
      })
    );
  }

  public error(...msg: any[]) {
    if (this._logLevel > LogLevel.error) return;
    console.error(
      this._generateMessage({
        msg: this._handleMsg(msg),
        level: 'error'
      })
    );
  }

  public logger(level: keyof typeof LogLevel = 'log', ...msg: any[]) {
    switch (level) {
      case 'debug':
        if (this._logLevel > LogLevel.debug) return;
        break;
      case 'log':
        if (this._logLevel > LogLevel.log) return;
        break;
      case 'info':
        if (this._logLevel > LogLevel.info) return;
        break;
      case 'warn':
        if (this._logLevel > LogLevel.warn) return;
        break;
      case 'error':
        if (this._logLevel > LogLevel.error) return;
        break;
      default:
        return;
    }

    console[level](
      this._generateMessage({
        msg: this._handleMsg(msg),
        level
      })
    );
  }

  public clone(options?: {
    appName?: string;
    prefix?: string;
    suffix?: string;
  }) {
    const newLogger = new Logger();
    newLogger.logLevel = this._logLevel;
    newLogger.appName = options?.appName || this._appName;
    newLogger.format = this._format;
    newLogger.prefix = options?.prefix || this._prefix || '';
    newLogger.suffix = options?.suffix || this._suffix || '';
    return this;
  }
}

export const logger = new Logger({
  appName: APP_NAME
});

logger.logLevel =
  ENV === 'prod'
    ? 2
    : ENV === 'local'
      ? 1
      : 0;

export default logger;
