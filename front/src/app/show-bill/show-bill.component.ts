import { ActivatedRoute } from "@angular/router";
import { Bill } from "./../model/bill.model";
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { BillService } from "../services/bill.service";

@Component({
  selector: "app-show-bill",
  templateUrl: "./show-bill.component.html",
  styleUrls: ["./show-bill.component.scss"],
})
export class ShowBillComponent implements OnInit {
  bill!: Bill;
  errorMessage!: string;
  ngOnInit(): void {}
  constructor(private route: ActivatedRoute, private billService: BillService) {
    this.billService
      .getBillById(Number(this.route.snapshot.params["id"]))
      .subscribe({
        next: (data) => {
          this.bill = data;
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
  }
  formatDate(date: Date) {
    console.log(date);
    return `${date.getFullYear()} - ${date.getMonth()} - ${date.getDate()}`;
  }
}
