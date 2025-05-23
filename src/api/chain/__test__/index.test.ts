import 'mocha';
import { expect } from 'chai';
import { api } from '../../';
import { CHAIN_IDS } from '../../constants';

describe('checkpoint API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  const apiClient = api({
    timeout: 3000,
    network: 'testnet',
  });

  it('should have methods', function () {
    expect(apiClient.chain).to.be.an('object');
    expect(apiClient.chain.getChainId).to.be.a('function');
  });

  it('should fetch chain id from the API', function(done) {
    apiClient.chain.getChainId()
      .success(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('chain_id');
        expect(response.chain_id).to.be.a('number');
        done();
      })
      .rest(err => {
        done(err?.data ?? err.message ?? err);
      });
  });
});
