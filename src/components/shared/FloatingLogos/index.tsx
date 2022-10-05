import classNames from 'classnames'
import map from 'lodash/map'
import keys from 'lodash/keys'
import React from 'react'
import { CSSTransition } from 'react-transition-group'
import HederaLogoBlack from '@assets/images/floating-logos/hedera-hbar-logo-black.png'
import HederaLogoWhite from '@assets/images/floating-logos/circle-logo-hedera.webp'
import './floating-logos.scss'

type FloatingLogosProps = {
  isVisible: boolean;
}

export default function FloatingLogos({isVisible} : FloatingLogosProps) {

  const cardClassName = classNames('floating-logos__card', {
    'floating-logos__card--is-visible': isVisible
  })

  return (
    <>
      <CSSTransition
        in={isVisible}
        classNames='floating-logos--fade'
        timeout={1000}
      >
        <div className='floating-logos container--max-width'>
          <div className='floating-logos__container'>
            {map(keys([...new Array(25)]), (index) => (
              <div className={cardClassName} key={`floating-logos__card.${ index }`}>
                <div className='floating-logos__card__image'>
                  <img
                    src={parseInt(index) % 2 === 0 ? HederaLogoBlack : HederaLogoWhite}
                    alt={`floating-logos__card__image.${ index }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}
