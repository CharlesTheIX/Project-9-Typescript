export type CookieType = { name: string; value: boolean };

export const getCookieItem = (key: string): CookieType | null => {
  try {
    const item = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
    return item ? JSON.parse(decodeURIComponent(item[2])) : null;
  } catch (error: any) {
    console.error(`Error getting browser cookie item ${key}:`, error);
    return null;
  }
};

export const setCookieItem = (key: string, value: any, days: number = 7): void => {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString(); // 864e5 = 24h in ms
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
      JSON.stringify(value),
    )}; expires=${expires}; path=/`;
  } catch (error: any) {
    console.error(`Error setting browser cookie item ${key}:`, error);
  }
};

export const removeCookieItem = (key: string): void => {
  try {
    document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  } catch (error: any) {
    console.error(`Error setting browser cookie item ${key}:`, error);
  }
};
