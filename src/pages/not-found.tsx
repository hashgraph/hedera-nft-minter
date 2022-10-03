import React from 'react'
import { Link } from 'react-router-dom'
import HederaLogoWide from '@assets/images/logo.svg'
import Scrollbar from '@/components/shared/layout/Scrollbar'

export default function NotFound() {
  return (
    <div className='dark-schema'>
      <div className='mc--h container--padding container--max-height bg--transparent'>
        <Scrollbar>
          <div className='not-found'>
            <p className='title'>
              404 Not found
            </p>
            <p className='title--small'>
              Sorry we cannot found page what you looking for.
            </p>
            <img src={HederaLogoWide} alt='hedera_banner' />
            <p className='title--small'>This page doesn't exist. Try another or go back to home page.</p>
            <Link to='/' >Back to home.</Link>
          </div>
        </Scrollbar>
      </div>
    </div>
  )
}
