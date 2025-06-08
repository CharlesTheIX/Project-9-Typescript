import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route";
import healthRouter from "./routes/health.route";
import countryRouter from "./routes/country.route";
import notificationRouter from "./routes/notification.route";
import bearerAuthentication from "./lib/auth/bearerAuth";

const version = "v1";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", healthRouter);

app.use(bearerAuthentication);

app.use(`/${version}/users`, userRouter);
app.use(`/${version}/countries`, countryRouter);
app.use(`/${version}/notifications`, notificationRouter);

export default app;
