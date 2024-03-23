import 'express-async-errors';
import "reflect-metadata";
import 'dotenv/config';
import express from "express";
import { json } from "body-parser";
import { errorHandler } from './middleware/errorHandler';
import { userRouter } from './routes/user';
import { groceryRouter } from './routes/grocery';
import { cartRouter } from './routes/cart';
import { orderRouter } from './routes/order';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(userRouter);
app.use(groceryRouter);
app.use(cartRouter);
app.use(orderRouter);

app.use('*', async () => {
  throw new Error('Not Found')
})

app.use(errorHandler);

export { app };
