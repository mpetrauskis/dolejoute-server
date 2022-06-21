import { OrderDocument } from '../models/order-model';

export type OrderViewModel = {
  id: string,
  orderPrice: string,
  orderDescription: string,
  updatedAt: string,
  images?: string,
};

const createOrderViewModel = (orderDoc: OrderDocument): OrderViewModel => ({
  id: orderDoc._id.toString(),
  orderPrice: orderDoc.orderPrice,
  orderDescription: orderDoc.orderDescription,
  updatedAt: orderDoc.updatedAt,
  images: orderDoc.images,
});

export default createOrderViewModel;
