/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

import { AnyObject, Maybe, Optionals } from 'yup/lib/types';
import { ObjectShape, TypeOfShape, AssertsShape } from 'yup/lib/object';

declare const APP_NAME: string;
declare const HEDERA_NETWORK: 'testnet' | 'mainnet';
declare const HEDERA_MIRROR_NODE_API_VERSION: string;
declare const PINATA_API_URL: string;
declare const PINATA_JWT_KEYS: string;
declare const API_HOST: string;
declare const WALLET_CONFIG_NAME: string;
declare const WALLET_CONFIG_DESCRIPTION: string;
declare const WALLET_CONFIG_URL: string;
declare const WALLET_CONFIG_ICON_URL: string;
declare const IPFS_GATEWAYS: string[] | undefined;

// eslint-disable-next-line no-underscore-dangle
const _APP_NAME = APP_NAME;
// eslint-disable-next-line no-underscore-dangle
const _HEDERA_NETWORK = HEDERA_NETWORK;
// eslint-disable-next-line no-underscore-dangle
const _HEDERA_MIRROR_NODE_API_VERSION = HEDERA_MIRROR_NODE_API_VERSION;
// eslint-disable-next-line no-underscore-dangle
const _PINATA_API_URL = PINATA_API_URL;
// eslint-disable-next-line no-underscore-dangle
const _PINATA_JWT_KEYS = PINATA_JWT_KEYS;
// eslint-disable-next-line no-underscore-dangle
const _API_HOST = API_HOST;
// eslint-disable-next-line no-underscore-dangle
const _WALLET_CONFIG_NAME = WALLET_CONFIG_NAME;
// eslint-disable-next-line no-underscore-dangle
const _WALLET_CONFIG_DESCRIPTION = WALLET_CONFIG_DESCRIPTION;
// eslint-disable-next-line no-underscore-dangle
const _WALLET_CONFIG_ICON_URL = WALLET_CONFIG_ICON_URL;
// eslint-disable-next-line no-underscore-dangle
const _WALLET_CONFIG_URL = WALLET_CONFIG_URL;
// eslint-disable-next-line no-underscore-dangle
const _IPFS_GATEWAYS = IPFS_GATEWAYS;

export {
  _APP_NAME as APP_NAME,
  _HEDERA_NETWORK as HEDERA_NETWORK,
  _HEDERA_MIRROR_NODE_API_VERSION as HEDERA_MIRROR_NODE_API_VERSION,
  _PINATA_API_URL as PINATA_API_URL,
  _PINATA_JWT_KEYS as PINATA_JWT_KEYS,
  _API_HOST as API_HOST,
  _WALLET_CONFIG_NAME as WALLET_CONFIG_NAME,
  _WALLET_CONFIG_DESCRIPTION as WALLET_CONFIG_DESCRIPTION,
  _WALLET_CONFIG_URL as WALLET_CONFIG_URL,
  _WALLET_CONFIG_ICON_URL as WALLET_CONFIG_ICON_URL,
  _IPFS_GATEWAYS as IPFS_GATEWAYS,
};

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module 'yup' {
  interface ObjectSchema<
    TShape extends ObjectShape,
    TContext extends AnyObject = AnyObject,
    TIn extends Maybe<TypeOfShape<TShape>> = TypeOfShape<TShape>,
    TOut extends Maybe<AssertsShape<TShape>> =
      | AssertsShape<TShape>
      | Optionals<TIn>
  > {
    unique(message: string, arrayValueKey: string): ObjectSchema<TShape, TContext, TIn, TOut>;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PINATA_JWT_KEYS: string[];
      PINATA_API_URL: string;
      HEDERA_NETWORK: string;
      HEDERA_MIRROR_NODE_API_VERSION: string;
    }
  }
}
