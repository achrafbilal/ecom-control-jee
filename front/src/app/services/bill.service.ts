import { Bill, FullPageBill } from "./../model/bill.model";
import { Injectable, OnInit } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { UUID } from "angular2-uuid";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BillService implements OnInit {
  private lastKeyword: string = "";
  private lastPageSize: number = 5;
  private lastPageNumber: number = 0;
  private lastCustomerID!: number;
  private bills!: Array<Bill>;
  private BaseURI = "http://localhost:8888/BILLING-SERVICE/fullBill";
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {}

  public deleteBill(billID: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.BaseURI.replace("fullBill", "bills")}/${billID}`
    );
  }

  public addBill(bill: Bill): Observable<Bill> {
    return this.httpClient.post<Bill>(`${this.BaseURI}`, bill);
  }

  public editBill(bill: Bill): Observable<Bill> {
    return this.httpClient.put<Bill>(`${this.BaseURI}/${bill.id}`, bill);
  }

  public getBillById(id: number): Observable<Bill> {
    return this.httpClient.get<Bill>(`${this.BaseURI}/${id}`);
  }

  public getBillsByCustomerId(
    id: number,
    page: number = this.lastPageNumber,
    size: number = this.lastPageSize
  ): Observable<FullPageBill> {
    this.lastCustomerID = id;
    this.lastPageNumber = page;
    this.lastPageSize = size;
    return this.httpClient.get<FullPageBill>(
      `${this.BaseURI}/customer/${id}?page=${page}&size=${size}`
    );
  }

  public getPageBills(page: number, size: number): Observable<FullPageBill> {
    this.lastPageNumber = page;
    this.lastPageSize = size;
    return this.httpClient.get<FullPageBill>(
      `${this.BaseURI}?page=${page}&size=${size}`
    );
  }
}
