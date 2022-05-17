type Props = {
  title: string;
};

const FormStep = ({ title }: Props) => {
  return (
    <div className='form__step-wrapper'>
      <h1>{title}</h1>
      <span>Select an</span>
      <p>
        {title} <span>data</span>
      </p>
    </div>
  );
};

export default FormStep;
