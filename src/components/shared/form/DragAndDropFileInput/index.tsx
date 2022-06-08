import React, { useCallback, useMemo, useState } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import placeholder from '@assets/images/placeholder.png';
import './drag-and-drop-file-input.scss'

// https://stackoverflow.com/a/18650828
function formatBytes(bytes : number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

type SelectedImage = any

const DragAndDropFileInput = (props: React.HTMLProps<HTMLInputElement>) => {
  const { values, setValues } = useFormikContext<FormikValues>();
  const [selectedImage, setSelectedImage] = useState<SelectedImage>(values?.image);

  const imageChange = useCallback((files)=>{
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  },
  [setSelectedImage])

  const onDrop = useCallback(
    (files) => {
      imageChange(files)
      const temp = values as FormikValues;
      temp.image = files[0];
      setValues(temp);
    },
    [setValues, values, imageChange]
  );
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

  const isFileUploaded = useMemo( () =>
    acceptedFiles.length > 0,
  [acceptedFiles]);

  return (
    <div className='drag-and-drop'>
      <div className={dragAndDropClassNames} {...getRootProps()}>
        <input {...props} {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : isFileUploaded ? (
          <p>Uploaded file: {acceptedFiles[0].name}</p>
          ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
          )}
      </div>

      <div className='drag-and-drop__summary'>
        <img
          src={
            selectedImage ? URL.createObjectURL(selectedImage) : placeholder
          }
          alt='Thumb'
        />
        <div className='drag-and-drop__summary__description'>
          {values?.image ? (
            <>
            <p>{values?.image.path}</p>
            <p>{formatBytes(values?.image.size)}</p>
            </>
          ) : (
            <p>File not uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragAndDropFileInput;
