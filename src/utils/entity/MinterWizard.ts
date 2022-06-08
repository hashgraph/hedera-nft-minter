import React from 'react';

export enum MintTypes {
  NewCollectionNewNFT = 'new_collection_new_NFT',
  ExistingCollectionNewNFT = 'existing_collection_new_NFT',
  ExistingCollectionExistingNFT = 'existing_collection_existing_NFT',
}

export type CreatorScreen = {
  creatorStep: number,
  Component: React.FC,
}

export type CreatorSteps = CreatorScreen[];

export interface WizardSteps {
  [MintTypes.NewCollectionNewNFT]: CreatorSteps,
  [MintTypes.ExistingCollectionNewNFT]: CreatorSteps,
  [MintTypes.ExistingCollectionExistingNFT]: CreatorSteps,
}
