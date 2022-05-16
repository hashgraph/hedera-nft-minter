import React, { useCallback } from 'react';
import { FormikValues, useFormikContext } from 'formik';

import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import classNames from 'classnames';

const DragAndDropFileInput = (props: React.HTMLProps<HTMLInputElement>) => {
  const { values, setValues } = useFormikContext();

  const onDrop = useCallback(
    (files) => {
      const temp = values as FormikValues;
      temp.image = files[0];
      setValues(temp);
    },
    [setValues, values]
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
    'form__fileDrop__container': true,
    'is-focused': isFocused,
    'is-drag-accepted': isDragAccept,
    'is-drag-rejected': isDragReject,
  });

  const isFileUploaded = acceptedFiles.length > 0;

  return (
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
  );
};

export default DragAndDropFileInput;
