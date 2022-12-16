import { Customer } from "./customer.model";
import { ProductItem } from "./productItem.model";
export interface Bill {
  id?: number;
  billingDate: Date;
  customerID: number;
  customer?: Customer;
  productItems: Array<ProductItem>;
}
export interface FullPageBill {
  content: Array<Bill>;
  size: number;
  totalPages: number;
  totalElements: number;
  number: number;
}

export interface PageBill {
  _embedded: {
    bills: Array<Bill>;
  };
  page: {
    size: number;
    totalPages: number;
    totalElements: number;
    number: number;
  };
}
