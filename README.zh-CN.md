# @1money/ts-sdk
The JS-SDK for @1money co

[![Build Status](https://github.com/1Money-Co/1money-ts-sdk/actions/workflows/cicd-npm.yml/badge.svg)](https://github.com/1Money-Co/1money-ts-sdk/actions/workflows/cicd-npm.yml)
[![NPM downloads](http://img.shields.io/npm/dm/%401money%2Fjs-sdk.svg?style=flat-square)](https://www.npmjs.com/package/@1money/ts-sdk)
[![npm version](https://badge.fury.io/js/%401money%2Fjs-sdk.svg)](https://badge.fury.io/js/%401money%2Fjs-sdk)
[![install size](https://packagephobia.now.sh/badge?p=%401money%2Fjs-sdk)](https://packagephobia.now.sh/result?p=%401money%2Fjs-sdk)
[![license](http://img.shields.io/npm/l/%401money%2Fjs-sdk.svg)](https://github.com/1money/tpls/blob/master/packages/js-sdk/LICENSE)

[English](./README.md) | 简体中文

[在线文档](https://1money-co.github.io/1money-ts-sdk/)

## 快速开始
### NPM
```shell
npm i -S @1money/ts-sdk
# 或者
yarn add @1money/ts-sdk
# 或者
pnpm i -S @1money/ts-sdk
```

```js
import { logger } from '@1money/ts-sdk';
```

### CDN
```html
<script src="https://unpkg.com/@1money/ts-sdk@0.1.0/umd/1money-ts-sdk.min.js"></script>
```

## 开发
对于调试或维护，可以将项目 clone 到本地，然后启动项目。

```shell
git clone --depth 1

pnpm install && pnpm dev
```

[更多详情](./DEV.zh-CN.md)
