import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { OdooService, LocalStorageService, MultiLanguageService } from "~/shared/services/index";
import { showLoadingIndicator, hideLoadingIndicator } from "~/utils";
import { RouterExtensions } from "nativescript-angular/router";
// import { hideStatusBar } from "~/utils/status-bar-utils";
import { Page } from "ui/page";
import { RoutingPath } from "~/app-routing.module";
import { OdooClient } from "nativescript-odoo/odoo-api/odoo-client";
import { OdooUser } from "nativescript-odoo/odoo-api/odoo-user";
import { config } from "~/config";

@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "./login.html",
    styleUrls: ["./login.scss"]
})

export class LoginComponent implements OnInit {
    constructor(
        public routerExtensions: RouterExtensions
    ) {

    }

    ngOnInit() {

    }

    onTap(args) {
        this.routerExtensions.navigate([RoutingPath.HOME_SCREEN], {
            clearHistory: true,
            transition: config.application.NAVIGATION_TRANSITION
        })
    }
}