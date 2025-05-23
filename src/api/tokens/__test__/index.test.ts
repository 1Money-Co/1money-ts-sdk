import 'mocha';
import { expect } from 'chai';
import { api } from '../../';
import { CHAIN_IDS } from '../../constants';
import { signMessage, toHex } from '../../../utils';
import { AuthorityAction, AuthorityType, PauseAction, ManageListAction } from '../types';
import 'dotenv/config';

import type { ZeroXString } from '../../../utils/sign';

const RUN_ENV = process.env.RUN_ENV || 'local';

describe('tokens API test', function () {
  // Set a longer timeout for all tests in this suite
  this.timeout(10000);

  const apiClient = api({
    timeout: 3000,
    network: 'testnet',
  });

  it('should have tokens API object', function () {
    expect(apiClient.tokens).to.be.an('object');
  });

  it('should have getTokenMetadata method', function () {
    expect(apiClient.tokens.getTokenMetadata).to.be.a('function');
  });

  it('should have setManageList method', function () {
    expect(apiClient.tokens.setManageList).to.be.a('function');
  });

  it('should have burnToken method', function () {
    expect(apiClient.tokens.burnToken).to.be.a('function');
  });

  it('should have grantAuthority method', function () {
    expect(apiClient.tokens.grantAuthority).to.be.a('function');
  });

  it('should have issueToken method', function () {
    expect(apiClient.tokens.issueToken).to.be.a('function');
  });

  it('should have mintToken method', function () {
    expect(apiClient.tokens.mintToken).to.be.a('function');
  });

  it('should have pauseToken method', function () {
    expect(apiClient.tokens.pauseToken).to.be.a('function');
  });

  it('should have updateMetadata method', function () {
    expect(apiClient.tokens.updateMetadata).to.be.a('function');
  });

  // Example token for testing - replace with a valid token if needed
  const chainId = CHAIN_IDS.TESTNET;
  const issuedToken = '0x8e9d1b45293e30ef38564582979195dd16a16e13';
  const operatorAddress = process.env.OPERATOR_ADDRESS;
  const operatorPK = process.env.OPERATOR_PRIVATE_KEY as ZeroXString;
  const testAddress = '0x179e3514e5afd76223d53c3d97117d66f217d087';

  // Skip actual API calls in regular tests
  it('should fetch token metadata', function (done) {
    apiClient.tokens.getTokenMetadata(issuedToken)
      .success(response => {
        expect(response).to.be.an('object');
        expect(response.symbol).to.be.a('string');
        expect(response.decimals).to.be.a('number');
        expect(response.supply).to.be.a('string');
        expect(response.is_paused).to.be.a('boolean');
        expect(response.is_private).to.be.a('boolean');
        expect(response.master_authority).to.be.a('string');
        expect(response.master_mint_authority).to.be.a('string');
        expect(response.pause_authority).to.be.a('string');
        expect(response.minter_burn_authorities).to.be.an('array');
        expect(response.list_authorities).to.be.an('array');
        expect(response.black_list).to.be.an('array');
        expect(response.white_list).to.be.an('array');
        expect(response.metadata_update_authority).to.be.an('string');
        done();
      })
      .rest(err => {
        done(err?.data ?? err.message ?? err);
      });
  });

  if (!(RUN_ENV === 'remote' || !operatorAddress || !operatorPK || !testAddress)) {
    // !todo
    it.skip('should set manage list', function (done) {
      apiClient.accounts.getNonce(operatorAddress)
        .success(async response => {
          const nonce = response.nonce;
          const action = ManageListAction.Whitelist;
          const payload = [
            toHex(chainId),
            toHex(nonce),
            toHex(action),
            testAddress,
            issuedToken,
          ]
          const signature = await signMessage(payload, operatorPK)
          if (!signature) return done(new Error('Failed to sign message'));
          apiClient.tokens.setManageList({
            chain_id: chainId,
            nonce,
            action,
            address: testAddress,
            token: issuedToken,
            signature
          })
            .success(response => {
              expect(response).to.be.an('object');
              done();
            })
            .rest(err => done(err?.data ?? err.message ?? err));
        })
        .rest(err => done(err?.data ?? err.message ?? err));
    });

    // passed
    it.skip('should burn token', function (done) {
      apiClient.accounts.getNonce(operatorAddress)
        .success(async response => {
          const nonce = response.nonce;
          const burnValue = '10';
          const payload = [
            toHex(chainId),
            toHex(nonce),
            testAddress,
            toHex(burnValue),
            issuedToken,
          ]
          const signature = await signMessage(payload, operatorPK)
          if (!signature) return done(new Error('Failed to sign message'));
          apiClient.tokens.burnToken({
            chain_id: chainId,
            nonce,
            recipient: testAddress,
            value: burnValue,
            token: issuedToken,
            signature
          })
            .success(response => {
              expect(response).to.be.an('object');
              expect(response.hash).to.be.a('string');
              done();
            })
            .rest(err => done(err?.data ?? err.message ?? err));
        })
        .rest(err => done(err?.data ?? err.message ?? err));
    });

    // passed
    it.skip('should grant authority', function (done) {
      if (RUN_ENV === 'remote' || !operatorAddress || !operatorPK || !testAddress) return done();

      apiClient.accounts.getNonce(operatorAddress)
        .success(async response => {
          const nonce = response.nonce;
          const tokenValue = '15000';
          const payload = [
            toHex(chainId),
            toHex(nonce),
            toHex(AuthorityAction.Grant),
            toHex(AuthorityType.MintBurnTokens),
            testAddress,
            issuedToken,
            toHex(tokenValue),
          ]
          const signature = await signMessage(payload, operatorPK)
          if (!signature) return done(new Error('Failed to sign message'));
          apiClient.tokens.grantAuthority({
            chain_id: chainId,
            nonce,
            action: AuthorityAction.Grant,
            authority_type: AuthorityType.MintBurnTokens,
            authority_address: testAddress,
            token: issuedToken,
            value: tokenValue,
            signature
          })
            .success(response => {
              expect(response).to.be.an('object');
              done();
            })
            .rest(err => done(err?.data ?? err.message ?? err));
        })
        .rest(err => done(err?.data ?? err.message ?? err));
    });

    // !todo
    it.skip('should issue token', function (done) {
      if (RUN_ENV === 'remote' || !operatorAddress || !operatorPK) return done();

      apiClient.accounts.getNonce(operatorAddress)
        .success(async response => {
          const nonce = response.nonce;
          const name = 'USD 1Money';
          const symbol = 'USD1';
          const decimals = 6;
          const isPrivate = false;
          const payload = [
            toHex(chainId),
            toHex(nonce),
            toHex(symbol),
            toHex(name),
            toHex(decimals),
            toHex(operatorAddress),
            toHex(isPrivate),
          ];
          const signature = await signMessage(payload, operatorPK)
          if (!signature) return done(new Error('Failed to sign message'));
          apiClient.tokens.issueToken({
            chain_id: chainId,
            nonce,
            symbol,
            name,
            decimals,
            master_authority: operatorAddress,
            is_private: isPrivate,
            signature,
          })
            .success(response => {
              console.info('result: ', response);
              expect(response).to.be.an('object');
              expect(response.token).to.be.a('string');
              done();
            })
            .rest(err => done(err?.data ?? err.message ?? err));
        })
        .rest(err => done(err?.data ?? err.message ?? err));
    });

    // passed
    it.skip('should mint token', function (done) {
      if (RUN_ENV === 'remote' || !operatorAddress || !operatorPK || !testAddress) return done();

      apiClient.accounts.getNonce(operatorAddress)
        .success(async response => {
          const nonce = response.nonce;
          const mintValue = '10000';
          const payload = [
            toHex(chainId),
            toHex(nonce),
            testAddress,
            toHex(mintValue),
            issuedToken,
          ];
          const signature = await signMessage(payload, operatorPK)
          if (!signature) return done(new Error('Failed to sign message'));
          apiClient.tokens.mintToken({
            chain_id: chainId,
            nonce,
            recipient: testAddress,
            value: mintValue,
            token: issuedToken,
            signature
          })
            .success(response => {
              expect(response).to.be.an('object');
              expect(response.hash).to.be.a('string');
              done();
            })
            .rest(err => done(err?.data ?? err.message ?? err));
        })
        .rest(err => done(err?.data ?? err.message ?? err));
    });

    // passed
    it.skip('should pause token', function (done) {
      if (RUN_ENV === 'remote' || !operatorAddress || !operatorPK) return done();

      apiClient.accounts.getNonce(operatorAddress)
        .success(async response => {
          const nonce = response.nonce;
          const action = PauseAction.Unpause;
          const payload = [
            toHex(chainId),
            toHex(nonce),
            toHex(action),
            issuedToken,
          ];
          const signature = await signMessage(payload, operatorPK);
          if (!signature) return done(new Error('Failed to sign message'));
          apiClient.tokens.pauseToken({
            chain_id: chainId,
            nonce,
            action,
            token: issuedToken,
            signature
          })
            .success(response => {
              expect(response).to.be.an('object');
              expect(response.hash).to.be.a('string');
              done();
            })
            .rest(err => done(err?.data ?? err.message ?? err));
        })
        .rest(err => done(err?.data ?? err.message ?? err));
    });

    // !todo
    it.skip('should update metadata', function (done) {
      if (RUN_ENV === 'remote' || !operatorAddress || !operatorPK) return done();

      apiClient.accounts.getNonce(operatorAddress)
        .success(async response => {
          const nonce = response.nonce;
          const name = 'USDC';
          const uri = 'https://usdc.com/metadata';
          const additional_metadata = [
            {
              key: 'test',
              value: 'test'
            }
          ];
          const payload = [
            toHex(chainId),
            toHex(nonce),
            toHex(name),
            toHex(uri),
            issuedToken,
            toHex(additional_metadata)
          ];
          const signature = await signMessage(payload, operatorPK)
          if (!signature) return done(new Error('Failed to sign message'));
          apiClient.tokens.updateMetadata({
            chain_id: chainId,
            nonce,
            name,
            uri,
            token: issuedToken,
            additional_metadata,
            signature
          })
            .success(response => {
              expect(response).to.be.an('object');
              expect(response.hash).to.be.a('string');
              done();
            })
            .rest(err => done(err?.data ?? err.message ?? err));
        })
        .rest(err => done(err?.data ?? err.message ?? err));
    });
  }
});
