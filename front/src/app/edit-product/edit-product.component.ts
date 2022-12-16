import { Product } from "./../model/product.model";
import { ProductService } from "./../services/product.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.scss"],
})
export class EditProductComponent implements OnInit {
  productFormGroup!: FormGroup;
  message: string = "";
  productID!: number;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productID = Number(this.router.snapshot.params["id"]);
    this.productService.getProductById(this.productID).subscribe({
      next: (product) => {
        console.log(product);
        this.productFormGroup = this.fb.group({
          id: this.fb.control(product.id),
          name: this.fb.control(product.name, [Validators.required]),
          price: this.fb.control(product.price, [
            Validators.required,
            Validators.min(1),
          ]),
          quantity: this.fb.control(product.quantity, [
            Validators.required,
            Validators.min(0),
          ]),
        });
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

  handleEditProductFormSubmit() {
    const { id, name, price, quantity } = this.productFormGroup.value;
    this.productService.editProduct(id, name, price, quantity).subscribe({
      next: (product) => {
        this.productFormGroup.reset();
        this.message = "Product edited successfully";
      },
      error: (err) => console.log(err),
    });
  }

  handleCloseAlert() {
    this.message = "";
  }
}
