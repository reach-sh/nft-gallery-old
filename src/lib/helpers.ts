export const getStorageItem = (f: string, def: string) => {
  return JSON.parse(localStorage.getItem(f) ?? def);
};

export const setStorageItem = (f: string, val: any, def: any) => {
  localStorage.setItem(f, JSON.stringify(val) ?? def);
};
