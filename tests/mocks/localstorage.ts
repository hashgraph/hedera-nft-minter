export const localStorageMock = (function() {
  const store: {
    [key: string]: string
  } = {
    foo: 'test',
  };

  return {
    getItem: function(key: string) {
      return store[key];
    },
    setItem: function(key:string, value: any) {
      store[key] = value.toString();
    },
    removeItem: function(key: string) {
      delete store[key];
    }
  };
})();
