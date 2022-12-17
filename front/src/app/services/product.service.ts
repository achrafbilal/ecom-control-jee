import { Product, PageProduct } from "./../model/product.model";
import { Injectable, OnInit } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { UUID } from "angular2-uuid";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductService implements OnInit {
  private lastKeyword: string = "";
  private lastPageSize: number = 5;
  private lastPageNumber: number = 0;
  private products!: Array<Product>;
  private BaseURI = "http://localhost:8888/INVENTORY-SERVICE/products";
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {}

  public deleteProduct(productID: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BaseURI}/${productID}`);
  }

  public addProduct(
    name: string,
    price: number,
    quantity: number
  ): Observable<Product> {
    return this.httpClient.post<Product>(`${this.BaseURI}`, {
      name: name,
      price: price,
      quantity: quantity,
    });
  }

  public editProduct(
    id: number,
    name: string,
    price: number,
    quantity: number
  ): Observable<Product> {
    return this.httpClient.put<Product>(`${this.BaseURI}/${id}`, {
      name: name,
      price: price,
      quantity: quantity,
    });
  }

  public getPageProductsByKeyword(
    keyword: string = this.lastKeyword,
    page: number = this.lastPageNumber,
    size: number = this.lastPageSize
  ): Observable<PageProduct> {
    this.lastPageNumber = page;
    this.lastPageSize = size;
    this.lastKeyword = keyword;
    return this.httpClient.get<PageProduct>(
      `${this.BaseURI}/search/keyword?name=${keyword}&page=${page}&size=${size}`
    );
  }

  public getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.BaseURI}/${id}`);
  }
}
