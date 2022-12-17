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
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-edit-bill",
  templateUrl: "./edit-bill.component.html",
  styleUrls: ["./edit-bill.component.scss"],
})
export class EditBillComponent implements OnInit {
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
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    console.log(this.activeRoute.snapshot.params["id"]);

    this.billService
      .getBillById(Number(this.activeRoute.snapshot.params["id"]))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.bill = data;
          this.selectedProducts = data.productItems;
          this.selectedCustomer = data.customerID;
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.productService.getPageProductsByKeyword("", 0, 100).subscribe({
      next: (data) => {
        console.log(data);

        this.pageProduct = data;
      },
      error: (err) => alert(err.error),
    });
    this.customerService.getPageCustomersByKeyword("", 0, 100).subscribe({
      next: (data) => {
        console.log(data);

        this.pageCustomer = data;
        this.selectedCustomer = data._embedded.customers[0]?.id;
      },
      error: (err) => alert(err.error),
    });
  }

  handleEditBillFormSubmit() {
    console.log(this.billingDate, this.selectedCustomer, this.selectedProducts);
    this.billService
      .editBill({
        billingDate: this.billingDate,
        customerID: this.selectedCustomer,
        productItems: this.selectedProducts,
        id: this.bill.id,
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
    console.log(customerID);
    this.selectedCustomer = customerID;
  }
  editSelectedProduct(productID: number, price: number) {
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
    console.log(this.selectedProducts);
  }
  range(n: number) {
    return [...Array(n + 1).keys()].slice(1);
  }
}
