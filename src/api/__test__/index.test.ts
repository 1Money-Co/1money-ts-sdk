import 'mocha';
import { expect } from 'chai';
import api from '../';

describe('api test', function () {
  it('api is a function', function () {
    expect(api).to.be.a('function');
  });
});
