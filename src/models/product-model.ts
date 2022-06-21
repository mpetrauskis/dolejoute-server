import {
  Schema,
  Types,
  Document,
  Model,
  model,
} from 'mongoose';

export type Product = {
  title: string,
  price: string,
  images: string,
  description: string,
  createdAt: string,
  updatedAt: string,
};

export type ProductProps = Omit<Product, 'createdAt' | 'updatedAt'>;

export type ProductDocument = Document<
  Types.ObjectId,
  unknown,
  Product
> & Product & {
  _id: Types.ObjectId;
};

const productSchema = new Schema<Product, Model<Product>>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
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

const ProductModel = model('Product', productSchema);

export default ProductModel;
