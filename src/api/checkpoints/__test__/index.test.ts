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

  const number = 100;
  const hash = '0xb2fa4f7beb1bb3b867481392c13330159d944a26bcc9208c30744b0b45997809';
  const p_hash = '0x1087ec76ee7ddd3a134d31380d685443a2cad33b59b4de0578b36b3d1625bd58';

  it('should have methods', function () {
    expect(apiClient.checkpoints).to.be.an('object');
    expect(apiClient.checkpoints.getNumber).to.be.a('function');
    expect(apiClient.checkpoints.getByHash).to.be.a('function');
    expect(apiClient.checkpoints.getByNumber).to.be.a('function');
  });

  it('should fetch checkpoint number from the API', function(done) {
    apiClient.checkpoints.getNumber()
      .success(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('number');
        expect(response.number).to.be.a('number');
        done();
      })
      .rest(err => {
        done(err?.data ?? err.message ?? err);
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
        done(err?.data ?? err.message ?? err);
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
        done(err?.data ?? err.message ?? err);
      });
  }); 
});
