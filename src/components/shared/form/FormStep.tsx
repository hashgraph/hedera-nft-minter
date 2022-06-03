import { ReactNode, useCallback } from 'react';

type Props = {
  title: string;
  noDescription?: boolean;
  description?: ReactNode;
};

const FormStep = ({
  title,
  noDescription = false,
  description = undefined,
}: Props) => {
  const defaultDescription = useCallback(
    () => (
      <>
        <span>Select an</span>
        <p>
          {title} <span>data</span>
        </p>
      </>
    ),
    [title]
  );

  const renderDescription = useCallback(
    () => (!noDescription ? description ?? defaultDescription() : undefined),
    [noDescription, description, defaultDescription]
  );

  return (
    <div className='form__step-wrapper'>
      <h2>{title}</h2>
      {renderDescription()}
    </div>
  );
};

export default FormStep;
