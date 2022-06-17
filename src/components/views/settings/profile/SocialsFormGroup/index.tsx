
import React, { useCallback, useMemo, useState, useRef } from 'react'
import { FastField, FieldArray, useField, useFormikContext, FormikValues } from 'formik'
import { toast } from 'react-toastify'
import map from 'lodash/map'
import classNames from 'classnames'
import { useOnClickAway } from 'use-on-click-away';
import Error from '@components/shared/form/Error'
import './socials-form-group.scss'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TwitterIcon from '@assets/images/socials/twitter.png'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FacebookIcon from '@assets/images/socials/facebook.png'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import InstagramIcon from '@assets/images/socials/instagram.png'

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

const useSocialsData = () => {
  const socialsData = useMemo<{
    value: ProfileSocials;
    alt: string;
    title: string,
    icon: string,
    placeholder: string
  }[]>(() => ProfileSocialsData, []);

  return socialsData
}

const SocialSelectOption = (
  {
    alt,
    title,
    icon,
    isActive,
    onClick,
    ...props
  }: {
    alt: string;
    title: string,
    icon: string
    value: ProfileSocials
    onClick: () => void
    isActive: boolean,
  }) => {

  const className = classNames('social-select__option', { isActive: isActive })

  return (
    <div className={className} onClick={onClick} {...props}>
      <div className='social-select__icon'>
        <img src={icon} alt={alt} width={30} height={30} />
      </div>
      {title}
    </div>
  )
}

const SocialSelect = ({ name, remove, ...props }: { name: string, remove: () => void }) => {
  const [field] = useField<{ type: ProfileSocials, value: string }>(name);
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const [isSelectShowed, setSelectShowed] = useState<boolean>(false)

  const socialsData = useSocialsData()

  const socialSelectOptionsRef = useRef<HTMLDivElement>(null)

  useOnClickAway(socialSelectOptionsRef, () => {
    setSelectShowed(false);
  });

  const usedSocialTypes = useMemo(() =>
    values.social_links
      .map((social: { type: ProfileSocials, value: string }) => social.type)
      .filter((el: ProfileSocials & '') => el !== ''),
    [values.social_links])

  const areAllSocialsUsed = useMemo(() => {
    return usedSocialTypes.length === socialsData.length
  }, [usedSocialTypes, socialsData])

  const hasMultipleOptions = useMemo(() => {
    return socialsData
      .filter(social => !usedSocialTypes.includes(social.value))
      .length > 1
  }, [socialsData, usedSocialTypes])

  const selectOnClickHandler = useCallback(() => {
    if (!areAllSocialsUsed) {
      setSelectShowed(prev => !prev)
    }
  }, [setSelectShowed, areAllSocialsUsed])

  const optionOnClickHandler = useCallback((value: ProfileSocials) => {
    if (!areAllSocialsUsed) {
      setFieldValue(name, { ...field.value, type: value })
      setSelectShowed(false)
    }
  }, [setFieldValue, name, field.value, areAllSocialsUsed])

  const activeSocial = useMemo(() => {
    const activeFieldData = socialsData.find(e => e.value === field.value?.type)

    return activeFieldData ?? null
  }, [socialsData, field])

  const renderActiveSocial = useCallback(() => {
    if (activeSocial) {
      return (
        <div className='social-select__row'>
          <div className='social-select__icon' onClick={selectOnClickHandler} >
            <img
              src={activeSocial.icon}
              alt={activeSocial.alt}
              width={30}
              height={30}
            />
          </div>
          <FastField placeholder={activeSocial.placeholder} type='text' name={`${ name }.value`} />
        </div>
      )
    }
    else return (
      <span className='social-select__no-option' onClick={selectOnClickHandler}>
        Please select a social <span className='social-select__icon' />
      </span>
    )
  }, [activeSocial, selectOnClickHandler, name])

  const optionsClassName = classNames('social-select__options', {
    hasMultipleOptions
  })

  const containerClassName = classNames('social-select', {
    areAllSocialsUsed,
    isSelectShowed
  })

  return (
    <div className={containerClassName} {...props} >
      <div className='social-select__active-selection'>
        {isSelectShowed ? (
          <div className={optionsClassName} ref={socialSelectOptionsRef}>
            {socialsData
              .filter(social => !usedSocialTypes.includes(social.value))
              .map((social, index) =>
                <SocialSelectOption
                  // eslint-disable-next-line react/no-array-index-key
                  key={`social-select.${ name }.${ index }`}
                  title={social.title}
                  value={social.value}
                  icon={social.icon}
                  alt={social.alt}
                  onClick={() => optionOnClickHandler(social.value)}
                  isActive={field.value?.type === social.value}
                />
              )}
          </div>
        ) : (
          <div className='social-select__wrapper'>
            <div className='social-select__wrapper-main'>
              {renderActiveSocial()}
              <button type='button' className='social-select__remove-btn' onClick={remove}>
                Remove
              </button>
            </div>
            <Error name={`${ name }.value`} />
          </div>
        )}
      </div>
    </div>
  )
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
