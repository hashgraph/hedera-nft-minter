import { AnyObject, Maybe, Optionals } from 'yup/lib/types';
import { ObjectShape, TypeOfShape, AssertsShape } from 'yup/lib/object';

declare const HEDERA_NETWORK: string;
declare const HEDERA_MIRROR_NODE_API_VERSION: string;
declare const IPFS_KEYS: string;
declare const IPFS_URL: string;
declare const API_HOST: string;
// eslint-disable-next-line no-underscore-dangle
const _HEDERA_NETWORK = HEDERA_NETWORK;
// eslint-disable-next-line no-underscore-dangle
const _HEDERA_MIRROR_NODE_API_VERSION = HEDERA_MIRROR_NODE_API_VERSION;
// eslint-disable-next-line no-underscore-dangle
const _IPFS_KEYS = IPFS_KEYS;
// eslint-disable-next-line no-underscore-dangle
const _IPFS_URL = IPFS_URL;
// eslint-disable-next-line no-underscore-dangle
const _API_HOST = API_HOST;

export {
  _HEDERA_NETWORK as HEDERA_NETWORK,
  _HEDERA_MIRROR_NODE_API_VERSION as HEDERA_MIRROR_NODE_API_VERSION,
  _IPFS_KEYS as IPFS_KEYS,
  _IPFS_URL as IPFS_URL,
  _API_HOST as API_HOST,
}

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
