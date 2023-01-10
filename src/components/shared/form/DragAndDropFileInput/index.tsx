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

import React, { useCallback, useMemo } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import placeholder from '@assets/images/placeholder.png';
import uploadArrow from '@assets/images/icons/upload-arrow.svg';
import './drag-and-drop-file-input.scss'

const DragAndDropFileInput = (props: React.HTMLProps<HTMLInputElement>) => {
  const { values, errors, touched, setValues } = useFormikContext<FormikValues>();

  const shouldBeErrorDisplayed = useMemo(() => (
    touched.image && !!errors.image
  ), [errors.image, touched.image])

  const onDrop = useCallback((files) => {
    const temp = values;

    temp.image = files[0];
    setValues(temp);
  }, [setValues, values]);

  const onDropRejected = useCallback((files) => {
    if (files.length > 1) {
      return toast.error('❌ Only single image file can be upload!');
    }

    const doesIncludeFileType = files[0].file.type.includes('image/');

    if (!doesIncludeFileType) {
      return toast.error('❌ You can only upload only image files!');
    }

    return toast.error('❌ Upload file again!');
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDropRejected,
    onDrop,
    multiple: false,
    accept: 'image/*',
  });

  const dragAndDropClassNames = classNames({
    'drag-and-drop__container': true,
    'is-focused': isFocused,
    'is-drag-accepted': isDragAccept,
    'is-drag-rejected': shouldBeErrorDisplayed ?? isDragReject,
  });

  const renderUploadedImage = useCallback(() => (
    values?.image ? (
      <img
        className='selected-image'
        src={values?.image ? URL.createObjectURL(values?.image) : placeholder}
        alt='Thumb'
      />
    ) : (
      <>
        <img src={uploadArrow} className='drag-and-drop__upload-arrow' alt='upload-arrow' />
        <p>Upload your NFT image</p>
      </>
    )
  ), [values?.image])

  return (
    <div className='drag-and-drop'>
      <div className={dragAndDropClassNames} {...getRootProps()}>
        <input {...props} {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          renderUploadedImage()
        )}
      </div>
    </div>
  );
};

export default DragAndDropFileInput;
