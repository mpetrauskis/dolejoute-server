import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import productsRouter from './routers/products-router';
import authRouther from './routers/auth-router';
import config from './config';
import orderRouter from './routers/order-router';

const server = express();

server.use(cors());
server.use(morgan(':method :url :status'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/products', productsRouter);
server.use('/api/auth', authRouther);
server.use('/api/order', orderRouter);

mongoose.connect(
  config.db.connectionUrl,
  {
    retryWrites: true,
    w: 'majority',
  },
  (error) => {
    if (error) {
      console.log(`Nepavyko Prisijungti:\n${error.message}`);
      return;
    }
    console.log('Successfully connected to MongoDB');
    server.listen(1337, () => console.log(`Appliaction server is running on: ${config.server.domain}`));
  },
);
