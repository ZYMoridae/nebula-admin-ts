import VendorInterface from './VenderInterface';
import ProductMetaInterface from './ProductMetaInterface';
import ProductCategoryInterface from './ProductCategoryInterface';

export default interface ProductInterface {
  id: number,
  vendor: VendorInterface,
  price: number,
  unitsInStock: number,
  name: string,
  createdAt: string,
  updatedAt: string,
  productMetas?: Array<ProductMetaInterface>,
  productCategory: ProductCategoryInterface
}