import classNames from 'classnames'
import map from 'lodash/map'
import React from 'react'
import floatingNfts from '@utils/const/floating-nfts'
import './floating-collections.scss'

type FloatingCollectionsProps = {
  isVisible: boolean;
}

export default function FloatingCollections({isVisible} : FloatingCollectionsProps) {

  const cardClassName = classNames('floating-collections__card', {
    'floating-collections__card--is-visible': isVisible
  })

  return (
    <>
      <div className='floating-collections container--max-width'>
        <div className='floating-collections__container'>
          {map(floatingNfts, (card, index) => (
            <div className={cardClassName} key={`floating-collections__card.${ index }`}>
              <div className='floating-collections__card__image'>

                <img src={card.src} alt={`floating-collections__card__image.${ index }`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
