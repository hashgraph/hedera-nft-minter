import classNames from 'classnames';
import {
  ProfileSocials,
} from '@/components/views/settings/profile/SocialsFormGroup';

interface ISocialSelectOption {
  alt: string;
  title: string;
  icon: string;
  value: ProfileSocials;
  onClick: () => void;
  isActive: boolean;
}

export default function SocialSelectOption({
  alt,
  title,
  icon,
  isActive,
  onClick,
  ...props
}: ISocialSelectOption){
  const className = classNames('social-select__option', { isActive: isActive });

  return (
    <div className={className} onClick={onClick} {...props}>
      <div className='social-select__icon'>
        <img src={icon} alt={alt} width={30} height={30} />
      </div>
      {title}
    </div>
  );
}
