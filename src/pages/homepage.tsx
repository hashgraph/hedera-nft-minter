import React from 'react';

import Hero from '@/components/shared/layout/Hero';
import PageMenu from '@/components/shared/layout/PageMenu';
import MinterWizard from '@/components/views/minter-wizard';

export default function Homepage() {

  return (
    <div className='minter-wizard'>
      <Hero
        darkSchema
        title={'Mint your NFTs on Hedera'}
      >
        <p>
          The fastest and simplest way to mint your NFTs and Collections.
          No smart contracts are needed.
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
