import { ProductItem } from "./../model/productItem.model";
import { Customer, PageCustomer } from "./../model/customer.model";
import { CustomerService } from "./../services/customer.service";
import { ProductService } from "./../services/product.service";
import { PageProduct, Product } from "./../model/product.model";
import { Bill } from "./../model/bill.model";
import { BillService } from "./../services/bill.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-new-bill",
  templateUrl: "./new-bill.component.html",
  styleUrls: ["./new-bill.component.scss"],
})
export class NewBillComponent implements OnInit {
  billFormGroup!: FormGroup;
  message: string = "";
  pageProduct!: PageProduct;
  pageCustomer!: PageCustomer;
  selectedProducts: Array<ProductItem> = [];
  billingDate: Date = new Date();
  selectedCustomer: number = -1;
  bill!: Bill;
  selectedProductID: number = 0;

  constructor(
    private fb: FormBuilder,
    private billService: BillService,
    private productService: ProductService,
    private customerService: CustomerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.billFormGroup = this.fb.group({
      billingDate: this.fb.control(formatDate(new Date(), "yyyy-MM-dd", "en"), [
        Validators.required,
      ]),
    });
    this.productService.getPageProductsByKeyword("", 0, 100).subscribe({
      next: (data) => {
        this.pageProduct = data;
      },
      error: (err) => alert(err.error),
    });
    this.customerService.getPageCustomersByKeyword("", 0, 100).subscribe({
      next: (data) => {
        this.pageCustomer = data;
        this.selectedCustomer = data._embedded.customers[0]?.id;
      },
      error: (err) => alert(err.error),
    });
  }
  getErrorMessage(name: string, error: ValidationErrors): string {
    if (error["required"]) return `${name}  is required`;
    if (error["minlength"])
      return `The minimum length of ${name} is ${error["minlength"]["requiredLength"]}`;
    if (error["min"])
      return `The min value of ${name} is ${error["min"]["min"]}`;
    return "";
  }
  handleNewBillFormSubmit() {
    const { billingDate } = this.billFormGroup.controls;
    console.log(billingDate.value);

    this.billService
      .addBill({
        billingDate: billingDate.value,
        customerID: this.selectedCustomer,
        productItems: this.selectedProducts,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl("/user/bills");
        },
        error: (err) => console.log(err),
      });
  }
  handleCloseAlert() {
    this.message = "";
  }
  setSelectedCustomer(customerID: number) {
    this.selectedCustomer = customerID;
  }
  addSelectedProduct(productID: number, price: number) {
    this.selectedProducts.push({
      productID: productID,
      price: price,
      quantity: 1,
    });
  }
  removeSelectedProduct(productID: number) {
    this.selectedProducts = this.selectedProducts.filter(
      (p) => p?.productID !== productID
    );
  }
  isSelectedProduct(productID: number) {
    return this.selectedProducts.find((p) => p.productID === productID);
  }
  isSelectedCustomer(customerID: number) {
    return this.selectedCustomer === customerID;
  }
  setQuantityFor(target: any, productID: number) {
    const prodItemIndex = this.selectedProducts.findIndex(
      (p) => p.productID === productID
    );

    if (prodItemIndex >= 0) {
      this.selectedProducts[prodItemIndex].quantity = Number(target.value);
    }
  }
  range(n: number) {
    return [...Array(n + 1).keys()].slice(1);
  }
  setDateValue(target: EventTarget) {
    console.log(target);

    //this.billingDate = date;
  }
}
