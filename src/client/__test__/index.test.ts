import "mocha";
import { expect } from "chai";
import {
  get,
  post,
  put,
  del,
  patch,
  setInitConfig,
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
        isSuccess: (res: any, status) => status === 200 && res?.id != null,
      });
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
});
