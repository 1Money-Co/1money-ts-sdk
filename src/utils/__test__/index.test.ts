import "mocha";
import { expect } from "chai";
import {
  _typeof,
  safePromiseAll,
  safePromiseLine,
} from "../";

describe("utils test", function () {
  describe("_typeof test", function () {
    it("_typeof is a function", function () {
      expect(_typeof).to.be.a("function");
    });
    
    it("call _typeof", function () {
      expect(_typeof(1)).to.be.equal("number");
      expect(_typeof("1")).to.be.equal("string");
      expect(_typeof(true)).to.be.equal("boolean");
      expect(_typeof(null)).to.be.equal("null");
      expect(_typeof(undefined)).to.be.equal("undefined");
      expect(_typeof({})).to.be.equal("object");
      expect(_typeof([])).to.be.equal("array");
      expect(_typeof(() => {})).to.be.equal("function");
      expect(_typeof(new Date())).to.be.equal("date");
      expect(_typeof(/a/)).to.be.equal("regexp");
      expect(_typeof(new Set())).to.be.equal("set");
      expect(_typeof(new Map())).to.be.equal("map");
      expect(_typeof(new Error())).to.be.equal("error");
      expect(_typeof(new Promise(() => {}))).to.be.equal("promise");
      expect(_typeof(BigInt(1))).to.be.equal("bigint");
      expect(_typeof(Symbol("a"))).to.be.equal("symbol");
      expect(_typeof(new WeakMap())).to.be.equal("weakmap");
      expect(_typeof(new WeakSet())).to.be.equal("weakset");
      expect(_typeof(new Uint8Array())).to.be.equal("uint8array");
      expect(_typeof(new Uint16Array())).to.be.equal("uint16array");
      expect(_typeof(new Uint32Array())).to.be.equal("uint32array");
      expect(_typeof(new Int8Array())).to.be.equal("int8array");
      expect(_typeof(new Int16Array())).to.be.equal("int16array");
      expect(_typeof(new Int32Array())).to.be.equal("int32array");
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
