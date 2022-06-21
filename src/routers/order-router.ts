import { Router } from 'express';
import {
  getOrders,
  createOrder,
  deleteOrder,
} from '../controllers/order-controller';
import { adminMiddleware, authMiddleware } from '../middlewares/auth-middlewares';

const orderRouter = Router();

orderRouter.get('/', getOrders);
orderRouter.post('/', authMiddleware, createOrder);
orderRouter.delete('/:id', authMiddleware, adminMiddleware, deleteOrder);

export default orderRouter;
