import * as handleCli from "./handleCli.js";

export const isValidJson = (json: string): boolean => {
  try {
    JSON.parse(json);
    return true;
  } catch (error) {
    return false;
  }
};

export const sleep = async (ms: number = 2000): Promise<void> => {
  try {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } catch (error: any) {
    handleCli.error(error.message);
    return Promise.resolve();
  }
};

export const getRandomNumber = (min: number = 0, max: number = 100000): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
