import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useField } from 'formik';
import classNames from 'classnames';
import placeholderSrc from '@assets/images/placeholder.png';
import noImagePlaceholderSrc from '@assets/images/no-image.png';
import './image-input.scss'
import { toast } from 'react-toastify';

export enum ImageInputTypes {
  Avatar = 'avatar',
  Banner = 'banner',
}

type Props = {
  name: string,
  alt: string,
  type: ImageInputTypes,
}

export default function ImageInput({name, alt, type} : Props) {

  const [imageFileBlob, setImageFileBlob] = useState<Blob | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [,,helpers] = useField(name)

  const changeHandler = useCallback((e) => {
    const { files } = e.target;
    const file = files[0];

    if (file.type.match(/image\/(png|jpg|jpeg)/gm)) {
      setImageFileBlob(file)
    }

    else {
      toast.error('Selected images are not of valid type!');
    }
  }, [setImageFileBlob]);

  useEffect(() => {
    let fileReader = {} as FileReader;
    let isCancel = false;

    if (typeof imageFileBlob !== 'undefined' ) {
      new Promise((resolve, reject) => {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target as FileReader;
          if (result) {
            resolve(result);
          }
        }
        fileReader.onabort = () => {
          reject(new Error('File reading aborted'));
        }
        fileReader.onerror = () => {
          reject(new Error('Failed to read file'));
        }
        fileReader.readAsDataURL(imageFileBlob);
      }).then( image => {
        if (!isCancel) {
          setImage(image as string);
          helpers.setValue(image)
        }
      }).catch(reason => {
        toast.error(reason);
      });
    }

    return () => {
      isCancel = true;
      if (fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }, [imageFileBlob, name, helpers]);

  const isPlaceholder = useMemo(()=>{
    return typeof image === 'undefined'
  } , [image])

  const imageInputClassName = classNames('image-input', type, {
    placeholder: isPlaceholder
  })

  const placeholder = useMemo(() => {
    switch (type as ImageInputTypes) {
      case 'avatar':
        return placeholderSrc

      case 'banner':
        return noImagePlaceholderSrc
    }
  }, [type])

  return (
    <div className={imageInputClassName}>
      <label>
        <div className='image-input__image'>
          <img src={image ?? placeholder} alt={alt} />
        </div>
        <span>
          <input
            type='file'
            id={name}
            name={name}
            onChange={changeHandler}
            accept='image/png, image/jpg, image/jpeg'
          />
        </span>
      </label>
    </div>
  )
}
