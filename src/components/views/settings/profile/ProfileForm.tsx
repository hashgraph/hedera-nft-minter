import React from 'react'
import { Field, Form } from 'formik'
import useHederaWallets from '@/utils/hooks/useHederaWallets'
import FieldWrapper from '@/components/shared/form/FieldWrapper'
import ImageInput, { ImageInputTypes } from '@/components/shared/form/ImageInput'
import SocialsFormGroup from '@/components/views/settings/profile/SocialsFormGroup'

export default function ProfileForm() {
  const { userWalletId } = useHederaWallets();

  return (
    <Form>
      <div className='settings__page--profile__details'>
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

        <button className='btn--big' type='submit'>
          Save settings
        </button>

      </div>
      <div className='settings__page--profile__images'>

        <label htmlFor='null'>Avatar</label>
        <ImageInput name='avatar' alt='avatar' type={ImageInputTypes.Avatar} />

        <label htmlFor='null'>Profile banner</label>
        <ImageInput name='banner' alt='banner' type={ImageInputTypes.Banner} />

      </div>
    </Form>
  )
}
