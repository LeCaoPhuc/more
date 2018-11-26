import { Component, OnInit, ViewChild, Injectable, ChangeDetectorRef } from "@angular/core";
import * as moment from 'moment';
import { TranslateService } from "@ngx-translate/core";
import { ShareDataService, SideDrawerService, OdooSDKService, LocalStorageService, FirebaseService, MultiLanguageService } from "~/shared";
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
import { Message } from "nativescript-plugin-firebase";
@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.html",
    styleUrls: ["./home.css"],
})
export class HomeComponent implements OnInit {
    public frame = frame;
    private drawer: RadSideDrawer;
    public dataItems: ObservableArray<any>;
    constructor(
        public translateService: TranslateService,
        public shareDataService: ShareDataService,
        public sideDrawerService: SideDrawerService,
        public multiLanguageService: MultiLanguageService,
        public changeDetectorRef: ChangeDetectorRef,
        public localStorageService: LocalStorageService,
        public odooSDKService: OdooSDKService,
        public firebaseService: FirebaseService,
        public http: Http,
        public page: Page
    ) {
        this.dataItems = new ObservableArray([{ name: "Atalanta" }, { name: "Achilles" }]);
        console.log("multilaungue ", this.multiLanguageService.get("HOME_SCREEN.SUB_TITLE"));
        for (let i = 0; i < 40; i++) {
            this.dataItems.push({
                name: "atalanta" + i
            });
        }
    }

    ngOnInit(): void {
        if (application.ios) {
            let applicationIos = application.ios.nativeApp;
            application.ios.nativeApp.valueForKey("statusBarWindow").valueForKey("statusBar").backgroundColor = new Color(config.application.STATUS_COLOR).ios;
        }
        else {
            application.android.startActivity.getWindow().setStatusBarColor(new Color(config.application.STATUS_COLOR).android);
        }
        this.firebaseService.initFireBase({
            onMessageReceivedCallback: function (message: Message) {
                console.log("success firebase : ", message);
                alert(message.body);
            },
            onPushTokenReceivedCallback: function (token: string) {
                console.log("receive token", token);
            }
        });
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
        this.odooSDKService.getDbList(serverUrl)
            .then((data: Array<string>) => {
                console.log("----onServerUrlInputBlur - getDbList: ", data);
                self.localStorageService.set("config", {
                    dbName: data[3],
                    serverUrl: serverUrl
                });
            })
            .catch((error) => {
                console.log("----onServerUrlInputBlur - getDbList error: ", error);
            });
        // setTimeout(function () {
        //     hideLoadingIndicator();
        // }, 1000)
    }

    onTapLogin(args) {
        console.log("onTapLogin");

        // this.odooSDKService.login("admin", "smartcare@123")
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
    refreshList(args) {
        console.log("args");
        args.object.refreshing = false;
    }
}