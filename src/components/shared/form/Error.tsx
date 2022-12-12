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

import React from 'react';
import { ErrorMessage } from 'formik';
import classNames from 'classnames';
type Props = {
  name: string;
  className?: string;
  onClick?: () => void;
};

const Error = ({ name, className, onClick }: Props) => {
  const classname = classNames('form__error', className, {
    image_error: name === 'image',
    hover: typeof onClick === 'function'
  });

  return (
    <div className={classname} onClick={onClick}>
      <ErrorMessage name={name} />
    </div>
  );
};

export default Error;
