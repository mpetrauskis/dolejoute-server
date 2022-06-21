import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import OrderModel from '../../models/order-model';
import createOrderViewModel, { OrderViewModel } from '../../view-model-creators/create-order-view-model';

export const getOrders: RequestHandler<
  unknown,
  { orders: OrderViewModel[] },
  unknown
> = async (req, res) => {
  const orderDocs = await OrderModel.find();
  res.status(200).json({
    orders: orderDocs.map((orderDoc) => createOrderViewModel(orderDoc)),
  });
};

export const createOrder: RequestHandler<
  unknown
> = async (req, res) => {
  const orderProps = req.body;
  try {
    const orderDoc = await OrderModel.create(orderProps);
    const orderViewModel = createOrderViewModel(orderDoc);
    res.status(201).json({ order: orderViewModel });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const deleteOrder: RequestHandler<
  { id: string }
> = async (req, res) => {
  const { id } = req.params;
  try {
    const orderDoc = await OrderModel.findByIdAndDelete(id);
    if (orderDoc === null) {
      throw new Error(`Uzsakymas su id '${id}' nerastas`);
    }
    const orderViewModel = createOrderViewModel(orderDoc);
    res.status(200).json({ order: orderViewModel });
  } catch (err) {
    res.status(404).json({ err });
  }
};
