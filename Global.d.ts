declare const IPFS_KEY: string;
declare const IPFS_URL: string;
// eslint-disable-next-line no-underscore-dangle
const _IPFS_KEY = IPFS_KEY;
// eslint-disable-next-line no-underscore-dangle
const _IPFS_URL = IPFS_URL;

export {
  _IPFS_KEY as IPFS_KEY,
  _IPFS_URL as IPFS_URL,
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
