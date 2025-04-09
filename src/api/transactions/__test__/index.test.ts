import 'mocha';
import { expect } from 'chai';
import { api } from '../../';

describe('transactions API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  it('should have transactions API object', function () {
    const apiClient = api();
    expect(apiClient.transactions).to.be.an('object');
  });

  it('should have getByHash method', function () {
    const apiClient = api();
    expect(apiClient.transactions.getByHash).to.be.a('function');
  });

  it('should have getReceiptByHash method', function () {
    const apiClient = api();
    expect(apiClient.transactions.getReceiptByHash).to.be.a('function');
  });

  it('should have estimateFee method', function () {
    const apiClient = api();
    expect(apiClient.transactions.estimateFee).to.be.a('function');
  });

  it('should have payment method', function () {
    const apiClient = api();
    expect(apiClient.transactions.payment).to.be.a('function');
  });

  it('should have cancel method', function () {
    const apiClient = api();
    expect(apiClient.transactions.cancel).to.be.a('function');
  });

  // Example values for testing - replace with valid values if needed
  const testHash = '0xf55f9525be94633b56f954d3252d52b8ef42f5fd5f9491b243708471c15cc40c';
  const testAddress = '0x9E1E9688A44D058fF181Ed64ddFAFbBE5CC74ff3';
  const testValue = '1000000000';

  // Skip actual API calls in regular tests
  it.skip('should fetch transaction by hash', function(done) {
    const apiClient = api();
    apiClient.transactions.getByHash(testHash)
      .success(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('hash');
        expect(response).to.have.property('from');
        done();
      })
      .error(err => {
        done(err);
      });
  });

  it.skip('should fetch transaction receipt by hash', function(done) {
    const apiClient = api();
    apiClient.transactions.getReceiptByHash(testHash)
      .success(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('transaction_hash');
        expect(response).to.have.property('success');
        done();
      })
      .error(err => {
        done(err);
      });
  });

  it.skip('should estimate transaction fee', function(done) {
    const apiClient = api();
    apiClient.transactions.estimateFee(testAddress, testValue)
      .success(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('fee');
        expect(response.fee).to.be.a('string');
        done();
      })
      .error(err => {
        done(err);
      });
  });
});
