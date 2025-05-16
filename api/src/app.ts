import cors from 'cors';
import express from 'express';
import healthRouter from './routes/health.route';
import countryRouter from './routes/country.route';
import bearerAuthentication from './lib/auth/bearerAuth';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', healthRouter);

app.use(bearerAuthentication);
app.use('/countries', countryRouter);

export default app;
