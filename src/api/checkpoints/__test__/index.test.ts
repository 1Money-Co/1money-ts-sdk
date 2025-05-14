import 'mocha';
import { expect } from 'chai';
import { api, CHAIN_IDS } from '../../';

describe('checkpoint API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  const apiClient = api({
    timeout: 3000,
    network: 'testnet',
  });

  const number = 464730;
  const hash = '0xca82c4666c3bb8e8a40218d82687713801be1921a764f859eda8848577fea8bd';
  const p_hash = '0x68723ef1c65199c871a03fd072d6b09412852c2073ff78740b1d9bc5e8f2e897';

  it('should have methods', function () {
    expect(apiClient.checkpoints).to.be.an('object');
    expect(apiClient.checkpoints.getNumber).to.be.a('function');
    expect(apiClient.checkpoints.getByHash).to.be.a('function');
    expect(apiClient.checkpoints.getByNumber).to.be.a('function');
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

  it('should fetch checkpoint by hash from the API', function(done) {
    apiClient.checkpoints.getByHash(hash, true)
      .success(response => {
        expect(response).to.be.an('object');

        expect(response).to.have.property('hash');
        expect(response.hash).to.be.a('string');
        expect(response.hash).to.be.equal(hash);

        expect(response).to.have.property('number');
        expect(response.number).to.be.a('number');
        expect(response.number).to.be.equal(number);

        expect(response).to.have.property('parent_hash');
        expect(response.parent_hash).to.be.a('string');
        expect(response.parent_hash).to.be.equal(p_hash);

        expect(response).to.have.property('state_root');
        expect(response.state_root).to.be.a('string');

        expect(response).to.have.property('transactions_root');
        expect(response.transactions_root).to.be.a('string');

        expect(response).to.have.property('receipts_root');
        expect(response.receipts_root).to.be.a('string');

        expect(response).to.have.property('timestamp');
        expect(response.timestamp).to.be.a('number');

        expect(response).to.have.property('transactions');
        expect(response.transactions).to.be.an('array');
        response.transactions.forEach(transaction => {
          expect(transaction).to.have.property('hash');
          expect(transaction.hash).to.be.a('string');

          expect(transaction).to.have.property('checkpoint_hash');
          expect(transaction.checkpoint_hash).to.be.a('string');
          expect(transaction.checkpoint_hash).to.be.equal(hash);

          expect(transaction).to.have.property('checkpoint_number');
          expect(transaction.checkpoint_number).to.be.a('number');
          expect(transaction.checkpoint_number).to.be.equal(number);

          expect(transaction).to.have.property('transaction_index');
          expect(transaction.transaction_index).to.be.a('number');

          expect(transaction).to.have.property('chain_id');
          expect(transaction.chain_id).to.be.a('number');
          expect(transaction.chain_id).to.be.equal(CHAIN_IDS.TESTNET);

          expect(transaction).to.have.property('nonce');
          expect(transaction.nonce).to.be.a('number');

          expect(transaction).to.have.property('fee');
          expect(transaction.fee).to.be.a('number');

          expect(transaction).to.have.property('from');
          expect(transaction.from).to.be.a('string');

          expect(transaction).to.have.property('data');
          expect(transaction.data).to.be.an('object');
          expect(transaction.data.value).to.be.a('string');
          expect(transaction.data.to).to.be.a('string');
          expect(transaction.data.token).to.be.a('string');

          expect(transaction).to.have.property('signature');
          expect(transaction.signature).to.be.an('object'); 
          expect(transaction.signature.r).to.be.a('string'); 
          expect(transaction.signature.s).to.be.a('string'); 
          expect(transaction.signature.v).to.be.a('number'); 
        });

        expect(response).to.have.property('size');
        expect(response.size).to.be.an('number');

        done();
      })
      .rest(err => {
        console.error('Error fetching checkpoint by hash:', err);
        done();
      });
  });

  it('should fetch checkpoint by number from the API', function(done) {
    apiClient.checkpoints.getByNumber(number, true)
      .success(response => {
        expect(response).to.be.an('object');

        expect(response).to.have.property('hash');
        expect(response.hash).to.be.a('string');
        expect(response.hash).to.be.equal(hash);

        expect(response).to.have.property('number');
        expect(response.number).to.be.a('number');
        expect(response.number).to.be.equal(number);

        expect(response).to.have.property('parent_hash');
        expect(response.parent_hash).to.be.a('string');
        expect(response.parent_hash).to.be.equal(p_hash);

        expect(response).to.have.property('state_root');
        expect(response.state_root).to.be.a('string');

        expect(response).to.have.property('transactions_root');
        expect(response.transactions_root).to.be.a('string');

        expect(response).to.have.property('receipts_root');
        expect(response.receipts_root).to.be.a('string');

        expect(response).to.have.property('timestamp');
        expect(response.timestamp).to.be.a('number');

        expect(response).to.have.property('transactions');
        expect(response.transactions).to.be.an('array');
        response.transactions.forEach(transaction => {
          expect(transaction).to.have.property('hash');
          expect(transaction.hash).to.be.a('string');

          expect(transaction).to.have.property('checkpoint_hash');
          expect(transaction.checkpoint_hash).to.be.a('string');
          expect(transaction.checkpoint_hash).to.be.equal(hash);

          expect(transaction).to.have.property('checkpoint_number');
          expect(transaction.checkpoint_number).to.be.a('number');
          expect(transaction.checkpoint_number).to.be.equal(number);

          expect(transaction).to.have.property('transaction_index');
          expect(transaction.transaction_index).to.be.a('number');

          expect(transaction).to.have.property('chain_id');
          expect(transaction.chain_id).to.be.a('number');
          expect(transaction.chain_id).to.be.equal(CHAIN_IDS.TESTNET);

          expect(transaction).to.have.property('nonce');
          expect(transaction.nonce).to.be.a('number');

          expect(transaction).to.have.property('fee');
          expect(transaction.fee).to.be.a('number');

          expect(transaction).to.have.property('from');
          expect(transaction.from).to.be.a('string');

          expect(transaction).to.have.property('data');
          expect(transaction.data).to.be.an('object');
          expect(transaction.data.value).to.be.a('string');
          expect(transaction.data.to).to.be.a('string');
          expect(transaction.data.token).to.be.a('string');

          expect(transaction).to.have.property('signature');
          expect(transaction.signature).to.be.an('object'); 
          expect(transaction.signature.r).to.be.a('string'); 
          expect(transaction.signature.s).to.be.a('string'); 
          expect(transaction.signature.v).to.be.a('number'); 
        });

        expect(response).to.have.property('size');
        expect(response.size).to.be.an('number');

        done();
      })
      .rest(err => {  
        console.error('Error fetching checkpoint by number:', err);
        done();
      });
  }); 
});
