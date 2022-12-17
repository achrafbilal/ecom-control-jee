import { Router } from "@angular/router";
import { BillService } from "./bill.service";
import { PageBill } from "./../model/bill.model";
import { Customer, PageCustomer } from "./../model/customer.model";
import { Injectable, OnInit } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { UUID } from "angular2-uuid";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CustomerService implements OnInit {
  private lastKeyword: string = "";
  private lastPageSize: number = 5;
  private lastPageNumber: number = 0;
  private customers!: Array<Customer>;
  private BaseURI = "http://localhost:8888/CUSTOMER-SERVICE/customers";
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private billService: BillService
  ) {}
  ngOnInit(): void {}

  public deleteCustomer(customerID: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BaseURI}/${customerID}`);
  }

  public addCustomer(name: string, email: string): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.BaseURI}`, {
      name: name,
      email: email,
    });
  }

  public editCustomer(
    id: number,
    name: string,
    email: string
  ): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.BaseURI}/${id}`, {
      name: name,
      email: email,
    });
  }

  public getPageCustomersByKeyword(
    keyword: string = this.lastKeyword,
    page: number = this.lastPageNumber,
    size: number = this.lastPageSize
  ): Observable<PageCustomer> {
    this.lastPageNumber = page;
    this.lastPageSize = size;
    this.lastKeyword = keyword;
    return this.httpClient.get<PageCustomer>(
      `${this.BaseURI}/search/keyword?name=${keyword}&email=${keyword}&page=${page}&size=${size}`
    );
  }

  public getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.BaseURI}/${id}`);
  }

  public getCustomerBills(id: number): void {
    this.router.navigateByUrl("/customer/bills");
    this.billService.getBillsByCustomerId(id);
  }
}
