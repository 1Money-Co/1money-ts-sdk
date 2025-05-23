import "mocha";
import { expect } from "chai";
import {
  deriveTokenAddress,
  _typeof,
  safePromiseAll,
  safePromiseLine,
  toHex,
  signMessage,
} from "../";
import 'dotenv/config';

import type { ZeroXString } from '../sign';

const RUN_ENV = process.env.RUN_ENV || 'local';

describe("utils test", function () {
  describe("deriveTokenAddress test", function () {
    it("deriveTokenAddress is a function", function () {
      expect(deriveTokenAddress).to.be.a("function");
    });

    it("call deriveTokenAddress", function () {
      const walletAddress = "0xA634dfba8c7550550817898bC4820cD10888Aac5";
      const mintAddress = "0x8E9d1b45293e30EF38564582979195DD16A16E13";
      const tokenAddress = deriveTokenAddress(walletAddress, mintAddress);
      expect(tokenAddress).to.be.a('string');
      expect(tokenAddress).to.be.equal("0x91b6191015e41469ba2febd7e1722a8ee83de15b");
    });
  });

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
      expect(_typeof(new ArrayBuffer())).to.be.equal("arraybuffer");
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

  describe("signMessage test", function () {
    it("signMessage is a function", function () {
      expect(signMessage).to.be.a("function");
    });
    
    const testPK = process.env.TEST_PRIVATE_KEY;
    if (testPK && RUN_ENV !== 'remote') {
      it("call signMessage", function (done) {
        const payload = [
          toHex(1),
          toHex("2"),
          toHex(true),
        ];
        signMessage(payload, testPK as ZeroXString)
          .then(signature => {
            expect(signature).to.be.an("object");
            expect(signature?.r).to.be.a("string");
            expect(signature?.s).to.be.a("string");
            expect(signature?.v).to.be.a("number");
            done();
          });
      });
    }
  });

  describe("toHex test", function () {
    it("toHex is a function", function () {
      expect(toHex).to.be.a("function");
    });

    it("call toHex", function () {
      expect(toHex(1)).to.be.equal("0x1");
      expect(toHex("2")).to.be.equal("0x2");
      expect(toHex(true)).to.be.equal("0x1");
      expect(toHex(false)).to.be.equal("0x0");
      expect(toHex(null)).to.be.equal("0x6e756c6c");
      expect(toHex(undefined)).to.be.equal("0x");
      expect(toHex({})).to.be.equal("0x7b7d");
      expect(toHex([])).to.be.equal("0x");
      expect(toHex(new Error())).to.be.equal("0x7b7d");
    });    
  });
});
