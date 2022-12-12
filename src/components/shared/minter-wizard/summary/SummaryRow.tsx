/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */


import { useMemo } from 'react';
import renderValue from '@utils/helpers/renderValue';
import classNames from 'classnames';

export type SummaryRowProps = {
  fieldValue: string,
  title: string,
  className?: string,
}

export default function SummaryRow({ fieldValue, title, className }: SummaryRowProps) {

  const summaryRowClassName = useMemo(() => (
    classNames('minter-wizard__summary__row', className)
  ), [className])

  return (
    <div className={summaryRowClassName}>
      <p>{renderValue(title)}</p>

      <span>{renderValue(fieldValue)}</span>
    </div>
  )
}
