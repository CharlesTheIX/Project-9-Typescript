import mongoose from "mongoose";
import { mongoDBVariables } from "./getVariables";

export default async (): Promise<void> => {
  try {
    const connection: typeof mongoose = await mongoose.connect(mongoDBVariables().uri);
    console.log(`MongoDB connect to host: ${connection.connection.host}.`);
  } catch (error: any) {
    console.error(`MongoDB connection error: ${error.message}.`);
    process.exit(1);
  }
};
