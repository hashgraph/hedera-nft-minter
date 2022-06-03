import React from 'react';
import { Formik } from 'formik';

import Hero from '@layout/Hero';
import TestForm from '@components/views/book/test-form';

export default function Book() {
  return (
    <div>
      <Hero profile />


      <div className='container'>
        <Formik
          initialValues={{}}
          onSubmit={() => Promise.resolve(null)}
          component={TestForm}
        />
      </div>

      <div className='dark-schema'>
        <div className='container'>
          <Formik
            initialValues={{}}
            onSubmit={() => Promise.resolve(null)}
            component={TestForm}
          />
        </div>
      </div>

    </div>
  )
}
