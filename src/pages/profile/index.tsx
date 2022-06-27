import React from 'react';
import Hero from '@layout/Hero';
import Avatar from '@components/shared/avatar';

import Collected from '@components/views/profile/collected';
import Tabs, { TabItem } from '@components/shared/tabs';

const profileTabs: TabItem[] = [
  { label: 'Collected', slug: 'collected', component: Collected},
  { label: 'Created', slug: 'created', component: Collected},
  { label: 'Favorite', slug: 'favorite', component: Collected},
  { label: 'Hidden', slug: 'hidden', component: Collected},
]

export default function Profile() {
  return (
    <div className='dark-schema'>
      <Hero profile />

      <div className='container'>
        <div className='profile__details'>
          <div className='profile__details__account'>
            <Avatar />
            <div>
              <h2>0.0.12345689</h2>
              <small>Joined May 2022</small>
            </div>
          </div>

          <div>
            <button>test</button>
          </div>
        </div>
      </div>

      <div>
        <Tabs tabs={profileTabs} />
      </div>

    </div>
  )
}
