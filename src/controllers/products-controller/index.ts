/* eslint-disable prefer-const */
import { RequestHandler } from 'express';
import { Error, FilterQuery } from 'mongoose';
import { formatProductValidationError } from './products-error-formatters';
import ProductModel, {
  ProductDocument,
  ProductProps,
  Product,
} from '../../models/product-model';
import createProductViewModel, { ProductViewModel } from '../../view-model-creators/create-product-view-model';

type SingularProductResponse = { product: ProductViewModel } | ErrorResponseBody;

export const getProducts: RequestHandler<
  unknown,
  { products: ProductViewModel[] },
  unknown,
  { populate?: string, categoryId?: string }
> = async (req, res) => {
  const filterQuery: FilterQuery<Product> = {};

  let products: ProductViewModel[];
    const productDocs = await ProductModel.find(filterQuery);
    products = productDocs.map(createProductViewModel);

  res.status(200).json({ products });
};

export const getProduct: RequestHandler<
  { id: string },
  { product: ProductViewModel } | ErrorResponseBody,
  unknown,
  { populate?: string }
> = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await ProductModel.findById(id);
    if (productDoc === null) {
      throw new Error(`Produktas su id '${id}' nerastas`);
    }
    const product = createProductViewModel(productDoc as ProductDocument);
    res.status(200).json({ product });
  } catch (error) {
    res.status(404).json({
      error: `Produktas su id '${id}' nerastas`,
    });
  }
};

export const createProduct: RequestHandler<
  unknown,
  SingularProductResponse,
  ProductProps
> = async (req, res) => {
  const productProps = req.body;
  try {
    const productDoc = await ProductModel.create(productProps);
    const productViewModel = createProductViewModel(productDoc);
    res.status(201).json({ product: productViewModel });
  } catch (err) {
    const error = err instanceof Error.ValidationError
      ? formatProductValidationError(err)
      : 'Serverio klada';
    res.status(400).json({ error });
  }
};

export const updateProduct: RequestHandler<
  { id: string },
  SingularProductResponse,
  Partial<ProductProps>
> = async (req, res) => {
  const { id } = req.params;
  const productProps = req.body;
  try {
    const productDoc = await ProductModel.findByIdAndUpdate(id, productProps, { new: true });
    if (productDoc === null) {
      throw new Error(`Produktas su id '${id}' nerastas`);
    }
    const productViewModel = createProductViewModel(productDoc);
    res.status(200).json({ product: productViewModel });
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : 'Blogi produkto duomenys',
    });
  }
};

export const deleteProduct: RequestHandler<
  { id: string },
  SingularProductResponse
> = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await ProductModel.findByIdAndDelete(id);
    if (productDoc === null) {
      throw new Error(`Produktas su id '${id}' nerastas`);
    }
    const productViewModel = createProductViewModel(productDoc);
    res.status(200).json({ product: productViewModel });
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : 'Klaida trinant produktą',
    });
  }
};
