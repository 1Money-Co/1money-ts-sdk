import 'mocha';
import { expect } from 'chai';
import { api } from '../../';

describe('accounts API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  it('should have accounts API object', function () {
    const apiClient = api();
    expect(apiClient.accounts).to.be.an('object');
  });

  it('should have getNonce method', function () {
    const apiClient = api();
    expect(apiClient.accounts.getNonce).to.be.a('function');
  });

  it('should have getTokenAccount method', function () {
    const apiClient = api();
    expect(apiClient.accounts.getTokenAccount).to.be.a('function');
  });

  // Valid addresses for testing on the testnet
  const testAddress = '0x276dfcc7e502f4a3330857beee0fa574c499242b';
  const testToken = '0x4e34917ebEc4df28CC5ad641637e321Aa590E53f';

  // Make real API calls to test the accounts API
  it('should fetch account nonce', function(done) {
    const apiClient = api();
    apiClient.accounts.getNonce(testAddress)
      .success(response => {
        console.log(`Account nonce for ${testAddress}:`, response);
        expect(response).to.be.an('object');
        expect(response).to.have.property('nonce');
        expect(response.nonce).to.be.a('number');
        done();
      })
      .error(err => {
        console.error('Error fetching account nonce:', err);
        done(err);
      });
  });

  it('should fetch associated token account', function(done) {
    const apiClient = api();
    apiClient.accounts.getTokenAccount(testAddress, testToken)
      .success(response => {
        console.log(`Token account for ${testAddress} and token ${testToken}:`, response);
        expect(response).to.be.an('object');
        expect(response).to.have.property('token_account_address');
        expect(response).to.have.property('balance');
        expect(response).to.have.property('nonce');
        done();
      })
      .error(err => {
        console.error('Error fetching token account:', err);
        done(err);
      });
  });
});
