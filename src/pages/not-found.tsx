import Hero from '@/components/shared/layout/Hero'
import React from 'react'
import { Link } from 'react-router-dom'
import HederaBanner from '@assets/images/Hedera™_Logo_Lockup_BLACK.png'

export default function NotFound() {
  return (
    <div className='not-found'>
      <Hero darkSchema title='404 Not found'>
        Sorry we cannot found page what you looking for.
      </Hero>
      <div className='not-found__container'>
        <img src={HederaBanner} alt='hedera_banner' />
        <h2>This page doesn't exist. Try another or go back to home page.</h2>
        <Link to='/' className='btn btn--big'>Back to home.</Link>
      </div>
    </div>
  )
}
