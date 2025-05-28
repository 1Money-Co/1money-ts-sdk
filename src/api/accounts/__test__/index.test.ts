import 'mocha';
import { expect } from 'chai';
import puppeteer, { type Browser, type Page } from 'puppeteer';
import { accountsApi } from '../';
import { api } from '../../';

const RUN_ENV = process.env.RUN_ENV || 'local';

declare global {
  interface Window {
    getNonce: typeof accountsApi.getNonce;
    getTokenAccount: typeof accountsApi.getTokenAccount;
  }
}

describe('accounts API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  const apiClient = api({
    timeout: 3000,
    network: 'testnet',
  });

  let browser: Browser;
  let pageOne: Page, pageTwo: Page;

  if (RUN_ENV === 'local') {
    before(async () => {
      browser = await puppeteer.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      });
      await Promise.all([
        browser.newPage().then(page => {
          pageOne = page;
          return pageOne.exposeFunction('getNonce', apiClient.accounts.getNonce);
        }),
        browser.newPage().then(page => {
          pageTwo = page;
          return pageTwo.exposeFunction('getTokenAccount', apiClient.accounts.getTokenAccount);
        }),
      ]);
    });
  
    after(async () => {
      await browser.close();
    });
  }

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
  const testAddress = '0xa634dfba8c7550550817898bc4820cd10888aac5';
  const testToken = '0x5458747a0efb9ebeb8696fcac1479278c0872fbe';

  // Make real API calls to test the accounts API
  it('should fetch account nonce', function(done) {
    Promise.all([
      RUN_ENV === 'local' ? pageOne.evaluate(async (_address) => {
        const response = await window.getNonce(_address);
        return response;
      }, testAddress).then(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('nonce');
        expect(response.nonce).to.be.a('number');
      }) : Promise.resolve(),
      apiClient.accounts.getNonce(testAddress)
        .success(response => {
          expect(response).to.be.an('object');
          expect(response).to.have.property('nonce');
          expect(response.nonce).to.be.a('number');
        })
        .rest(err => {
          throw(err?.data ?? err.message ?? err);
        })
    ]).then(() => done()).catch(done);
  });

  it('should fetch associated token account', function(done) {
    Promise.all([
      RUN_ENV === 'local' ? pageTwo.evaluate(async (_address, _token) => {
        const response = await window.getTokenAccount(_address, _token);
        return response;
      }, testAddress, testToken).then(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('token_account_address');
        expect(response).to.have.property('balance');
        expect(response).to.have.property('nonce');
      }) : Promise.resolve(),
      apiClient.accounts.getTokenAccount(testAddress, testToken)
        .success(response => {
          expect(response).to.be.an('object');
          expect(response).to.have.property('token_account_address');
          expect(response).to.have.property('balance');
          expect(response).to.have.property('nonce');
        })
        .rest(err => {
          throw(err?.data ?? err.message ?? err);
        })
    ]).then(() => done()).catch(done);
  });
});
