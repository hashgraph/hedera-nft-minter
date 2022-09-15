const renderValue = (value: string | number | undefined, message?: string) =>
  value ? value : <span>{message ? message : '(empty)'}</span>;

export default renderValue;
