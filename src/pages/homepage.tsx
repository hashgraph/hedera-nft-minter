import React, { useCallback, useState } from 'react';
import { Formik, FormikValues } from 'formik';
import { toast } from 'react-toastify';
import { TokenId } from '@hashgraph/sdk';

import HTS, { NewTokenType } from '@/services/HTS';
import IPFS, { UploadRespone } from '@/services/IPFS';
import useHederaWallets from '@/utils/hooks/useHederaWallets';
import filterFormValuesToNFTMetadata from '@/utils/helpers/filterFormValuesToNFTMetadata';
import { initialValues } from '@/utils/const/minter-wizard';
import { MintTypes } from '@utils/entity/MinterWizard'

import { ValidationSchema } from '@components/views/minter-wizard/validation-schema';
import MinterWizardForm from '@/components/views/minter-wizard';
import Summary from '@/components/views/minter-wizard/Summary';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';

const META_KEYS = [
  'name',
  'creator',
  'creatorDID',
  'description',
  'image',
  'type',
  'format',
  'attributes',
  'properties',
  'files',
  'localization',
];

export default function MinterWizard() {
  const { userWalletId, sendTransaction } = useHederaWallets();
  const [tokenCreated, setTokenCreated] = useState(false);
  const [mintedNFTData, setNewNFTdata] = useState<FormikValues>({});

  const uploadNFTFile = useCallback(async (file) => {
    const { data } = await IPFS.uploadFile(file);

    return data;
  }, []);

  const uploadMetadata = useCallback(async (metadata) => {
    const orderedMetadata: {[key: string]: any} = {};

    for (const key of META_KEYS) {
      if (metadata[key]) {
        orderedMetadata[key] = metadata[key];
      }
    }

    const { data } = await IPFS.createMetadataFile(orderedMetadata as NFTMetadata);

    return data;
  }, []);

  const createToken = useCallback(async (values: NewTokenType): Promise<TokenId | null> => {
    const createTokenTx = await HTS.createToken(values);
    const createTokenResponse = await sendTransaction(createTokenTx, true);

    if (!createTokenResponse) {
      throw new Error('Create Token Error.');
    }

    return createTokenResponse.tokenId;
  }, [sendTransaction]);

  const mint = useCallback(async (tokenId: string, cids: string[]) => {
    if (!userWalletId) {
      throw new Error('Error with loading logged account data!');
    }
    const tokenMintTx = HTS.mintToken(tokenId, userWalletId, cids);

    const tokenMintResponse = await sendTransaction(tokenMintTx);

    if (!tokenMintResponse) {
      throw new Error('Token mint failed.');
    }

    return tokenMintResponse;
  }, [userWalletId, sendTransaction]);

  const renderMintingError = useCallback((e) => {
    if (typeof e === 'string') {
      toast.error(e);
    } else if (e instanceof Error) {
      if (e.message.includes('illegal buffer')) {
        toast.error('Transaction aborted in wallet.')
      }
      if (e.message.includes('INSUFFICIENT_PAYER_BALANCE')) {
        toast.error('No available balance to finish operation.')
      }
      else {
        toast.error(e.message)
      }
    }
  }, [])

  const handleFormSubmit = useCallback(async (values) => {
    const formValues : FormikValues = {...values}
    const tokenSymbol = formValues.symbol;

    delete formValues.symbol;
    let formTokenId = formValues?.token_id
    let metaCIDs : UploadRespone[] = []

    try {
      if (!userWalletId) {
        throw new Error('First connect your wallet!');
      }

      if (
        formValues.mint_type === MintTypes.NewCollectionNewNFT
        || formValues.mint_type === MintTypes.ExistingCollectionNewNFT
      ) {
        const filteredValues = filterFormValuesToNFTMetadata(formValues);

        //upload image
        if (formValues.image) {
          const imageData = await uploadNFTFile(formValues.image);

          if (!imageData.ok) {
            throw new Error('Error when uploading NFT File!');
          }
          filteredValues.type = formValues.image.type;
          filteredValues.image = `ipfs://${ imageData.value.cid }`;
        }

        // upload metadata
        const uploadedMetadata = await uploadMetadata(filteredValues)

        // copy uploaded metadata CID to have same length as minting NFT qty
        metaCIDs = Array.from(new Array(parseInt(formValues.qty))).map(() =>
          uploadedMetadata
        )
      } else {
        // if semi-NFT, use metadata from formik formValues
        metaCIDs = await Promise.all(
          Array.from(new Array(parseInt(formValues.qty))).map(() =>
            IPFS.createMetadataFile(formValues.serial_metadata)
              .then(res => res.data)
          )
        );
      }

      if (!formTokenId) {
        formTokenId = await createToken({
          tokenSymbol,
          accountId: userWalletId,
          tokenName: formValues.name,
          amount: formValues.qty,
          keys: [...formValues.keys, ...formValues.treasuryAccountId],
          customFees: formValues.fees,
          maxSupply: formValues.maxSupply
        } as NewTokenType);
      }

      if (!formTokenId) {
        throw new Error('Error! Problem with creating token!');
      }

      //check if is string
      const tokenIdToMint = formTokenId.toString();

      // mint
      const mintRes = await mint(
        tokenIdToMint,
        metaCIDs.map(({ value }) => value.cid)
      );

      // eslint-disable-next-line no-console
      console.log({ mintRes });

      setNewNFTdata({...formValues, tokenId: tokenIdToMint})
      setTokenCreated(true);
    } catch (e) {
      renderMintingError(e)
    }
  }, [createToken, mint, renderMintingError, uploadMetadata, uploadNFTFile, userWalletId]);

  return (
    <div className='mc--h container--padding container--max-height bg--transparent'>
      <SwitchTransition>
        <CSSTransition
          key={tokenCreated ? 'created' : 'creating'}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
          classNames='fade'
        >
          {tokenCreated ? (
              <Summary mintedNFTData={mintedNFTData} />
            ) : (
              <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                component={MinterWizardForm}
                validationSchema={ValidationSchema}
              />
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}
