import { Customer } from "./../model/customer.model";
import { CustomerService } from "./../services/customer.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";

@Component({
  selector: "app-edit-customer",
  templateUrl: "./edit-customer.component.html",
  styleUrls: ["./edit-customer.component.scss"],
})
export class EditCustomerComponent implements OnInit {
  customerFormGroup!: FormGroup;
  message: string = "";
  customerID!: number;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerID = Number(this.router.snapshot.params["id"]);
    this.customerService.getCustomerById(this.customerID).subscribe({
      next: (customer) => {
        this.customerFormGroup = this.fb.group({
          id: this.fb.control(customer.id),
          name: this.fb.control(customer.name, [Validators.required]),
          email: this.fb.control(customer.email, [
            Validators.required,
            Validators.minLength(4),
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

  handleEditCustomerFormSubmit() {
    const { id, name, email } = this.customerFormGroup.value;
    this.customerService.editCustomer(id, name, email).subscribe({
      next: (customer) => {
        this.customerFormGroup.reset();
        this.message = "Customer edited successfully";
      },
      error: (err) => console.log(err),
    });
  }

  handleCloseAlert() {
    this.message = "";
  }
}
