import { KeycloakEventType, KeycloakService } from "keycloak-angular";
import { Injectable } from "@angular/core";
import { KeycloakProfile } from "keycloak-js";

@Injectable({
  providedIn: "root",
})
export class SecurityService {
  public profile?: KeycloakProfile;

  constructor(public kcService: KeycloakService) {
    this.init();
  }
  init() {
    this.kcService.keycloakEvents$.subscribe({
      next: (e) => {
        if (e.type == KeycloakEventType.OnAuthSuccess) {
          this.kcService.loadUserProfile().then((profile) => {
            this.profile = profile;
            console.log(profile);
          });
        }
      },
      error: (error) => {},
    });
  }
  hasRoleIn(roles: []): boolean {
    let userRoles = this.kcService.getUserRoles();
    for (let role of roles) {
      if (userRoles.includes(role)) return true;
    }
    return false;
  }

  login() {
    this.kcService.login({
      redirectUri: window.location.origin,
    });
  }
  logout() {
    this.kcService.logout(window.location.origin);
  }
  public getToken = () => {
    return "";
  };
}
