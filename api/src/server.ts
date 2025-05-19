import app from "./app";
import dotenv from "dotenv";
import connectToMongoDB from "./lib/connectToMongoDB";

dotenv.config({ path: "./.env.local" });
connectToMongoDB();

const port: number = Number(process.env.PORT) as number;
app.listen(port, () => {
  console.log(`API is running on port ${port}.`);
});
