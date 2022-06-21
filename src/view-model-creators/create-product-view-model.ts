import { ProductDocument } from '../models/product-model';

export type ProductViewModel = {
  id: string,
  title: string,
  price: string,
  updatedAt: string,
  images: string,
  description: string,
};

const createProductViewModel = (productDoc: ProductDocument): ProductViewModel => ({
  id: productDoc._id.toString(),
  title: productDoc.title,
  price: productDoc.price,
  updatedAt: productDoc.updatedAt,
  images: productDoc.images,
  description: productDoc.description,
});

export default createProductViewModel;
