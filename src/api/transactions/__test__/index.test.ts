import 'mocha';
import puppeteer, { type Browser, type Page } from 'puppeteer';
import { expect } from 'chai';
import { api } from '../../';
import { CHAIN_IDS } from '../../constants';
import { signMessage } from '../../../utils';
import { transactionsApi } from '../';
import { accountsApi } from '../../accounts';
import 'dotenv/config';

import type { ZeroXString } from '../../../utils/sign';

declare global {
  interface Window {
    signMessage: typeof signMessage;
    getNonce: typeof accountsApi.getNonce;
    _getByHash: typeof transactionsApi.getByHash;
    getReceiptByHash: typeof transactionsApi.getReceiptByHash;
    estimateFee: typeof transactionsApi.estimateFee;
    payment: typeof transactionsApi.payment;
    cancel: typeof transactionsApi.cancel;
  }
}

const RUN_ENV = process.env.RUN_ENV || 'local';

describe('transactions API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  const apiClient = api({
    timeout: 3000,
    network: 'testnet',
  });

  let browser: Browser;
  let pageOne: Page;

  if (RUN_ENV === 'local') {
    before(async () => {
      browser = await puppeteer.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      });
      await browser.newPage().then(page => {
        pageOne = page;
        return Promise.all([
          pageOne.exposeFunction('signMessage', signMessage),
          pageOne.exposeFunction('getNonce', apiClient.accounts.getNonce),
          pageOne.exposeFunction('_getByHash', apiClient.transactions.getByHash),
          pageOne.exposeFunction('getReceiptByHash', apiClient.transactions.getReceiptByHash),
          pageOne.exposeFunction('estimateFee', apiClient.transactions.estimateFee),
          pageOne.exposeFunction('payment', apiClient.transactions.payment),
          pageOne.exposeFunction('cancel', apiClient.transactions.cancel),
        ])
      });
    });

    after(async () => {
      await browser.close();
    });
  }

  it('should have transactions API object', function () {
    expect(apiClient.transactions).to.be.an('object');
  });

  it('should have getByHash method', function () {
    expect(apiClient.transactions.getByHash).to.be.a('function');
  });

  it('should have getReceiptByHash method', function () {
    expect(apiClient.transactions.getReceiptByHash).to.be.a('function');
  });

  it('should have estimateFee method', function () {
    expect(apiClient.transactions.estimateFee).to.be.a('function');
  });

  it('should have payment method', function () {
    expect(apiClient.transactions.payment).to.be.a('function');
  });

  it('should have cancel method', function () {
    expect(apiClient.transactions.cancel).to.be.a('function');
  });
  const issuedToken = '0x8e9d1b45293e30ef38564582979195dd16a16e13';
  const tokenValue = '100';
  const operatorAddress = process.env.OPERATOR_ADDRESS;
  const operatorPK = process.env.OPERATOR_PRIVATE_KEY as ZeroXString;
  const testAddress = '0x179e3514e5afd76223d53c3d97117d66f217d087';
  const testPK = '0xce6ed4b68189c8e844fc245d3169df053fb9e05c13f168cd005a6a111ac67bee';
  const testHash = '0x85396c45c42acfc73c214da3b71737f3c46b4bda638d5b0c58404d176392f867';
  const chainId = CHAIN_IDS.TESTNET;

  // Make real API calls to test the transactions API
  it.skip('should fetch transaction by hash', function (done) {
    apiClient.transactions.getByHash(testHash)
      .success(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('hash');
        expect(response).to.have.property('from');
        done();
      })
      .rest(err => {
        // If the transaction doesn't exist, we'll consider the test passed
        expect(err).to.be.an('object');
        expect(err).to.have.property('message');
        expect(err.message).to.include('not found');
        done(err?.data ?? err.message ?? err);
      });
  });

  it.skip('should fetch transaction receipt by hash', function (done) {
    apiClient.transactions.getReceiptByHash(testHash)
      .success(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('transaction_hash');
        expect(response).to.have.property('success');
        done();
      })
      .rest(err => {
        expect(err).to.be.an('object');
        expect(err).to.have.property('message');
        expect(err.message).to.include('not found');
        done(err?.data ?? err.message ?? err);
      });;
  });

  it.skip('should estimate transaction fee', function (done) {
    apiClient.transactions.estimateFee(testAddress, tokenValue, issuedToken)
      .success(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('fee');
        expect(response.fee).to.be.a('string');
        done();
      })
      .rest(err => {
        done(err?.data ?? err.message ?? err);
      });
  });

  if (!(RUN_ENV === 'remote' || !operatorAddress || !operatorPK || !testPK || !testAddress)) {
    // passed
    it.skip('should submit payment transaction', function (done) {
      apiClient.accounts.getNonce(testAddress)
        .success(async response => {
          const nonce = response.nonce;
          const payload = [
            chainId,
            nonce,
            testAddress,
            tokenValue,
            issuedToken
          ];
          const signature = await signMessage(payload, operatorPK)
          if (!signature) return done(new Error('Failed to sign message'));
          apiClient.transactions.payment({
            chain_id: chainId,
            nonce,
            recipient: testAddress,
            value: tokenValue,
            token: issuedToken,
            signature
          })
            .success(response => {
              expect(response).to.be.an('object');
              expect(response).to.have.property('hash');
              done();
            })
            .rest(err => {
              expect(err).to.be.an('object');
              expect(err).to.have.property('message');
              expect(err?.data?.message).to.include('insufficient funds');
              done(err?.data ?? err.message ?? err);
            });
        })
        .rest(err => done(err?.data ?? err.message ?? err));
    });

    // passed (the tx to be cancelled is not in pending pool)
    it.skip('should cancel transaction', function (done) {
      apiClient.accounts.getNonce(testAddress)
        .success(async response => {
          const nonce = response.nonce;
          const payload = [
            chainId,
            nonce,
          ];
          const signature = await signMessage(payload, operatorPK)
          if (!signature) return done(new Error('Failed to sign message'));
          apiClient.transactions.cancel({
            chain_id: chainId,
            nonce,
            signature
          })
            .success(response => {
              expect(response).to.be.an('object');
              done();
            })
            .rest(err => {
              done(err?.data ?? err.message ?? err);
            });
        })
        .rest(err => done(err?.data ?? err.message ?? err));
    });
  }
});

