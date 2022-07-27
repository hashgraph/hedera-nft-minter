import React, { useCallback, useEffect, useMemo, useState } from 'react';
import map from 'lodash/map';
import MirrorNode from '@/services/MirrorNode';
import renderValue from '@/utils/helpers/renderValue';
import { NFTTransactionHistory } from '@/utils/entity/NFTInfo';
import Loader from '@/components/shared/loader/Loader';
import CollapseList from '@/components/shared/collapse-list';

type TransactionHistoryProps = {
  collectionId: string;
  serialNumber: number | string;
}

export default function TransactionHistory({collectionId, serialNumber} : TransactionHistoryProps) {
  const [
    editionTransactionHistoryLoading,
    setEditionTransactionHistoryLoading,
  ] = useState(true);

  const [editionTransactionHistoryData, setEditionTransactionHistoryData] =
    useState<NFTTransactionHistory>({
      id: '',
      type: '',
      token_id: '',
    });

  const loadEditionTransactionHistory = useCallback( async (tokenId, editionNumber) => {
      const loadedEdition = await MirrorNode.fetchEditionTransactionHistory(
        tokenId,
        editionNumber
      );
      setEditionTransactionHistoryData({ ...loadedEdition });
      setEditionTransactionHistoryLoading(false);
  }, [setEditionTransactionHistoryLoading, setEditionTransactionHistoryData]);

  const hasAnyActivity = useMemo(() => (
    editionTransactionHistoryData?.transactions
    && editionTransactionHistoryData?.transactions.length > 0
  ), [editionTransactionHistoryData?.transactions])

  const editionTransactionHistoryTable = useMemo(() => (
      <div className='overview__transaction-history'>
        <p className='overview__transaction-history--header'>Event</p>
        <p className='overview__transaction-history--header'>Price</p>
        <p className='overview__transaction-history--header'>From</p>
        <p className='overview__transaction-history--header'>To</p>
        <p className='overview__transaction-history--header'>Date</p>
        {map(editionTransactionHistoryData.transactions, (el) => (
          <React.Fragment key={el.transaction_id}>
            <p>{renderValue(el.type)}</p>
            <p>???</p>
            <p>{renderValue(el.receiver_account_id)}</p>
            <p>{renderValue(el.sender_account_id)}</p>
            <p>{renderValue(el.consensus_timestamp)}</p>
          </React.Fragment>
        ))}
      </div>
  ), [editionTransactionHistoryData])

  const editionTransactionHistoryComponent = useMemo(() => (
    hasAnyActivity
      ? (
        editionTransactionHistoryTable
      ) : (
        <p>No item activity yet.</p>
  )), [hasAnyActivity, editionTransactionHistoryTable])


  const component = useMemo(() => (
    editionTransactionHistoryLoading
     ? (
      <Loader />
     ) : (
      editionTransactionHistoryComponent
  )), [editionTransactionHistoryLoading, editionTransactionHistoryComponent]);


  useEffect(() => {
    loadEditionTransactionHistory(collectionId, serialNumber)
  }, [ serialNumber, collectionId, loadEditionTransactionHistory])


  return (
    <CollapseList
      data={[
        {
          tab_title: 'Item activity',
          component,
        },
      ]}
    />
  );
}
