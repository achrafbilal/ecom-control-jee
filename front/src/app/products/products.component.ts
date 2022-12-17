import { Product, PageProduct } from "./../model/product.model";

import { ProductService } from "./../services/product.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { SecurityService } from "../services/security.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  errorMessage!: String;
  searchFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  totalElements: number = 0;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public authService: SecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control(""),
    });
    this.handleGetPageProduct("", this.currentPage, this.pageSize);
  }

  async handleDeleteProduct(product: Product) {
    if (confirm("Are you sure you want to delete this product")) {
      this.productService.deleteProduct(product.id).subscribe((d) => {
        this.productService.getPageProductsByKeyword().subscribe({
          next: (data) => {
            this.products = data._embedded.products;
            this.currentPage = data.page.number;
            this.pageSize = data.page.size;
            this.totalPages = data.page.totalPages;
            this.totalElements = data.page.totalElements;
          },
          error: (error) => (this.errorMessage = error.message),
        });
      });
    }
  }
  roundNumber = (value: number) => {
    return Math.round(value);
  };

  handleGetPageProduct = (keyword: string, page: number, size: number) => {
    this.productService
      .getPageProductsByKeyword(keyword, page, size)
      .subscribe({
        next: (data) => {
          this.products = data._embedded.products;
          this.currentPage = data.page.number;
          this.pageSize = data.page.size;
          this.totalPages = data.page.totalPages;
          this.totalElements = data.page.totalElements;
        },
        error: (error) => (this.errorMessage = error.message),
      });
  };

  handleSearchPageProductsByKeyword = () => {
    this.currentPage = 0;
    this.productService
      .getPageProductsByKeyword(
        this.searchFormGroup.value.keyword,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (data: PageProduct) => {
          let { products } = data._embedded;
          let { number, totalElements, totalPages, size } = data.page;
          this.products = products;
          this.currentPage = number;
          this.pageSize = size;
          this.totalPages = totalPages;
          this.totalElements = totalElements;
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
  };
  handleNewProduct() {
    this.router.navigateByUrl("/user/new-product");
  }
  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/admin/edit-product/${product.id}`);
  }
  hasRole(roles: []): boolean {
    return this.authService.hasRoleIn(roles);
  }
}
