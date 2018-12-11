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
    selector: "signup",
    moduleId: module.id,
    templateUrl: "./signup.html",
    styleUrls: ["./signup.scss"]
})

export class SignUpComponent implements OnInit {
    constructor(
        public routerExtensions: RouterExtensions,
        public sideDrawerService: SideDrawerService,
        public page: Page
    ) {
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        // this.sideDrawerService.sideDrawer.gesturesEnabled = false;
    }

    onTap(args) {
        this.routerExtensions.navigate([RoutingPath.HOME_SCREEN], {
            clearHistory: true,
            transition: config.application.NAVIGATION_TRANSITION
        })
    }

    goBack() {
        this.routerExtensions.back();
    }

    onTapSignIn() {
        this.routerExtensions.navigate([RoutingPath.LOGIN_SCREEN], {
            clearHistory: true,
            transition: config.application.NAVIGATION_TRANSITION
        })
    }
}