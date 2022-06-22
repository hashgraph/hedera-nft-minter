import { Formik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import useHederaWallets from '@utils/hooks/useHederaWallets';
import { ValidationSchema } from './validationSchema';
import ProfileForm from '@/components/views/settings/profile/ProfileForm';


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
    <div className='settings__page settings__page--profile'>
      <h2>Profile details</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={ValidationSchema}
        component={ProfileForm}
      />
    </div>
  );
}
