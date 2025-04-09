import 'mocha';
import { expect } from 'chai';
import { api } from '../../';

describe('tokens API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  it('should have tokens API object', function () {
    const apiClient = api();
    expect(apiClient.tokens).to.be.an('object');
  });

  it('should have getTokenMetadata method', function () {
    const apiClient = api();
    expect(apiClient.tokens.getTokenMetadata).to.be.a('function');
  });

  it('should have setBlacklist method', function () {
    const apiClient = api();
    expect(apiClient.tokens.setBlacklist).to.be.a('function');
  });

  it('should have burnToken method', function () {
    const apiClient = api();
    expect(apiClient.tokens.burnToken).to.be.a('function');
  });

  it('should have grantAuthority method', function () {
    const apiClient = api();
    expect(apiClient.tokens.grantAuthority).to.be.a('function');
  });

  it('should have issueToken method', function () {
    const apiClient = api();
    expect(apiClient.tokens.issueToken).to.be.a('function');
  });

  it('should have mintToken method', function () {
    const apiClient = api();
    expect(apiClient.tokens.mintToken).to.be.a('function');
  });

  it('should have pauseToken method', function () {
    const apiClient = api();
    expect(apiClient.tokens.pauseToken).to.be.a('function');
  });

  it('should have updateMetadata method', function () {
    const apiClient = api();
    expect(apiClient.tokens.updateMetadata).to.be.a('function');
  });

  // Example token for testing - replace with a valid token if needed
  const testToken = '0x2cd8999Be299373D7881f4aDD11510030ad1412F';

  // Skip actual API calls in regular tests
  it.skip('should fetch token metadata', function(done) {
    const apiClient = api();
    apiClient.tokens.getTokenMetadata(testToken)
      .success(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('symbol');
        expect(response).to.have.property('decimals');
        expect(response).to.have.property('supply');
        done();
      })
      .error(err => {
        done(err);
      });
  });
});
