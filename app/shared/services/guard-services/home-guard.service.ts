import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RoutingPath } from "~/app-routing.module";
import { OdooService } from "~/shared/services/odoo-service/odoo.service";
import { OdooClient } from "nativescript-odoo/odoo-api/odoo-client";
import { config } from "~/config";

@Injectable()
export class HomeGuard implements CanActivate {
    constructor(
        public routerExtensions: RouterExtensions,
        public odooService: OdooService,
    ) { }

    canActivate() {
        if (OdooClient.getInstance() && OdooClient.getInstance().getCurrentUser()) {
            console.log("Home----Current Username: ", OdooClient.getInstance().getCurrentUser());
            return true;
        }
        else {
            this.routerExtensions.navigate([RoutingPath.LOGIN_SCREEN], {
                clearHistory: true,
                transition: config.application.NAVIGATION_TRANSITION
            });
            return false;
        }
    }
}