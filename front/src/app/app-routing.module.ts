import { ShowBillComponent } from "./../../../../../GitHub/tp-controle-spring-boot/front/src/app/show-bill/show-bill.component";
import { NewBillComponent } from "./new-bill/new-bill.component";
import { NewCustomerComponent } from "./new-customer/new-customer.component";
import { EditBillComponent } from "./edit-bill/edit-bill.component";
import { EditCustomerComponent } from "./edit-customer/edit-customer.component";
import { AuthGuard } from "./guards/auth.guard";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { NewProductComponent } from "./new-product/new-product.component";
import { BillsComponent } from "./bills/bills.component";
import { CustomersComponent } from "./customers/customers.component";
import { ProductsComponent } from "./products/products.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "products",
    component: ProductsComponent,
  },
  {
    path: "user",

    canActivate: [AuthGuard],
    data: { roles: ["USER"] },
    children: [
      {
        path: "products",
        component: ProductsComponent,
      },
      {
        path: "customers",
        component: CustomersComponent,
      },
      {
        path: "bills",
        component: BillsComponent,
      },
      {
        path: "customer-bills/:id",
        component: BillsComponent,
      },

      {
        path: "new-product",
        component: NewProductComponent,
      },

      {
        path: "new-customer",
        component: NewCustomerComponent,
      },

      {
        path: "new-bill",
        component: NewBillComponent,
      },
      {
        path: "show-bill/:id",
        component: ShowBillComponent,
      },
    ],
  },
  {
    path: "admin",
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "USER"] },

    children: [
      {
        path: "edit-product/:id",
        component: EditProductComponent,
      },
      {
        path: "edit-customer/:id",
        component: EditCustomerComponent,
      },
      {
        path: "edit-bill/:id",
        component: EditBillComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
