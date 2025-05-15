import 'mocha';
import { expect } from 'chai';
import { api } from '../../';

describe('accounts API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  const apiClient = api({
    timeout: 3000,
    network: 'testnet',
  });

  it('should have accounts API object', function () {
    expect(apiClient.accounts).to.be.an('object');
  });

  it('should have getNonce method', function () {
    expect(apiClient.accounts.getNonce).to.be.a('function');
  });

  it('should have getTokenAccount method', function () {
    expect(apiClient.accounts.getTokenAccount).to.be.a('function');
  });

  // Valid addresses for testing on the testnet
  const testAddress = '0x179e3514e5afd76223d53c3d97117d66f217d087';
  const testToken = '0x8a0e3fde2b52f63459b41c6c931382b5adb7aa0b';

  // Make real API calls to test the accounts API
  it('should fetch account nonce', function(done) {
    apiClient.accounts.getNonce(testAddress)
      .success(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('nonce');
        expect(response.nonce).to.be.a('number');
        done();
      })
      .error(err => {
        done(err?.data ?? err.message ?? err);
      });
  });

  it('should fetch associated token account', function(done) {
    apiClient.accounts.getTokenAccount(testAddress, testToken)
      .success(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('token_account_address');
        expect(response).to.have.property('balance');
        expect(response).to.have.property('nonce');
        done();
      })
      .error(err => {
        done(err?.data ?? err.message ?? err);
      });
  });
});
