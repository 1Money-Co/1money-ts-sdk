import 'mocha';
import puppeteer, { type Browser, type Page } from 'puppeteer';
import { expect } from 'chai';
import { stateApi } from '../';
import { api } from '../../';

const RUN_ENV = process.env.RUN_ENV || 'local';

declare global {
  interface Window {
    getLatestEpochCheckpoint: typeof stateApi.getLatestEpochCheckpoint;
  }
}

describe('state API test', function () {
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
          pageOne.exposeFunction('getLatestEpochCheckpoint', apiClient.state.getLatestEpochCheckpoint),
        ])
      });
    });

    after(async () => {
      await browser.close();
    });
  }

  it('should have state API object', function () {
    expect(apiClient.state).to.be.an('object');
  });

  it('should have getLatestEpochCheckpoint method', function () {
    expect(apiClient.state.getLatestEpochCheckpoint).to.be.a('function');
  });

  it('should fetch latest epoch checkpoint', function (done) {
    apiClient.state.getLatestEpochCheckpoint()
      .success(response => {
        // Verify all fields from l1client EpochCheckpointResponse struct
        expect(response).to.be.an('object');
        expect(response).to.have.property('epoch');
        expect(response).to.have.property('checkpoint');
        expect(response).to.have.property('checkpoint_hash');
        expect(response).to.have.property('checkpoint_parent_hash');
        
        // Verify field types
        expect(response.epoch).to.be.a('number');
        expect(response.checkpoint).to.be.a('number');
        expect(response.checkpoint_hash).to.be.a('string');
        expect(response.checkpoint_parent_hash).to.be.a('string');
        
        // Verify hash format (should be 0x prefixed hex strings)
        expect(response.checkpoint_hash).to.match(/^0x[a-fA-F0-9]{64}$/);
        expect(response.checkpoint_parent_hash).to.match(/^0x[a-fA-F0-9]{64}$/);
        
        done();
      })
      .rest(err => {
        done(err?.data ?? err.message ?? err);
      });
  });

  if (!(RUN_ENV === 'remote')) {
    it('should fetch latest epoch checkpoint via puppeteer', function (done) {
      if (RUN_ENV !== 'local') return done();

      pageOne.evaluate(async () => {
        const response = await window.getLatestEpochCheckpoint();
        return response;
      }).then(response => {
        // Verify all fields from l1client EpochCheckpointResponse struct
        expect(response).to.be.an('object');
        expect(response).to.have.property('epoch');
        expect(response).to.have.property('checkpoint');
        expect(response).to.have.property('checkpoint_hash');
        expect(response).to.have.property('checkpoint_parent_hash');
        
        // Verify field types
        expect(response.epoch).to.be.a('number');
        expect(response.checkpoint).to.be.a('number');
        expect(response.checkpoint_hash).to.be.a('string');
        expect(response.checkpoint_parent_hash).to.be.a('string');
        
        // Verify hash format (should be 0x prefixed hex strings)
        expect(response.checkpoint_hash).to.match(/^0x[a-fA-F0-9]{64}$/);
        expect(response.checkpoint_parent_hash).to.match(/^0x[a-fA-F0-9]{64}$/);
        
        done();
      }).catch(done);
    });
  }
});