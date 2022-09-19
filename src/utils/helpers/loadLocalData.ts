export const loadLocalData = (variable: string) => {
  const foundData = localStorage.getItem(variable);

  if (foundData) {
      return JSON.parse(foundData);
  }
  return null;
};
