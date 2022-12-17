import { Customer, PageCustomer } from "./../model/customer.model";

import { CustomerService } from "./../services/customer.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { SecurityService } from "../services/security.service";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;
  errorMessage!: String;
  searchFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  totalElements: number = 0;
  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    public authService: SecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control(""),
    });
    this.handleGetPageCustomer("", this.currentPage, this.pageSize);
  }

  async handleDeleteCustomer(customer: Customer) {
    if (confirm("Are you sure you want to delete this customer")) {
      this.customerService.deleteCustomer(customer.id).subscribe((d) => {
        this.customerService.getPageCustomersByKeyword().subscribe({
          next: (data) => {
            this.customers = data._embedded.customers;
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

  handleGetPageCustomer = (keyword: string, page: number, size: number) => {
    this.customerService
      .getPageCustomersByKeyword(keyword, page, size)
      .subscribe({
        next: (data) => {
          this.customers = data._embedded.customers;
          this.currentPage = data.page.number;
          this.pageSize = data.page.size;
          this.totalPages = data.page.totalPages;
          this.totalElements = data.page.totalElements;
        },
        error: (error) => (this.errorMessage = error.message),
      });
  };
  handleSearchPageCustomersByKeyword = () => {
    this.currentPage = 0;
    this.customerService
      .getPageCustomersByKeyword(
        this.searchFormGroup.value.keyword,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (data: PageCustomer) => {
          let { customers } = data._embedded;
          let { number, totalElements, totalPages, size } = data.page;
          this.customers = customers;
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
  handleNewCustomer() {
    this.router.navigateByUrl("/user/new-customer");
  }
  handleEditCustomer(customer: Customer) {
    this.router.navigateByUrl(`/admin/edit-customer/${customer.id}`);
  }

  handleCustomerBills = (customerID: number) => {
    this.router.navigateByUrl(`/user/customer-bills/${customerID}`);
    //this.customerService.getCustomerBills(customerID);
  };
}
