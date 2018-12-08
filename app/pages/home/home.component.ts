import {Component, OnInit, ViewChild, Injectable, ChangeDetectorRef} from "@angular/core";
import * as moment from 'moment';
import {TranslateService} from "@ngx-translate/core";
import {
    ShareDataService,
    SideDrawerService,
    OdooService,
    LocalStorageService,
    FirebaseService,
    MultiLanguageService,
    FacebookService
} from "~/shared";
import {Http} from "@angular/http";
import {Page, Color} from "tns-core-modules/ui/page/page";
import * as utils from "utils/utils";
import * as application from "application";
import * as frame from "ui/frame";
import {config} from "~/config";
import {RadSideDrawerComponent, SideDrawerType} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import {ObservableArray} from "tns-core-modules/data/observable-array/observable-array";
import {showLoadingIndicator, hideLoadingIndicator} from "~/utils";
// import { Message } from "nativescript-plugin-firebase";
import {OdooClient} from "nativescript-odoo/odoo-api/odoo-client";
import * as fresco from "nativescript-fresco";

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
        public firebaseService: FirebaseService,
        public facebookService: FacebookService,
        public http: Http,
        public page: Page
    ) {
        this.dataItems = new ObservableArray([{name: "Atalanta"}, {name: "Achilles"}]);
        console.log("multilaungue ", this.multiLanguageService.get("HOME_SCREEN.SUB_TITLE"));
        for (let i = 0; i < 40; i++) {
            this.dataItems.push({
                name: "atalanta" + i
            });
        }
        this.odooClient = OdooClient.getInstance();
    }

    ngOnInit(): void {
        // if (application.ios) {
        //     let applicationIos = application.ios.nativeApp;
        //     application.ios.nativeApp.valueForKey("statusBarWindow").valueForKey("statusBar").backgroundColor = new Color(config.application.STATUS_COLOR).ios;
        // }
        // else {
        //     application.android.startActivity.getWindow().setStatusBarColor(new Color(config.application.STATUS_COLOR).android);
        // }
        this.firebaseService.initFireBase({
            onMessageReceivedCallback: function (message: any) {
                // alert(message.body);
                if (message && message.body) {
                    console.log("success firebase : ", message)
                    // alert(message.body);
                } else {
                    console.log("undefined body callback firebase,", message);
                    // alert("undefined body callback firebase");
                }
            },
            onPushTokenReceivedCallback: function (token: string) {
                console.log("receive token", token);
            }
        })
    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit");
        let self = this;

        // var interval = setInterval(function () {
        //     if (self.drawer) {
        //         clearInterval(interval);
        //     }
        //     else {
        //         self.drawer = <RadSideDrawer>app.getRootView();
        //         self.changeDetectorRef.detectChanges();
        //     }
        // }, 10)

    }

    onTap(args) {
        // showLoadingIndicator();
        let self = this;
        let serverUrl = 'https://odev.innoria.com';
        let databaseName = 'odev.woodstock';
        this.odooClient.setServerUrl(serverUrl).connect({
            onConnectSuccess: function (versionInfo) {
                console.log("versionInfo ", versionInfo);
                self.odooService.setDatabaseName(databaseName);
                self.odooService.setServerUrl(serverUrl);
                self.odooClient.authenticate("admin", "Anything123", self.odooService.getDatabaseName())
                    .then((user: any) => {
                        console.log("isAvailableServerUrlAndDatabase ", self.odooService.isAvailableServerUrlAndDatabase())
                        console.log("setSessionId  ", self.odooClient.getSessionId());
                        if (user.username) {
                            console.log("---login user: ", user);
                        } else {
                            console.log("undefined username");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            onConnectError: function (err) {
                console.log(err);
            }
        })


        // setTimeout(function () {
        //     hideLoadingIndicator();
        // }, 1000)
    }

    onTapLogin(args) {
        console.log("onTapLogin");
        this.facebookService.logIn()
            .then(function (res) {
                console.log(res);
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    public openDrawer(args) {
        console.log("openDreaw");
        this.sideDrawerService.openDrawer();
    }

    public closeDrawer(args) {
        this.sideDrawerService.closeDrawer();
    }

    refreshList(args) {
        console.log("args");
        args.object.refreshing = false;
    }
}