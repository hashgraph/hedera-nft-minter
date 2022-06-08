import React from 'react';

import Hero from '@/components/shared/layout/Hero';
import PageMenu from '@/components/shared/layout/PageMenu';
import MinterWizard from '@/components/views/minter-wizard';

export default function Homepage() {

  return (
    <div className='minter-wizard'>
      <Hero title={'Mint your own NFT on Hedera'}>
        <p>
          Minting NFTs on Hedera is fast and simple. You can mint new NFTs and
          Collections without using smart contracts.
        </p>
        <a
          href='https://hedera.com/token-service'
          target={'_blank'}
          className='btn btn--invert'
        >
          HEDERA TOKEN SERVICE DOCUMENTATION
        </a>
      </Hero>
      <PageMenu />
      <div className='minter-wizard__container'>
        <MinterWizard />
      </div>
    </div>
  );
}
