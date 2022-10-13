/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import Scrollbar from '@components/shared/layout/Scrollbar';

export default function TermsOfService() {
  return (
    <div className='mc--h container--padding container--max-height bg--transparent'>
      <Scrollbar>
        <div className='tos__wrapper'>
          <div className='tos__header'>
            <h1 className='title'>Terms Of Service</h1>
          </div>

          <div className='tos__content'>
            <p>
              Use of the Mintbar Application (“Mintbar”) is subject to the
              Terms of Service of IPFS.io.
            </p>

            <p>
              If you encounter content that violates the{' '}
              <a href='https://discuss.ipfs.io/tos' target='_blank'>
                Terms of Service of IPFS.io
              </a>
              (e.g., spam/phishing content or your unauthorized copyrighted
              content), please reach out to{' '}
              <a href='mail:abuse@ipfs.io'>abuse@ipfs.io</a>, making sure to
              include the relevant URL.
            </p>

            <p>
              If we determine that the content violates our Terms of Service
              we will remove or disable access to that content.
            </p>

            <p>
              If your complaint is copyright-related, please make sure your
              DMCA Notice contains the required information listed in our{' '}
              <a href='https://ipfs.io/legal/' target='_blank'>
                DMCA Policy
              </a>
              .
            </p>
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}
