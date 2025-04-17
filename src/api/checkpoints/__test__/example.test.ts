import 'mocha';
import { expect } from 'chai';
import { api } from '../../';

describe('checkpoint API example', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  const apiClient = api({
    timeout: 3000,
  });

  it('should fetch and display the current checkpoint number', function(done) {

    console.log('Fetching checkpoint number from the API...');

    apiClient.checkpoints.getNumber()
      .success(response => {
        // The API returns the data directly
        console.log(`Current checkpoint number: ${response.number}`);
        expect(response).to.have.property('number');
        expect(response.number).to.be.a('number');
        done();
      })
      .rest(err => {
        console.error('Error fetching checkpoint number:', err);
        done();
      });
  });
});
