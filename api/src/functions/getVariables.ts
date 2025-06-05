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
