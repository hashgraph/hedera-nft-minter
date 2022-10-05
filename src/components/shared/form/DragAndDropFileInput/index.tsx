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

import React, { useCallback, useMemo, useState } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import placeholder from '@assets/images/placeholder.png';
import uploadArrow from '@assets/images/icons/upload-arrow.svg';
import './drag-and-drop-file-input.scss'

type SelectedImage = File | undefined

const DragAndDropFileInput = (props: React.HTMLProps<HTMLInputElement>) => {
  const { values, setValues } = useFormikContext<FormikValues>();
  const [selectedImage, setSelectedImage] = useState<SelectedImage>(values?.image);

  const imageChange = useCallback((files) => {
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  }, [setSelectedImage])

  const onDrop = useCallback(
    (files) => {
      imageChange(files)
      const temp = values;

      temp.image = files[0];
      setValues(temp);
    }, [setValues, values, imageChange]);
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
    acceptedFiles,
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
    'is-drag-rejected': isDragReject,
  });

  const isFileUploaded = useMemo(() =>
    acceptedFiles.length > 0,
    [acceptedFiles]);

  const renderUploadedImage = useCallback(() => (
    isFileUploaded ? (
      values?.image && (
        <img
          className='selected-image'
          src={selectedImage ? URL.createObjectURL(selectedImage) : placeholder}
          alt='Thumb'
        />
      )
    ) : (
      <>
        <img src={uploadArrow} className='drag-and-drop__upload-arrow' alt='upload-arrow' />
        <p>Upload your NFT image</p>
      </>
    )
  ), [isFileUploaded, selectedImage, values?.image])

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
