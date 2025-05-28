import app from "./app";
import dotenv from "dotenv";
import connectToMongoDB from "./functions/connectToMongoDB";

dotenv.config({ path: "./.env.local" });

(async () => {
  try {
    await connectToMongoDB().then(() => {
      const port: number = Number(process.env.PORT) as number;

      app.listen(port, () => {
        console.log(`API is running on port ${port}.`);
      });
    });
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
})();
