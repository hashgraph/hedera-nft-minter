import { useMemo } from 'react';
import TwitterIcon from '@assets/images/socials/twitter.png'
import FacebookIcon from '@assets/images/socials/facebook.png'
import InstagramIcon from '@assets/images/socials/instagram.png'

export interface ISocialsData {
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

const useSocialsData = () => {

  const socialsData = useMemo<ISocialsData[]>(() => ProfileSocialsData, []);

  return socialsData
}

export default useSocialsData;
