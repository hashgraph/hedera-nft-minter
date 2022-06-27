import './nft.scss';

export default function NFT() {
  return (
    <div className='nft'>
      <figure>
        <div className='nft__image'>
          <img src='' alt='' />
        </div>
        <figcaption>
          <h5>lorem ipsum</h5>
          <p className='price'>
            Price:
            <span>0.31</span>
          </p>

          <p className='last'>last 0.5</p>
        </figcaption>
      </figure>


    </div>
  )
}
