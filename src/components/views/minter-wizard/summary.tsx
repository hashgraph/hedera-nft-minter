import { HEDERA_NETWORK } from '@/../Global.d';

export default function Summary({ tokenId }: { tokenId: string }) {
  return (
    <div className='container'>
      <div className='homepage__token-created__container'>
        <h1>Token Created successfully</h1>
        <p>Your new NFT Token ID: <b>{tokenId}</b></p>
        <a
          href={`https://${ HEDERA_NETWORK === 'testnet' ? 'testnet' : 'app' }.dragonglass.me/hedera/tokens/${ tokenId }`}
          target='_blank'
        >
          Link to your token in <i>app.dragonglass.me</i>
        </a>
      </div>
    </div>
  )
}
