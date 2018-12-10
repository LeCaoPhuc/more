import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RoutingPath } from "~/app-routing.module";
import { OdooService } from "~/shared/services/odoo-service/odoo.service";
import { config } from "~/config";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        public routerExtensions: RouterExtensions,
        public odooService: OdooService,
    ) { }

    canActivate() {
        if (this.odooService.isAvailableServerUrlAndDatabase()) {
            console.log("Login------Server Url: ", this.odooService.getServerUrl());
            console.log("Login------Database Name: ", this.odooService.getDatabaseName());
            return true;
        }
        else {
            // this.routerExtensions.navigate([RoutingPath.LOGIN_SCREEN], {
            //     clearHistory: true,
            //     transition: config.application.NAVIGATION_TRANSITION
            // });
            return false;
        }
    }
}