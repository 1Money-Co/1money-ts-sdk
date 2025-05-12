/* eslint-disable no-console */
import chalk from 'chalk';

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

export type BeforeLog = (level: keyof typeof LogLevel, msg: string) => any;

export class Logger {
  private _logLevel: LogLevel;

  private _preLevel: LogLevel;

  private _format: LogFormat;

  private _extra?: Record<string, any>;

  private _prefix?: string;

  private _suffix?: string;

  private _beforeLog?: BeforeLog;

  public constructor(options?: {
    level?: LogLevel;
    format?: LogFormat;
    extra?: Record<string, any>;
    prefix?: string;
    suffix?: string;
    beforeLog?: BeforeLog;
  }) {
    const { level = LogLevel.info, format = 'string', extra, prefix, suffix, beforeLog } = options || {};
    this._logLevel = level;
    this._preLevel = this._logLevel;
    this._format = format;
    this._extra = extra;
    this._prefix = prefix;
    this._suffix = suffix;
    this._beforeLog = beforeLog;

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

  public set format(_format: LogFormat) {
    this._format = _format;
  }

  public set extra(_extra: Record<string, any>) {
    this._extra = _extra;
  }

  public set prefix(_prefix: string) {
    this._prefix = _prefix;
  }

  public set suffix(_suffix: string) {
    this._suffix = _suffix;
  }

  public set beforeLog(_beforeLog: BeforeLog) {
    this._beforeLog = _beforeLog;
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
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
    const formattedLevel = chalk.bold(level.toUpperCase());

    let _msg = '';
    switch (this._format) {
      case 'raw':
        _msg = msg;
        break;
      case 'string':
        _msg = chalk[colors[level]](`<${this._prefix
          ? `${this._prefix}, ${formattedLevel}`
          : formattedLevel
          }, ${this._extra ? `${Object.values(this._extra).join(', ')}, ${formattedDate}` : formattedDate}> | ${this._suffix ? `${chalk.underline(msg)} | <${this._suffix}>` : chalk.underline(msg)}`);
        break;
      case 'json':
      default:
        _msg = JSON.stringify({
          ...this._extra,
          level: level?.toUpperCase(),
          timestamp: date.valueOf(),
          datetime: formattedDate,
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

    if (this._beforeLog) {
      const _beforeMsg = this._beforeLog?.(level, _msg);
      if (!!_beforeMsg && typeof _beforeMsg === 'string') {
        _msg = _beforeMsg;
      }
    }

    return _msg;
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
}

export const logger = new Logger({
  extra: {
    name: '1money-ts-sdk'
  },
  level: LogLevel.log
});

export default logger;
