const formatToIPFSImageLink = (link: string) =>
  link.includes('https://')
    ? link
    : `https://ipfs.io/ipfs/${ link.replace('ipfs://', '') }`;

export default formatToIPFSImageLink
