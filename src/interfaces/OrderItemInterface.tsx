import ProductInterface from "./ProductInterface";

export default interface OrderItemInterface {
  id: number;
  unitPrice: number;
  quanity: number;
  product: ProductInterface;
  createdAt?: string;
  updatedAt?: string;
  amount: number;
}
