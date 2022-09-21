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
}

export type CreatorSteps = CreatorScreen[];

export interface WizardSteps {
  [MintTypes.NewCollectionNewNFT]: CreatorSteps,
  [MintTypes.ExistingCollectionNewNFT]: CreatorSteps,
}
