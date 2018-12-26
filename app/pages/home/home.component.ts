import { Component, OnInit, ViewChild, Injectable, ChangeDetectorRef } from "@angular/core";
import * as moment from 'moment';
import { TranslateService } from "@ngx-translate/core";
import {
    ShareDataService,
    SideDrawerService,
    OdooService,
    LocalStorageService,
    FirebaseService,
    MultiLanguageService,
    FacebookService
} from "~/shared";
import { Http } from "@angular/http";
import { Page, Color } from "tns-core-modules/ui/page/page";
import * as utils from "utils/utils";
import * as application from "application";
import * as frame from "ui/frame";
import { config } from "~/config";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { showLoadingIndicator, hideLoadingIndicator } from "~/utils";
// import { Message } from "nativescript-plugin-firebase";
import { OdooClient } from "nativescript-odoo/odoo-api/odoo-client";
import * as fresco from "nativescript-fresco";
import { RouterExtensions } from "nativescript-angular/router";
import { RoutingPath } from "~/app-routing.module";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.html",
    styleUrls: ["./home.scss"],
})
export class HomeComponent implements OnInit {
    public src = 'http://images6.fanpop.com/image/photos/40900000/Achilles-And-Atalanta-Rider-And-Archer-Of-Red-fate-series-40902994-1000-625.jpg';
    public frame = frame;
    public odooClient: OdooClient;
    private drawer: RadSideDrawer;
    public dataItems: ObservableArray<any>;

    constructor(
        public translateService: TranslateService,
        public shareDataService: ShareDataService,
        public sideDrawerService: SideDrawerService,
        public multiLanguageService: MultiLanguageService,
        public changeDetectorRef: ChangeDetectorRef,
        public localStorageService: LocalStorageService,
        public odooService: OdooService,
        public routerExtensions: RouterExtensions,
    ) {
        this.odooClient = OdooClient.getInstance();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit");
        let self = this;
        let interval = setInterval(function () {
            if (self.sideDrawerService.sideDrawer) {
                self.sideDrawerService.sideDrawer.gesturesEnabled = false;
                clearInterval(interval);
            }
        }, 10);

    }

    onTapLogin(args) {

        // this.facebookService.logIn()
        //     .then(function (res) {
        //         console.log(res);
        //     })
        //     .catch(function (err) {
        //         console.log(err);
        //     })
    }

    public openDrawer(args) {
        console.log("openDreaw");
        this.sideDrawerService.openDrawer();
    }

    public closeDrawer(args) {
        this.sideDrawerService.closeDrawer();
    }

    public onTapLogOut(args) {
        console.log("onTapLogOut");
        this.odooClient.logout();
        this.routerExtensions.navigate([RoutingPath.LOGIN_SCREEN], {
            transition: config.application.NAVIGATION_TRANSITION,
            clearHistory: true
        })
    }
}