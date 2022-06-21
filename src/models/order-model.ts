import {
  Schema,
  Types,
  Document,
  Model,
  model,
} from 'mongoose';

export type Order = {
  orderPrice: string,
  orderDescription: string,
  images?: string,
  createdAt: string,
  updatedAt: string,
};

export type OrderProps = Omit<Order, 'createdAt' | 'updatedAt'>;

export type OrderDocument = Document<
  Types.ObjectId,
  unknown,
  Order
> & Order & {
  _id: Types.ObjectId;
};

const orderSchema = new Schema<Order, Model<Order>>({
  orderPrice: {
    type: String,
    required: true,
  },
  orderDescription: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const ProductModel = model('Order', orderSchema);

export default ProductModel;
