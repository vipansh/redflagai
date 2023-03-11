import Cookie from "js-cookie";

const localStorageSet = (key: string, value: string): void => {
  if (!key || !value) return;
  const edValue = value;
  if (!edValue) return;

  localStorage.setItem(key, edValue);
};

const localStorageGet = (key: string): string | undefined => {
  if (!key) return undefined;
  const savededValue = localStorage.getItem(key);
  if (!savededValue) return undefined;
  const value = savededValue;
  if (!value) return undefined;
  return value;
};

const localStorageRemove = (key: string) => {
  if (key && window.localStorage) localStorage.removeItem(key);
};

const localStorageClear = () => {
  if (window.localStorage) localStorage.clear();
};

const cookieSet = (key: string, value: string) => {
  if (!key || !value) return;
  const edValue = value;
  if (!edValue) return;
  Cookie.set(key, edValue, {
    expires: 365 * 10, // 10 years
  });
};

const cookieGet = (key: string): string | undefined => {
  if (!key) return undefined;
  const edValue = Cookie.get(key);
  if (!edValue) return undefined;
  const value = edValue;
  if (!value) return undefined;
  return value;
};

const cookieRemove = (key: string) => {
  if (!key) return;
  Cookie.remove(key);
};

const sessionStorageSet = (key: string, value: string): void => {
  if (!key || !value) return;
  const edValue = value;
  if (!edValue) return;
  if (!window.sessionStorage) return;
  sessionStorage.setItem(key, edValue);
};

const sessionStorageGet = (key: string): string | undefined => {
  if (!key) return undefined;
  if (!window.sessionStorage) return undefined;

  const savededValue = sessionStorage.getItem(key);
  if (!savededValue) return undefined;
  const value = savededValue;
  if (!value) return undefined;
  return value;
};

const sessionStorageRemove = (key: string) => {
  if (key && window.sessionStorage) sessionStorage.removeItem(key);
};

const sessionStorageClear = () => {
  if (window.sessionStorage) sessionStorage.clear();
};

const storage = {
  localStorage: {
    setItem: localStorageSet,
    getItem: localStorageGet,
    removeItem: localStorageRemove,
    clear: localStorageClear,
  },
  cookie: {
    set: cookieSet,
    get: cookieGet,
    remove: cookieRemove,
  },
  sessionStorage: {
    setItem: sessionStorageSet,
    getItem: sessionStorageGet,
    removeItem: sessionStorageRemove,
    clear: sessionStorageClear,
  },
};

export default storage;

// storage constants
export const STORAGE_KEYS = {
  token: "token",
};
