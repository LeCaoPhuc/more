import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { OdooService, LocalStorageService, MultiLanguageService, SideDrawerService } from "~/shared/services/index";
import { showLoadingIndicator, hideLoadingIndicator } from "~/utils";
import { RouterExtensions } from "nativescript-angular/router";
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
        public routerExtensions: RouterExtensions,
        public sideDrawerService: SideDrawerService,
        public page: Page
    ) {
        this.page.actionBarHidden = true;
        let self = this;
        let interval = setInterval(function () {
            if (self.sideDrawerService.sideDrawer) {
                self.sideDrawerService.sideDrawer.gesturesEnabled = false;
                clearInterval(interval);
            }
        }, 10)
    }

    ngOnInit() {
        console.log("ngOnInit");
    }

    onTapSignUp(args) {
        this.routerExtensions.navigate([RoutingPath.SIGN_UP], {
            clearHistory: true,
            transition: config.application.NAVIGATION_TRANSITION
        })
    }
}