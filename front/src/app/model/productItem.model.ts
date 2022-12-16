import { Product } from "./product.model";
export interface ProductItem {
  id?: number;
  quantity: number;
  productID: number;
  price: number;
  product?: Product;
}
