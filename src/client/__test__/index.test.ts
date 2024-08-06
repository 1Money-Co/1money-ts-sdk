import 'mocha';
import { expect } from 'chai';
import client from '../';

describe('client test', function () {
  it('client is a function', function () {
    expect(client).to.be.a('function');
  });
});
