
import React, { useMemo } from 'react'
import { FieldArray, useField} from 'formik'
import { toast } from 'react-toastify'
import map from 'lodash/map'
import SocialSelect from '@/components/shared/form/SocialSelect'
import './socials-form-group.scss'
import TwitterIcon from '@assets/images/socials/twitter.png'
import FacebookIcon from '@assets/images/socials/facebook.png'
import InstagramIcon from '@assets/images/socials/instagram.png'

interface ISocialsData {
  value: ProfileSocials;
  alt: string;
  title: string,
  icon: string,
  placeholder: string
}

export enum ProfileSocials {
  Twitter = 'twitter',
  Facebook = 'facebook',
  Instagram = 'instagram',
}
export const ProfileSocialsData = [
  {
    value: ProfileSocials.Twitter,
    alt: 'twitter_icon',
    title: 'Twitter',
    icon: TwitterIcon,
    placeholder: 'eg. @your_twitter_profile'
  },
  {
    value: ProfileSocials.Facebook,
    alt: 'facebook_icon',
    title: 'Facebook',
    icon: FacebookIcon,
    placeholder: 'eg. /your_facebook_profile'
  },
  {
    value: ProfileSocials.Instagram,
    alt: 'instagram_icon',
    title: 'Instagram',
    icon: InstagramIcon,
    placeholder: 'eg. @your_ig_profile'
  },
]

export const useSocialsData = () => {
  const socialsData = useMemo<ISocialsData[]>(() => ProfileSocialsData, []);

  return socialsData
}

export default function SocialsFormGroup({ name }: { name: string }) {
  const [field] = useField(name);
  const socialsData = useSocialsData()

  return (
    <div className='socials-groups'>
      <FieldArray name={name}>
        {({ remove, push, form }) => (
          <>
            <label className='flex-space-between' htmlFor={name}>
              Social links
              <button
                onClick={() =>
                  field.value.length < socialsData.length ? push({
                    value: '',
                    type: ''
                  }) : toast.error('You have added all available socials!')
                }
                type='button'
              >
                Add +
              </button>
            </label>

            {map(form.values[name], (_, index) =>
              <SocialSelect
                name={`${ name }.${ index }`}
                remove={() => remove(parseInt(index))}
              />
            )}
          </>
        )}
      </FieldArray>
    </div>
  )
}
