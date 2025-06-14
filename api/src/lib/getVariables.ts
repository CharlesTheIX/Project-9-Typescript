import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });
const environment: string = process.env.NODE_ENV || "development";

export type MongoDBVariables = {
  uri: string;
  username: string;
  password: string;
};
export const mongoDBVariables = (): MongoDBVariables => {
  const variables: MongoDBVariables = {
    uri: "",
    username: "",
    password: "",
  };

  switch (environment) {
    case "production":
      variables.uri = process.env.MONGODB_URI!;
      variables.username = process.env.MONGODB_USERNAME!;
      variables.password = process.env.MONGODB_PASSWORD!;
      break;
    case "development":
      variables.uri = process.env.MONGODB_DEV_URI!;
      variables.username = process.env.MONGODB_DEV_USERNAME!;
      variables.password = process.env.MONGODB_DEV_PASSWORD!;
      break;
  }

  return variables;
};

export const cryptoVariables = (): string => {
  return process.env.CRYPTO_SECRET!;
};

export const countriesDefaultQueryValues = (): any => {
  return {
    and: null,
    search: "",
    limit: 200,
    andValue: "",
    projection: {},
    sort: { displayName: 1 },
    searchFields: ["displayName", "capitalCity", "_id"],
  };
};
export const usersDefaultQueryValues = (): any => {
  return {
    and: null,
    search: "",
    limit: 200,
    andValue: "",
    projection: {},
    sort: { username: 1 },
    searchFields: ["username", "_id"],
  };
};
export const notificationsDefaultQueryValues = (): any => {
  return {
    and: null,
    search: "",
    limit: 200,
    andValue: "",
    projection: {},
    searchFields: ["_id"],
    sort: { createdAt: 1 },
  };
};
export const gameDataDefaultQueryValues = (): any => {
  return {
    and: null,
    search: "",
    limit: 200,
    andValue: "",
    projection: {},
    searchFields: ["_id"],
    sort: { createdAt: 1 },
  };
};
