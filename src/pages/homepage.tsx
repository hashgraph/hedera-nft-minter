import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import NFTForm from '@components/views/homepage/nft-form';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import IPFS from '@/services/IPFS';
import HTS from '@/services/HTS';
import { toast } from 'react-toastify';
import useHederaWallets from '@hooks/useHederaWallets';
import {
  TransactionReceipt,
  TokenId,
  TransferTransaction,
  Hbar,
  AccountId,
  TransactionId,
} from '@hashgraph/sdk';
import { ValidationSchema } from '@components/views/homepage/nft-form-validation-schema';

type FormValues = NFTMetadata & { symbol?: string; qty: number };

type Property = {
  name: string;
  value: string;
};

type Parameters = {
  properties: Property[];
};

export default function Homepage() {
  const { userWalletId, sendTransaction, bladeSigner } = useHederaWallets();
  const [tokenCreated, setTokenCreated] = useState(false);
  const [tokenId, setTokenId] = useState('');
  const initialValues: FormValues = {
    name: '',
    symbol: '',
    creator: '',
    creatorDID: '',
    description: '',
    type: '',
    image: null,
    files: [],
    properties: [],
    qty: 1,
  };

  const filterParams = useCallback(
    (values) =>
      Object.keys(values).reduce<Record<string, Parameters | string>>(
        (params, paramName) => {
          if (
            (!Array.isArray(values[paramName]) && values[paramName]) ||
            (Array.isArray(values[paramName]) && values[paramName].length > 0)
          ) {
            params[paramName] = values[paramName];
          }

          return params;
        },
        {}
      ),
    []
  );

  const uploadNFTFile = useCallback(async (file) => {
    const { data } = await IPFS.uploadFile(file);
    return data;
  }, []);

  const uploadMetadata = useCallback(
    async (metadata, serial: number, hip: 'hip-10' | 'hip-214') => {
      if (hip === 'hip-214') {
        metadata = {
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          properties: metadata.properties,
        };
      }

      const { data } = await IPFS.createMetadataFile(metadata, serial);
      return data;
    },
    []
  );

  const createToken = useCallback(
    async (
      tokenName: string,
      tokenSymbol: string,
      accountId: string,
      amount: number
    ): Promise<TokenId | null> => {
      const token = await HTS.createToken(
        tokenName,
        tokenSymbol,
        accountId,
        amount
      );
      const res = await sendTransaction(token);

      if (!res) {
        throw new Error('Create Token Error.');
      }

      const receipt = TransactionReceipt.fromBytes(
        res.receipt as Uint8Array
      ) as TransactionReceipt;

      if (!receipt) {
        throw new Error('Get Transaction Receipt error');
      }

      if (!receipt.tokenId) {
        throw new Error('Get Token ID error');
      }

      return receipt.tokenId;
    },
    [sendTransaction]
  );

  const mint = useCallback(
    async (tokenId: string, cids: string[]) => {
      if (!userWalletId) {
        throw new Error('Error with loading logged account data!');
      }
      const txMint = HTS.mintToken(tokenId, userWalletId, cids);

      const mintResult = await sendTransaction(txMint, txMint.toBytes());

      if (!mintResult) {
        throw new Error('Token mint failed.');
      }

      return TransactionReceipt.fromBytes(mintResult.receipt as Uint8Array);
    },
    [userWalletId, sendTransaction]
  );

  const handleFormSubmit = useCallback(
    async (values) => {
      const hip = values.hip;
      delete values.hip;

      const filteredValues = filterParams(values);

      try {
        if (!values.image) {
          throw new Error('You need to select a file to upload');
        }
        if (!userWalletId) {
          throw new Error('First connect your wallet');
        }

        // upload image
        const imageData = await uploadNFTFile(values.image);
        // replace image with IMAGE_CID
        if (!imageData.ok) {
          throw new Error('Error when uploading NFT File!');
        }

        filteredValues.image = imageData.value.cid;

        // upload metadata
        const metaCIDs = await Promise.all(
          Array.from(new Array(values.qty)).map((_, i) =>
            uploadMetadata(filteredValues, i, hip)
          )
        );

        // create token
        const tokenId = await createToken(
          values.name,
          values.symbol,
          userWalletId,
          values.qty
        );

        if (!tokenId) {
          throw new Error('Error! Problem with creating token!');
        }

        //check if is string
        const tokenIdToMint = tokenId.toString();
        setTokenId(tokenIdToMint);

        // mint
        const mintRes = await mint(
          tokenIdToMint,
          metaCIDs.map(({ value }) => value.cid)
        );

        // eslint-disable-next-line no-console
        console.log({ mintRes });

        setTokenCreated(true);

        // mint token
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
      filterParams,
      mint,
      uploadMetadata,
      uploadNFTFile,
      userWalletId,
    ]
  );

  const accInfo = useCallback(async () => {
    if (!userWalletId) {
      throw new Error('No wallet id');
    }
    if (!bladeSigner) {
      throw new Error('No bladeSigner');
    }
    const info = await bladeSigner.getAccountInfo();
    // eslint-disable-next-line no-console
    console.log({ info });
  }, [userWalletId, bladeSigner]);

  const accId = useCallback(async () => {
    if (!userWalletId) {
      throw new Error('No wallet id');
    }
    if (!bladeSigner) {
      throw new Error('No bladeSigner');
    }
    const info = await bladeSigner.getAccountId();
    // eslint-disable-next-line no-console
    console.log({ info });
  }, [userWalletId, bladeSigner]);

  const signTrans = useCallback(async () => {
    if (!userWalletId) {
      throw new Error('No wallet id');
    }
    if (!bladeSigner) {
      throw new Error('No bladeSigner');
    }
    const tx = new TransferTransaction()
      .addHbarTransfer(userWalletId, new Hbar(-100))
      .addHbarTransfer('0.0.34115113', new Hbar(100));
    const transId = TransactionId.generate(userWalletId);
    tx.setTransactionId(transId);
    await tx.setNodeAccountIds([new AccountId(3)]);
    await tx.freeze();
    const info = await bladeSigner.signTransaction(tx);
    // eslint-disable-next-line no-console
    console.log({ info });
  }, [userWalletId, bladeSigner]);

  const checkTransaction = useCallback(async () => {
    if (!userWalletId) {
      throw new Error('No wallet id');
    }
    if (!bladeSigner) {
      throw new Error('No bladeSigner');
    }
    const tx = new TransferTransaction()
      .addHbarTransfer(userWalletId, new Hbar(-100))
      .addHbarTransfer('0.0.34115113', new Hbar(100));

    const transId = TransactionId.generate(userWalletId);
    tx.setTransactionId(transId);
    await tx.setNodeAccountIds([new AccountId(3)]);
    await tx.freeze();

    const info = await bladeSigner.checkTransaction(tx);
    // eslint-disable-next-line no-console
    console.log({ info });
  }, [userWalletId, bladeSigner]);

  const balance = useCallback(async () => {
    if (!userWalletId) {
      throw new Error('No wallet id');
    }
    if (!bladeSigner) {
      throw new Error('No bladeSigner');
    }

    const info = await bladeSigner.getAccountBalance();

    // eslint-disable-next-line no-console
    console.log({ info });
  }, [userWalletId, bladeSigner]);

  const getNetwork = useCallback(async () => {
    if (!userWalletId) {
      throw new Error('No wallet id');
    }
    if (!bladeSigner) {
      throw new Error('No bladeSigner');
    }

    const info = await bladeSigner.getNetwork();
    // eslint-disable-next-line no-console
    console.log({ info });
  }, [userWalletId, bladeSigner]);

  const populateTransaction = useCallback(async () => {
    if (!userWalletId) {
      throw new Error('No wallet id');
    }
    if (!bladeSigner) {
      throw new Error('No bladeSigner');
    }
    const tx = new TransferTransaction()
      .addHbarTransfer(userWalletId, new Hbar(-100))
      .addHbarTransfer('0.0.34115113', new Hbar(100));
    // const transId = TransactionId.generate(userWalletId);
    // tx.setTransactionId(transId);
    // await tx.setNodeAccountIds([new AccountId(3)]);
    // await tx.freeze();
    const req = await bladeSigner.populateTransaction(tx);

    // eslint-disable-next-line no-console
    console.log({ req });
  }, [userWalletId, bladeSigner]);

  const handleBladeTransaction = useCallback(async () => {
    if (!userWalletId) {
      throw new Error('No wallet id');
    }
    if (!bladeSigner) {
      throw new Error('No bladeSigner');
    }
    const tx = new TransferTransaction()
      .addHbarTransfer(userWalletId, new Hbar(-100))
      .addHbarTransfer('0.0.34115113', new Hbar(100));
    // const transId = TransactionId.generate(userWalletId);
    // tx.setTransactionId(transId);
    // await tx.setNodeAccountIds([new AccountId(3)]);
    // await tx.freeze();
    // const req = await bladeSigner.populateTransaction(tx);
    const info = await bladeSigner.sendRequest(tx);

    // eslint-disable-next-line no-console
    console.log({ info });
  }, [userWalletId, bladeSigner]);

  return (
    <div className='homepage'>
      <div className='hero'>
        <button onClick={accId}>Blade acc id</button>
        <button onClick={accInfo}>Blade acc info</button>
        <button onClick={getNetwork}>getNetwork</button>
        <button onClick={balance}>balance</button>
        <button onClick={checkTransaction}>checkTransaction</button>
        <button onClick={signTrans}>Sign trans</button>
        <button onClick={populateTransaction}>Populate trans</button>
        <button onClick={handleBladeTransaction}>Blade trans</button>
        <div>
          <p>Mint your own NFT at speed of light!</p>
        </div>
      </div>
      <div className='container'>
        {tokenCreated ? (
          <div>
            <h2>Token Created successfully</h2>
            <p>Your new NFT Token ID: {tokenId}</p>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            component={NFTForm}
            validationSchema={ValidationSchema}
          />
        )}
      </div>
    </div>
  );
}
