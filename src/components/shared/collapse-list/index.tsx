import React from 'react'
import { JSX } from '@babel/types';
import map from 'lodash/map';
import Collapse from '@components/shared/collapse'
import './collapse-list.scss'

type Props = {
  data: {
    component: JSX.Element | string,
    tab_title: string
  }[]
}

export default function CollapseList({data} : Props) {
  return (
    <div className='collapse-list'>
      {map(data, el =>
        <Collapse title={el.tab_title}>{el.component}</Collapse>
      )}
    </div>
  )
}
