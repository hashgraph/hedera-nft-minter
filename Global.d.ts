declare const BASE_URL: string;
declare const AUTH_BASIC: string;
declare const S3_URL: string;
// eslint-disable-next-line no-underscore-dangle
const _BASE_URL = BASE_URL;
// eslint-disable-next-line no-underscore-dangle
const _AUTH_BASIC = AUTH_BASIC;
// eslint-disable-next-line no-underscore-dangle
const _S3_URL = S3_URL;

export {
  _BASE_URL as BASE_URL,
  _AUTH_BASIC as AUTH_BASIC,
  _S3_URL as S3_URL,
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
