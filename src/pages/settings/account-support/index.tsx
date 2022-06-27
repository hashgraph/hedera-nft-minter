import CollapseList from '@/components/shared/collapse-list';
import React from 'react';
import { Link } from 'react-router-dom';

export default function AccountSupport() {
  return (
    <div className='settings__page settings__page--account-support'>
      <h2>
        Account support
      </h2>
      <p>Need help with your HederaMarketplace Account? Our HederaMarketplace Account Support articles will resolve most of your customer service needs.</p>
      <CollapseList
        data={[
          {
            tab_title: 'General help',
            component: (
              <p>Visit our help center to learn how to get started with buying, selling, and creating.</p>
            )
          },
          {
            tab_title: 'Contact HederaMarketplace Support',
            component: (
              <p>
                Can't find the answers you’re looking for? <br />
                You can <Link to='/'>submit a request</Link> here.
              </p>
            )
          },
        ]}
      />
    </div>
  )
}
