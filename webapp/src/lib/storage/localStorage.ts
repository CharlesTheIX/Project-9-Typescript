export const setLocalStorageItem = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error: any) {
    console.error("Error setting localStorage item:", error);
  }
};

export const getLocalStorageItem = (key: string): any => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error: any) {
    console.error("Error getting localStorage item:", error);
    return null;
  }
};

export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error: any) {
    console.error("Error removing localStorage item:", error);
  }
};
