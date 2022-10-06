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

import { ReactNode, useCallback } from 'react';

type Props = {
  title: string;
  noDescription?: boolean;
  description?: ReactNode;
};

const FormStep = ({
  title,
  noDescription = false,
  description = undefined,
}: Props) => {
  const defaultDescription = useCallback(
    () => (
      <>
        <span>Select an</span>
        <p>
          {title} <span>data</span>
        </p>
      </>
    ),
    [title]
  );

  const renderDescription = useCallback(
    () => (!noDescription ? description ?? defaultDescription() : undefined),
    [noDescription, description, defaultDescription]
  );

  return (
    <div className='form__step-wrapper'>
      <h2>{title}</h2>
      {renderDescription()}
    </div>
  );
};

export default FormStep;
