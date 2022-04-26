import { saveDataType } from '@/utils/consts/hashconnect-connection-consts-types';
import { HashConnectTypes } from 'hashconnect';
import React from 'react';

type Props = {
  functions: {
    walletData: saveDataType;
    installedExtensions: HashConnectTypes.AppMetadata[];
    initializeHashConnect: () => void;
    connect: () => void;
    clearPairings: () => void;
  };
};

const CommonWallet = ({ functions }: Props) => {
  const {
    walletData,
    installedExtensions,
    initializeHashConnect,
    connect,
    clearPairings,
  } = functions;
  return (
    <>
      {installedExtensions && installedExtensions?.length > 0 && (
        <div>
          <p>Topic: {walletData?.topic}</p>
          <p>PairingKey:</p>
          <div
            style={{
              marginTop: -16,
              maxWidth: '400px',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <code>{walletData?.pairingString}</code>
          </div>
          <p>
            {walletData?.accountIds && walletData?.accountIds?.length > 0
              ? 'Paired hedera accounts'
              : 'Connect to wallet first'}
          </p>
          <ul>
            {walletData?.accountIds?.map((e: string) => (
              <li key={`wallet-accid-id-${ e }`}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <h4 style={{ margin: 0 }}>Common</h4>
      <button
        onClick={() =>
          // eslint-disable-next-line no-console
          console.log({
            localstorage: JSON.parse(
              localStorage.getItem('minerPocHashconnectData') as string
            ),
          })
        }
      >
        Show localstorage data
      </button>
      <button
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log({ walletData, installedExtensions });
        }}
      >
        Show WalletData
      </button>
      <button
        disabled={typeof walletData?.topic !== 'undefined'}
        onClick={async () => await initializeHashConnect()}
      >
        InitializeHashConnect
      </button>
      <button
        disabled={typeof walletData?.topic === 'undefined'}
        onClick={() => connect()}
      >
        Connect to wallet
      </button>
      <button
        disabled={walletData?.accountIds && walletData?.accountIds?.length < 0}
        onClick={() => clearPairings()}
      >
        Clear pairings {walletData?.accountIds?.length ?? 'NIE MA'}
      </button>
    </>
  );
};

export default CommonWallet;
