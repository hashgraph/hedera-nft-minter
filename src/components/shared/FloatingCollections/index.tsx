import classNames from 'classnames'
import map from 'lodash/map'
import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
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
      <CSSTransition
        in={isVisible}
        classNames='floating-collections--fade'
        timeout={1000}
      >
        <div className='floating-collections'>
          {map(floatingNfts, (card, index) => (
            <div className={cardClassName} key={`floating-collections__card.${ index }`}>
              <div className='floating-collections__card__image'>

                <img src={card.src} alt={`floating-collections__card__image.${ index }`} />
              </div>
              {/* <Link to={`/nft-overview/${ card.tokenId }/${ card.editionNumber }`}  className='floating-collections__card__image'> */}
              {/* </Link> */}
            </div>
          ))}
        </div>
      </CSSTransition>
    </>
  )
}
