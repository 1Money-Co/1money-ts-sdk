import 'mocha';
import { expect } from 'chai';
import { api, TESTNET_API_URL } from '../../';

describe('checkpoint API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  const apiClient = api({
    timeout: 3000,
  });

  it('should have checkpoints.getNumber method', function () {
    expect(apiClient.checkpoints).to.be.an('object');
    expect(apiClient.checkpoints.getNumber).to.be.a('function');
  });

  it('should use the correct testnet API URL', function () {
    expect(TESTNET_API_URL).to.equal('https://api.testnet.1money.network');
  });

  it('should fetch checkpoint number from the API', function(done) {
    apiClient.checkpoints.getNumber()
      .success(response => {
        // Verify the response format
        expect(response).to.be.an('object');
        expect(response).to.have.property('number');
        expect(response.number).to.be.a('number');

        // Log the checkpoint number for verification
        console.log(`Current checkpoint number from API: ${response.number}`);

        done();
      })
      .rest(err => {
        console.error('Error fetching checkpoint number:', err);
        done();
      });
  });
});
