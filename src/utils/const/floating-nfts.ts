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

import first from '@assets/images/nfts/1.jpeg'
import second from '@assets/images/nfts/2.png'
import third from '@assets/images/nfts/3.jpeg'
import fourth from '@assets/images/nfts/4.jpeg'
import fifth from '@assets/images/nfts/5.png'
import sixth from '@assets/images/nfts/6.jpeg'
import seventh from '@assets/images/nfts/7.png'
import eighths from '@assets/images/nfts/8.jpg'
import ninth from '@assets/images/nfts/9.png'
import tenth from '@assets/images/nfts/10.png'
import eleventh from '@assets/images/nfts/11.png'
import twelfth from '@assets/images/nfts/12.jpeg'
import thirteenth from '@assets/images/nfts/13.png'
import fourteenth from '@assets/images/nfts/14.jpeg'
import fifteenth from '@assets/images/nfts/15.jpeg'
import sixteenth from '@assets/images/nfts/16.png'
import seventeenth from '@assets/images/nfts/17.png'
import eighteenth from '@assets/images/nfts/18.png'
import nineteenth from '@assets/images/nfts/19.png'
import twentieth from '@assets/images/nfts/20.png'

export type CardRowProps = {
  src: string;
  collectionId: string;
  editionNumber: number;
}

export default [
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: first,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: second,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: third,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: fourth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: fifth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: sixth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: seventh,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: eighths,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: ninth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: tenth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: eleventh,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: twelfth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: thirteenth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: fourteenth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: fifteenth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: sixteenth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: seventeenth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: eighteenth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: nineteenth,
  },
  {
    editionNumber: 1,
    tokenId: '0.0.1',
    src: twentieth,
  },
] as CardRowProps[]
