import 'mocha';
import { expect } from 'chai';
import { api } from '../../';

describe('accounts API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  const apiClient = api({
    timeout: 3000,
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
  const testAddress = '0x0b9f796233d871453d192b5b122f19ffa56d2acc';
  const testToken = '0x461BeB67a74b68Eb60EAD561DdDFC870fD9835a0';

  // Make real API calls to test the accounts API
  it('should fetch account nonce', function(done) {
    apiClient.accounts.getNonce(testAddress)
      .success(response => {
        console.log(`Account nonce for ${testAddress}:`, response);
        expect(response).to.be.an('object');
        expect(response).to.have.property('nonce');
        expect(response.nonce).to.be.a('number');
        done();
      })
      .rest(err => {
        console.error('Error fetching account nonce:', err);
        done();
      });
  });

  it('should fetch associated token account', function(done) {
    apiClient.accounts.getTokenAccount(testAddress, testToken)
      .success(response => {
        console.log(`Token account for ${testAddress} and token ${testToken}:`, response);
        expect(response).to.be.an('object');
        expect(response).to.have.property('token_account_address');
        expect(response).to.have.property('balance');
        expect(response).to.have.property('nonce');
        done();
      })
      .rest(err => {
        console.error('Error fetching token account:', err);
        done();
      });
  });
});
