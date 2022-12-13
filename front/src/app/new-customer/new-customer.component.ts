import { CustomerService } from "./../services/customer.service";
import { Component, OnInit } from "@angular/core";
import {
  Form,
  FormBuilder,
  Validators,
  FormGroup,
  ValidationErrors,
} from "@angular/forms";

@Component({
  selector: "app-new-customer",
  templateUrl: "./new-customer.component.html",
  styleUrls: ["./new-customer.component.scss"],
})
export class NewCustomerComponent implements OnInit {
  handleAddCustomerFormSubmit() {
    const { name, email } = this.customerFormGroup.value;
    this.customerService.addCustomer(name, email).subscribe({
      next: (customer) => {
        this.customerFormGroup.reset();
        this.message = "Customer added successfully";
      },
      error: (err) => console.log(err),
    });
  }
  handleCloseAlert() {
    this.message = "";
  }
  customerFormGroup!: FormGroup;
  message: string = "";
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.customerFormGroup = this.fb.group({
      name: this.fb.control("", [Validators.required, Validators.minLength(2)]),
      email: this.fb.control("", [
        Validators.required,
        Validators.minLength(4),
      ]),
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
