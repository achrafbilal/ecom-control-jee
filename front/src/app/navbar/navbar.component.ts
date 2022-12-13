import { SecurityService } from "./../services/security.service";
import { Component } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  constructor(public secService: SecurityService, private location: Location) {}
  handleLogout() {
    this.secService.logout();
  }
  handleBack() {
    this.location.back();
  }
  handleLogin() {
    this.secService.login();
  }
}
