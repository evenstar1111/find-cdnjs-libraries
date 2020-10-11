export const storeInSessionStorage = (key, value) => {
  if (process.browser) {
    sessionStorage.setItem(key, value);
  }
};

export const getFromSessionStorage = (key) => {
  if (process.browser) {
    return sessionStorage.getItem(key);
  }
};
