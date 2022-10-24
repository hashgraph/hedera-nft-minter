/** @jest-environment jsdom */
import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import NFT from '@components/views/my-nft-collection/NFT';
import { TokenSupplyType } from '@utils/entity/TokenInfo';

describe('Footer', () => {
  it('render', () => {
    const props = {
      account_id: '0.0.123456',
      created_timestamp: '123123123.123123',
      deleted: false,
      metadata: '123123123123123',
      modified_timestamp: '123123123.123123',
      serial_number: 0,
      token_id: '0.0.123456',
      spender: null,
      collectionInfo: {
        admin_key: null,
        auto_renew_account: null,
        auto_renew_period: null,
        created_timestamp: '1660719957.665494003',
        decimals: 0,
        deleted: false,
        expiry_timestamp: '1660720991592000000',
        fee_schedule_key: null,
        freeze_default: false,
        freeze_key: null,
        initial_supply: '0',
        kyc_key: null,
        max_supply: '10',
        name: 'AVATAR',
        pause_key: null,
        pause_status: 'NOT_APPLICABLE',
        supply_key: { _type: 'ED25519', key: '3d9639fcb8137a17c0e0aba20a7fb5038f74269835ef32d3891415008e4db8d2' },
        supply_type: TokenSupplyType.FINITE,
        symbol: 'PM-AV',
        token_id: '0.0.47909758',
        total_supply: '4',
        treasury_account_id: '0.0.2661933',
        wipe_key: null
      }
    };

    render(
        <NFT {...props} />
    );
  });

});
