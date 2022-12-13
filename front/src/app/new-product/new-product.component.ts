import { ProductService } from "./../services/product.service";
import { Component, OnInit } from "@angular/core";
import {
  Form,
  FormBuilder,
  Validators,
  FormGroup,
  ValidationErrors,
} from "@angular/forms";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.scss"],
})
export class NewProductComponent implements OnInit {
  handleAddProductFormSubmit() {
    const { name, price, quantity } = this.productFormGroup.value;
    this.productService.addProduct(name, price, quantity).subscribe({
      next: (product) => {
        this.productFormGroup.reset();
        this.message = "Product added successfully";
      },
      error: (err) => console.log(err),
    });
  }
  handleCloseAlert() {
    this.message = "";
  }
  productFormGroup!: FormGroup;
  message: string = "";
  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: this.fb.control("", [Validators.required, Validators.minLength(4)]),
      price: this.fb.control(1, [Validators.required, Validators.min(1)]),
      quantity: this.fb.control([Validators.required, Validators.min(0)]),
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
}
