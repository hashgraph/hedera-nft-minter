declare const HEDERA_NETWORK: string;
declare const HEDERA_MIRROR_NODE_API_VERSION: string;
declare const IPFS_KEY: string;
declare const IPFS_URL: string;
declare const API_HOST: string;
// eslint-disable-next-line no-underscore-dangle
const _HEDERA_NETWORK = HEDERA_NETWORK;
// eslint-disable-next-line no-underscore-dangle
const _HEDERA_MIRROR_NODE_API_VERSION = HEDERA_MIRROR_NODE_API_VERSION;
// eslint-disable-next-line no-underscore-dangle
const _IPFS_KEY = IPFS_KEY;
// eslint-disable-next-line no-underscore-dangle
const _IPFS_URL = IPFS_URL;
// eslint-disable-next-line no-underscore-dangle
const _API_HOST = API_HOST;

export {
  _HEDERA_NETWORK as HEDERA_NETWORK,
  _HEDERA_MIRROR_NODE_API_VERSION as HEDERA_MIRROR_NODE_API_VERSION,
  _IPFS_KEY as IPFS_KEY,
  _IPFS_URL as IPFS_URL,
  _API_HOST as API_HOST,
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
