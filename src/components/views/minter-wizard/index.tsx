import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { TokenId } from '@hashgraph/sdk';

import HTS, { NewTokenType } from '@/services/HTS';
import IPFS, { UploadRespone } from '@/services/IPFS';
import useHederaWallets from '@/utils/hooks/useHederaWallets';
import filterFormValuesToNFTMetadata from '@/utils/helpers/filterFormValuesToNFTMetadata';
import { initialValues } from '@/utils/const/minter-wizard';
import { MintTypes } from '@utils/entity/MinterWizard'

import { ValidationSchema } from '@components/views/minter-wizard/validation-schema';
import MinterWizardForm from '@/components/views/minter-wizard/MinterWizardForm';
import Summary from '@/components/views/minter-wizard/Summary';

export default function MinterWizard() {
  const { userWalletId, sendTransaction } = useHederaWallets();
  const [tokenCreated, setTokenCreated] = useState(false);
  const [tokenId, setTokenId] = useState('');

  const uploadNFTFile = useCallback(async (file) => {
    const { data } = await IPFS.uploadFile(file);
    return data;
  }, []);

  const uploadMetadata = useCallback(async (metadata) => {
    const { data } = await IPFS.createMetadataFile(metadata);
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

  const handleFormSubmit = useCallback(async (values) => {
    const formValues = values
    const tokenSymbol = formValues.symbol;
    delete formValues.symbol;
    let formTokenId = formValues?.token_id
    let metaCIDs = [] as UploadRespone[]

    try {
      if (!userWalletId) {
        throw new Error('First connect your wallet');
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
          filteredValues.image = imageData.value.cid;
        }

        // if new NFT, upload metadata
        metaCIDs = await Promise.all(
          Array.from(new Array(parseInt(formValues.qty))).map(() =>
            uploadMetadata(filteredValues)
          )
        );
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
          keys: formValues.keys,
          customFees: formValues.fees,
          maxSupply: formValues.maxSupply
        } as NewTokenType);
      }

      if (!formTokenId) {
        throw new Error('Error! Problem with creating token!');
      }

      //check if is string
      const tokenIdToMint = formTokenId.toString();
      setTokenId(tokenIdToMint);

      // mint
      const mintRes = await mint(
        tokenIdToMint,
        metaCIDs.map(({ value }) => value.cid)
      );

      // eslint-disable-next-line no-console
      console.log({ mintRes });

      setTokenCreated(true);
    } catch (e) {
      if (typeof e === 'string') {
        toast.error(e);
      } else if (e instanceof Error) {
        switch (e.message) {
          case 'illegal buffer':
            toast.error('User has aborted operation.')
            break;
          default:
            toast.error(e.message);
            break;
        }

      }
    }
  }, [
    createToken,
    mint,
    uploadMetadata,
    uploadNFTFile,
    userWalletId,
  ]);


  return tokenCreated ? (
    <Summary tokenId={tokenId} />
  ) : (
    <div className='dark-schema'>
      <div className='container'>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          component={MinterWizardForm}
          validationSchema={ValidationSchema}
        />
      </div>
    </div>
  )
}
