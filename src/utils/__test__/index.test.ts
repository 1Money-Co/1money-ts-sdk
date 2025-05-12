import "mocha";
import { expect } from "chai";
import {
  LogLevel,
  Logger,
  safePromiseAll,
  safePromiseLine,
} from "../";

describe("utils test", function () {
  describe("logger test", function () {
    const logger = new Logger({
      extra: {
        appName: "TEST-APP",
      },
      prefix: "BEFORE-PREFIX",
      suffix: "BEFORE-SUFFIX",
    })
    logger.prefix = "AFTER-PREFIX";
    logger.suffix = "AFTER-SUFFIX";

    it("logger is an object", function () {
      expect(logger).to.be.an("object");
      expect(logger).to.has.nested.property("debug").to.be.a("function");
      expect(logger).to.has.nested.property("log").to.be.a("function");
      expect(logger).to.has.nested.property("info").to.be.a("function");
      expect(logger).to.has.nested.property("warn").to.be.a("function");
      expect(logger).to.has.nested.property("error").to.be.a("function");
      expect(logger).to.has.nested.property("logger").to.be.a("function");
      expect(logger)
        .to.has.nested.property("_generateMessage")
        .to.be.a("function");
      expect(logger).to.has.nested.property("logLevel").to.be.a("number");
      expect(logger).to.has.nested.property("_extra").to.be.an("object");
      expect(logger).to.has.nested.property("_prefix").to.be.a("string");
      expect(logger).to.has.nested.property("_suffix").to.be.a("string");
      expect(logger).to.has.nested.property("_logLevel").to.be.a("number");
      expect(logger).to.has.nested.property("_preLevel").to.be.a("number");
    });

    it("call logger", function () {
      logger.format = "string";
      logger.logLevel = LogLevel.debug;
      logger.debug("debug msg");
      logger.log("log msg");
      logger.info("info msg");
      logger.warn("warn msg");
      logger.error("error msg");
      logger.logger("debug", "logger msg - debug");
      logger.logger("log", "logger msg - log");
      logger.logger("info", "logger msg - info");
      logger.logger("warn", "logger msg - warn");
      logger.logger("error", "logger msg - error");
    });

    it("silent logger", function () {
      logger.logLevel = LogLevel.warn;
      logger.silent = true;
      expect(logger.logLevel).to.be.equal(LogLevel.silent);
      logger.debug("debug msg");
      logger.log("log msg");
      logger.info("info msg");
      logger.warn("warn msg");
      logger.error("error msg");
      logger.logger("debug", "logger msg - debug");
      logger.logger("log", "logger msg - log");
      logger.logger("info", "logger msg - info");
      logger.logger("warn", "logger msg - warn");
      logger.logger("error", "logger msg - error");
      logger.silent = false;
      expect(logger.logLevel).to.be.equal(LogLevel.warn);
    });
  });

  describe("safePromiseAll test", function () {
    it("safePromiseAll is a function", function () {
      expect(safePromiseAll).to.be.a("function");
    });

    it("call safePromiseAll", function (done) {
      const timer = [100, 500, 1000];
      safePromiseAll(
        timer.map(t => new Promise<number>((resolve) => setTimeout(() => resolve(t), t)))
      ).then((res: number[]) => {
        expect(res.reduce((prev, curr) => prev + curr)).to.be.equal(1600);
        done();
      });
    });

    it("call safePromiseAll with empty array", function (done) {
      safePromiseAll([]).then(res => {
        expect(res).to.be.an('array');
        expect(res).to.be.empty;
        done();
      });
    });

    it("safePromiseAll with undefined", function (done) {
      // @ts-expect-error
      safePromiseAll().then(res => {
        expect(res).to.be.an('array');
        expect(res).to.be.empty;
        done();
      });
    });
  });

  describe("safePromiseLine test", function () {
    it("safePromiseLine is a function", function () {
      expect(safePromiseLine).to.be.a("function");
    });

    it("call safePromiseLine", function (done) {
      const timer = [100, 500, 1000];
      safePromiseLine(
        timer.map(t => () => new Promise<number>((resolve) => setTimeout(() => resolve(t), t)))
      ).then(res => {
        expect(res.reduce((prev, curr) => prev + curr)).to.be.equal(1600);
        done();
      });
    });
  });
});
