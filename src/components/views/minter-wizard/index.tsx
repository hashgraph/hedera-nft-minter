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
import MinterWizardForm from '@/components/views/minter-wizard/minter-wizard-form';
import Summary from '@/components/views/minter-wizard/summary';

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
  },
    [sendTransaction]
  );

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
  },
    [userWalletId, sendTransaction]
  );

  const handleFormSubmit = useCallback(async (values) => {
    const tokenSymbol = values.symbol;
    delete values.symbol;
    let formTokenId = values?.token_id
    let metaCIDs = [] as UploadRespone[]

    try {
      if (!userWalletId) {
        throw new Error('First connect your wallet');
      }

      if (values.mint_type === MintTypes.ExistingCollectionExistingNFT) {
        //TODO check if metaCIDs was already copied in wizard (only if minting SEMI-NFT)
      }

      if (
        values.mint_type === MintTypes.NewCollectionNewNFT
        || values.mint_type === MintTypes.ExistingCollectionNewNFT
      ) {
        const filteredValues = filterFormValuesToNFTMetadata(values);

        //upload image
        if (values.image) {
          const imageData = await uploadNFTFile(values.image);
          if (!imageData.ok) {
            throw new Error('Error when uploading NFT File!');
          }
          filteredValues.type = values.image.type;
          filteredValues.image = imageData.value.cid;
        }

        // if new NFT, upload metadata
        metaCIDs = await Promise.all(
          Array.from(new Array(parseInt(values.qty))).map(() =>
            uploadMetadata(filteredValues)
          )
        );
      } else {
        // if semi-NFT, use metadata from formik values
        metaCIDs = await Promise.all(
          Array.from(new Array(parseInt(values.qty))).map(() =>
            IPFS.createMetadataFile(values.serial_metadata)
              .then(res => res.data)
          )
        );
      }

      //check if token_id is from form values
      if (formTokenId) {
        //TODO check, if collection exist, maxSupply > supply, had admin/supply key
        //     same as already logged account
        //     MirrorNode.canBeTokenMinted(tokenId)
      } else {
        formTokenId = await createToken({
          tokenSymbol,
          accountId: userWalletId,
          tokenName: values.name,
          amount: values.qty,
          keys: values.keys,
          customFees: values.fees,
          maxSupply: values.maxSupply
        } as NewTokenType);

        if (!formTokenId) {
          throw new Error('Error! Problem with creating token!');
        }
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
        toast.error(e.message);
      }
    }
  },
    [
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