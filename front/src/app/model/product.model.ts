export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface PageProduct {
  _embedded: {
    products: Array<Product>;
  };
  page: {
    size: number;
    totalPages: number;
    totalElements: number;
    number: number;
  };
}
