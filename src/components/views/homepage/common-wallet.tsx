import React from 'react';
import { HashConnectContext } from '@utils/context/HashConnectContext';
import useHashConnect from '@utils/hooks/useHashConnect';
import { LOCALSTORAGE_VARIABLE_NAME } from '@utils/consts/hashconnect-consts';

const CommonWallet = () => {
  const { saveData, installedExtensions, connect, clearPairings } =
    useHashConnect(HashConnectContext);
  return (
    <>
      {installedExtensions && installedExtensions?.length > 0 && (
        <div>
          <p>Topic: {saveData?.topic}</p>
          <p>PairingKey:</p>
          <div
            style={{
              marginTop: -16,
              maxWidth: '400px',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <code>{saveData?.pairingString}</code>
          </div>
          <p>
            {saveData?.accountIds && saveData?.accountIds?.length > 0
              ? 'Paired hedera accounts'
              : 'Connect to wallet first'}
          </p>
          <ul>
            {saveData?.accountIds?.map((e: string) => (
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
              localStorage.getItem(LOCALSTORAGE_VARIABLE_NAME) as string
            ),
          })
        }
      >
        Show localstorage data
      </button>
      <button
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log({ saveData, installedExtensions });
        }}
      >
        Show saveData
      </button>
      <button
        disabled={typeof saveData?.topic === 'undefined'}
        onClick={connect}
      >
        Connect to wallet
      </button>
      <button
        disabled={saveData?.accountIds && saveData?.accountIds?.length < 0}
        onClick={clearPairings}
      >
        Clear pairings {saveData?.accountIds?.length ?? 'NIE MA'}
      </button>
    </>
  );
};

export default CommonWallet;
