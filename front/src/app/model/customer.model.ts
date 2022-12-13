export interface Customer {
  id: number;
  name: string;
  email: number;
  role: string;
}

export interface PageCustomer {
  _embedded: {
    customers: Array<Customer>;
  };
  page: {
    size: number;
    totalPages: number;
    totalElements: number;
    number: number;
  };
}
