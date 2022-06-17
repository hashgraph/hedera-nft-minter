import { Field, Formik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import useHederaWallets from '@utils/hooks/useHederaWallets';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import SocialsFormGroup from '@/components/views/settings/profile/SocialsFormGroup';
import ImageInput, { ImageInputTypes } from '@/components/shared/form/ImageInput';
import { ValidationSchema } from './validationSchema';


export default function Profile() {
  const { userWalletId } = useHederaWallets();

  const initialValues = useMemo(() => ({
    avatar: '',
    banner: '',
    username: '',
    bio: '',
    email: '',
    social_links: [
      {
        type: '',
        value: '',
      }
    ],
    wallet_address: userWalletId,
  }), [userWalletId])

  const submitForm = useCallback((values, actions) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, []);

  return (
    <div className='settings-profile'>
      <h1>Profile details</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={ValidationSchema}
      >
        {props => (
          <form onSubmit={props.handleSubmit} className='form'>

            <div className='settings-profile__details'>

              <label htmlFor='wallet_address'>
                Wallet address
              </label>
              <Field value={userWalletId} type='text' disabled />
              <FieldWrapper
                fastField
                name='username'
                title='Username'
                label='Enter username'
                type='text'
              />
              <FieldWrapper
                fastField
                name='bio'
                title='Bio'
                label='Tell the world your story!'
                type='textarea'
                as='textarea'
              />
              <FieldWrapper
                fastField
                name='email'
                title='Email Address'
                label='Email Address'
                type='email'
              />

              <SocialsFormGroup name='social_links' />

              <button type='submit'>
                Save settings
              </button>

            </div>
            <div className='settings-profile__images'>

              <label htmlFor='null'>Avatar</label>
              <ImageInput name='avatar' alt='avatar' type={ImageInputTypes.Avatar}/>

              <label htmlFor='null'>Profile banner</label>
              <ImageInput name='banner' alt='banner' type={ImageInputTypes.Banner}/>

            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
