import { Bill } from "./../model/bill.model";
import { BillService } from "./../services/bill.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";

@Component({
  selector: "app-edit-bill",
  templateUrl: "./edit-bill.component.html",
  styleUrls: ["./edit-bill.component.scss"],
})
export class EditBillComponent implements OnInit {
  billFormGroup!: FormGroup;
  message: string = "";
  billID!: number;
  constructor(
    private fb: FormBuilder,
    private billService: BillService,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.billID = this.router.snapshot.params["id"];
    this.billService.getBillById(this.billID).subscribe({
      next: (bill) => {
        this.billFormGroup = this.fb.group({
          id: this.fb.control(this.billID),
          billingDate: this.fb.control(bill.billingDate, [Validators.required]),
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
  handleEditBillFormSubmit() {
    const { id, name, email } = this.billFormGroup.value;
    this.billService.editBill(id, name, email).subscribe({
      next: (bill) => {
        this.billFormGroup.reset();
        this.message = "Bill edited successfully";
      },
      error: (err) => console.log(err),
    });
  }
  handleCloseAlert() {
    this.message = "";
  }
}
