import "mocha";
import { expect } from "chai";
import {
  get,
  post,
  put,
  del,
  patch,
  setInitConfig,
  getEnv,
  logger,
  LogLevel,
  tsCalculator,
  plus,
  minus,
  multiply,
  divided,
  isGreaterThan,
  isGreaterThanOrEqualTo,
  isLessThanOrEqualTo,
  isLessThan,
  isEqualTo,
  getMedian,
  timeslice,
  safePromiseAll,
  safePromiseLine,
  startsWithIgnoreCase,
  equalIgnoreCase,
  isNumberLike,
  getFirstAndLastItem
} from "../";

describe("utils test", function () {
  describe("request methods test", function () {
    it("type check", function () {
      expect(get).to.be.a("function");
      expect(post).to.be.a("function");
      expect(put).to.be.a("function");
      expect(del).to.be.a("function");
      expect(patch).to.be.a("function");
      expect(setInitConfig).to.be.a("function");
    });

    it("call methods", function (done) {
      setInitConfig({
        isSuccess: (res, status) => status === 200 && !!res?.result,
      })
      expect(post<{
        id: number;
        result: string;
        jsonrpc: string;
      }>('https://ethereum-rpc.publicnode.com/', {
        id: 1,
        jsonrpc: "2.0",
        method: "eth_blockNumber"
      }).success(res => {
        expect(res).to.be.an('object');
        expect(res).to.has.property('id').to.equal(1);
        expect(res).to.has.property('jsonrpc').to.equal('2.0');
        expect(res).to.has.property('result').to.be.a('string');
        done();
      }).rest(() => done()));
    });
  });

  describe("getEnv test", function () {
    it("getEnv is a function", function () {
      expect(getEnv).to.be.a("function");
    });
    it("call tsCalculator", function () {
      expect(getEnv()).to.equal("prod");
    });
  });

  describe("logger test", function () {
    logger.prefix = "TEST-PREFIX";
    logger.suffix = "TEST-SUFFIX";

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
      expect(logger).to.has.nested.property("_appName").to.be.a("string");
      expect(logger).to.has.nested.property("_prefix").to.be.a("string");
      expect(logger).to.has.nested.property("_suffix").to.be.a("string");
      expect(logger).to.has.nested.property("_logLevel").to.be.a("number");
      expect(logger).to.has.nested.property("_preLevel").to.be.a("number");
    });

    it("call logger", function () {
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

  describe("tsCalculator test", function () {
    it("tsCalculator is a function", function () {
      expect(tsCalculator).to.be.a("function");
    });

    it("call tsCalculator", function (done) {
      const getTs = tsCalculator();
      setTimeout(() => {
        const result = getTs();
        expect(result).to.be.closeTo(450, 650);
        done();
      }, 500);
    });
  });

  describe("number test", function () {
    it("type check", function () {
      expect(plus).to.be.a("function");
      expect(minus).to.be.a("function");
      expect(multiply).to.be.a("function");
      expect(divided).to.be.a("function");
      expect(isGreaterThan).to.be.a("function");
      expect(isGreaterThanOrEqualTo).to.be.a("function");
      expect(isLessThanOrEqualTo).to.be.a("function");
      expect(isLessThan).to.be.a("function");
      expect(isEqualTo).to.be.a("function");
    });

    it("call check", function () {
      expect(plus(0.1, 0.2).toNumber()).to.be.equal(0.3);
      expect(plus(0.1, 0.2, 0.3).toNumber()).to.be.equal(0.6);
      expect(plus([0.1, 0.2, 0.3, 0.4]).toNumber()).to.be.equal(1);

      expect(minus(0.3, 0.2).toNumber()).to.be.equal(0.1);

      expect(multiply(0.1, 0.2).toNumber()).to.be.equal(0.02);
      expect(multiply(0.1, 0.2, 0.3, 0.4, 50).toNumber()).to.be.equal(0.12);

      expect(divided(0.6, 0.2).toNumber()).to.be.equal(3);
      expect(divided(3, 10).toNumber()).to.be.equal(0.3);

      expect(isGreaterThan(3, 10)).to.be.false;
      expect(isGreaterThan(13, 10)).to.be.true;
      expect(isGreaterThanOrEqualTo(13, 10)).to.be.true;
      expect(isGreaterThanOrEqualTo(10, 10)).to.be.true;
      expect(isGreaterThanOrEqualTo(3, 10)).to.be.false;
      expect(isLessThanOrEqualTo(3, 10)).to.be.true;
      expect(isLessThanOrEqualTo(10, 10)).to.be.true;
      expect(isLessThanOrEqualTo(13, 10)).to.be.false;
      expect(isLessThan(13, 10)).to.be.false;
      expect(isLessThan(3, 10)).to.be.true;
      expect(isEqualTo(10, 10)).to.be.true;
      expect(isEqualTo(6, 10)).to.be.false;
    });
  });

  describe("getMedian test", function () {
    it("type check", function () {
      expect(getMedian).to.be.a("function");
    });

    it("call getMedian", function () {
      const arr1 = [] as number[];
      const arr2 = [2];
      const arr3 = [1, 15, 8, 19, 4];
      const arr4 = [3, 9, 0.8, 9, 2, 11];
      expect(getMedian(arr1)).to.be.undefined;
      expect(getMedian(arr2)).to.be.equal(2);
      expect(getMedian(arr3)).to.be.equal(8);
      expect(getMedian(arr4)).to.be.equal(6);
    });
  });

  describe("timeslice's test module", function () {
    it("timeslice is a function", function () {
      expect(timeslice).to.be.a("function");
    });

    it("call timeslice return a promise", function (done) {
      function* gen() {
        const arr: number[] = Array.apply(null, { length: 50000 } as any).map(
          (v: unknown, k: number) => k,
        );
        const len = arr.length;
        for (let i = 0; i < len; i++) {
          if (arr[i] % 5000 === 0) {
            logger.log(arr[i]);
          }
          yield;
        }
        done();
      }
      expect(timeslice(gen as any)).to.be.a("promise");
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

  describe("startsWithIgnoreCase test", function () {
    it("startsWithIgnoreCase is a function", function () {
      expect(startsWithIgnoreCase).to.be.a("function");
    });

    it("call startsWithIgnoreCase", function () {
      expect(startsWithIgnoreCase('0x76be3b62873462d2142405439777e971754e8e77', '0x76BE3B6')).to.be.true
    });
  });

  describe("equalIgnoreCase test", function () {
    it("equalIgnoreCase is a function", function () {
      expect(equalIgnoreCase).to.be.a("function");
    });

    it("call equalIgnoreCase", function () {
      expect(equalIgnoreCase('ABC', 'abc')).to.be.true
      expect(equalIgnoreCase('Abc', 'aBc')).to.be.true
      expect(equalIgnoreCase('abd', 'abc')).to.be.false
    });
  });

  describe("isNumberLike test", function () {
    it("isNumberLike is a function", function () {
      expect(isNumberLike).to.be.a("function");
    });

    it("call isNumberLike", function () {
      expect(isNumberLike('ABC')).to.be.false;
      expect(isNumberLike(NaN)).to.be.false;
      expect(isNumberLike(null)).to.be.false;
      expect(isNumberLike(undefined)).to.be.false;
      expect(isNumberLike(true)).to.be.false;
      expect(isNumberLike(false)).to.be.false;
      expect(isNumberLike(new Date())).to.be.false;
      expect(isNumberLike('test33524')).to.be.false;
      expect(isNumberLike(66)).to.be.true;
      expect(isNumberLike('33524')).to.be.true;
      expect(isNumberLike(44402323123123213213n)).to.be.true;
    });
  });

  describe("getFirstAndLastItem test", function () {
    it("getFirstAndLastItem is a function", function () {
      expect(getFirstAndLastItem).to.be.a("function");
    });

    it("call getFirstAndLastItem", function () {
      expect(getFirstAndLastItem([])).to.have.property('first').to.be.undefined;
      expect(getFirstAndLastItem([])).to.have.property('last').to.be.undefined;
      expect(getFirstAndLastItem([3])).to.have.property('first').to.be.equal(3);
      expect(getFirstAndLastItem([3])).to.have.property('last').to.be.equal(3);
      expect(getFirstAndLastItem([55, 3412, 3231, 6634])).to.have.property('first').to.be.equal(55);
      expect(getFirstAndLastItem([55, 3412, 3231, 6634])).to.have.property('last').to.be.equal(6634);
    });
  });
});
