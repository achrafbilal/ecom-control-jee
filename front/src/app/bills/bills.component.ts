import { SecurityService } from "./../services/security.service";
import { Bill, PageBill } from "./../model/bill.model";

import { BillService } from "./../services/bill.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-bills",
  templateUrl: "./bills.component.html",
  styleUrls: ["./bills.component.scss"],
})
export class BillsComponent implements OnInit {
  bills!: Array<Bill>;
  errorMessage!: String;
  searchFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  totalElements: number = 0;
  customerID!: number;
  constructor(
    private billService: BillService,
    private formBuilder: FormBuilder,
    public authService: SecurityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control(""),
    });
    if (params["id"]) {
      this.handleGetCustomerPageBill(
        Number(params["id"]),
        this.currentPage,
        this.pageSize
      );
    } else {
      this.handleGetPageBill(this.currentPage, this.pageSize);
    }
  }

  async handleDeleteBill(bill: Bill) {
    if (bill.id)
      if (confirm("Are you sure you want to delete this bill")) {
        this.billService.deleteBill(bill.id).subscribe((d) => {
          console.log(d);
          this.billService
            .getPageBills(this.currentPage, this.pageSize)
            .subscribe({
              next: (data) => {
                const { content, number, size, totalPages, totalElements } =
                  data;
                this.bills = content;
                this.currentPage = number;
                this.pageSize = size;
                this.totalPages = totalPages;
                this.totalElements = totalElements;
              },
              error: (error) => (this.errorMessage = error.message),
            });
        });
      }
  }
  roundNumber = (value: number) => {
    return Math.round(value);
  };

  handleGetPageBill = (page: number, size: number) => {
    this.billService.getPageBills(page, size).subscribe({
      next: (data) => {
        console.log(data);

        const { content, number, size, totalPages, totalElements } = data;
        this.bills = content;
        this.currentPage = number;
        this.pageSize = size;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
      },
      error: (error) => (this.errorMessage = error.message),
    });
  };
  handleGetCustomerPageBill = (
    customerID: number,
    page: number,
    size: number
  ) => {
    this.billService.getBillsByCustomerId(customerID, page, size).subscribe({
      next: (data) => {
        console.log(data);
        const { content, number, size, totalPages, totalElements } = data;
        this.bills = content;
        this.currentPage = number;
        this.pageSize = size;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
      },
      error: (error) => (this.errorMessage = error.message),
    });
  };
  handleNewBill() {
    this.router.navigateByUrl("/user/new-bill");
  }
  handleEditBill(bill: Bill) {
    this.router.navigateByUrl(`/admin/edit-bill/${bill.id}`);
  }
  handleShowBill(bill: Bill) {
    this.router.navigateByUrl(`/user/show-bill/${bill.id}`);
  }
}
