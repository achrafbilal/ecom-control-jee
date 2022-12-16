import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductsComponent } from "./products/products.component";
import { CustomersComponent } from "./customers/customers.component";
import { BillsComponent } from "./bills/bills.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NewProductComponent } from "./new-product/new-product.component";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { EditCustomerComponent } from "./edit-customer/edit-customer.component";
import { EditBillComponent } from "./edit-bill/edit-bill.component";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { NewCustomerComponent } from "./new-customer/new-customer.component";
import { NewBillComponent } from "./new-bill/new-bill.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HttpClientModule } from "@angular/common/http";
import { ShowBillComponent } from "./show-bill/show-bill.component";
export function kcFactory(kcService: KeycloakService) {
  return () => {
    kcService.init({
      config: {
        realm: "controle-jee-fullstack-realm",
        clientId: "controle-jee-client",
        url: "http://localhost:8080/",
      },
      initOptions: {
        onLoad: "login-required",
        checkLoginIframe: false,
      },
    });
    console.log("kc init");
  };
}
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    BillsComponent,
    NewProductComponent,
    EditProductComponent,
    EditCustomerComponent,
    EditBillComponent,
    NewCustomerComponent,
    NewBillComponent,
    NavbarComponent,
    ShowBillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    KeycloakAngularModule,
    FormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
