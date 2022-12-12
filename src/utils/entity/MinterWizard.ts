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

import React from 'react';

export enum MintTypes {
  NewCollectionNewNFT = 'new_collection_new_NFT',
  ExistingCollectionNewNFT = 'existing_collection_new_NFT',
}

export type CreatorStep = number;

export type CreatorScreen = {
  creatorStep: number,
  Component: React.FC,
  fieldsForValidation?: string[],
  requireConnectedWallet?: boolean,
}

export type CreatorSteps = CreatorScreen[];

export interface WizardSteps {
  [MintTypes.NewCollectionNewNFT]: CreatorSteps,
  [MintTypes.ExistingCollectionNewNFT]: CreatorSteps,
}
