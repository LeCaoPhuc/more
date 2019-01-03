import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { OdooService, LocalStorageService, MultiLanguageService, SideDrawerService, UserService, FacebookService } from "~/shared/services/index";
import { showLoadingIndicator, hideLoadingIndicator, showSnackBar } from "~/utils";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { RoutingPath } from "~/app-routing.module";
import { OdooClient } from "nativescript-odoo/odoo-api/odoo-client";
import { OdooUser } from "nativescript-odoo/odoo-api/odoo-user";
import { config } from "~/config";
import { SnackBar } from "nativescript-snackbar";
import * as http from "http";
@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "./login.html",
    styleUrls: ["./login.scss"]
})

export class LoginComponent implements OnInit {
    @ViewChild('username') username: any
    @ViewChild('password') password: any
    public dataLogin = {
        username: {
            value: "",
            maxLength: 32,
            errorMessage: {
                required: this.multiLanguageService.get("LOGIN.ERROR_MESSAGE.USERNAME_REQUIRE")
            }
        },
        password: {
            value: "",
            maxLength: 32,
            errorMessage: {
                required: this.multiLanguageService.get("LOGIN.ERROR_MESSAGE.PASSWORD_REQUIRE")
            }
        }
    };
    public odooClient: OdooClient;
    constructor(
        public routerExtensions: RouterExtensions,
        public sideDrawerService: SideDrawerService,
        public multiLanguageService: MultiLanguageService,
        public userService: UserService,
        public odooService: OdooService,
        public facebookService: FacebookService,
        public page: Page
    ) {
        this.page.actionBarHidden = true;
        let self = this;
        let interval = setInterval(function () {
            if (self.sideDrawerService.sideDrawer) {
                self.sideDrawerService.sideDrawer.gesturesEnabled = false;
                clearInterval(interval);
            }
        }, 10);
        this.odooClient = OdooClient.getInstance();
        this.odooClient.setServerUrl(config.application.SERVER_URL);
        odooService.setServerUrl(config.application.SERVER_URL);
        odooService.setDatabaseName(config.application.DATABASE_NAME);
    }

    ngOnInit() {
        console.log("ngOnInit");
    }

    onTapLogin(args) {
        console.log("onTapLogin");


        // if (this.validate()) {
        this.login(this.dataLogin.username.value, this.dataLogin.password.value);
        // }
    }

    login(username: string, password) {
        let self = this;
        self.odooClient.authenticate('admin', '123456@1', 'moretarget-06-12-2018')
            .then((user: any) => {
                self.getUserInfo(user.sessionId);
            })
            .catch((error) => {
                // self.getUserInfo();
                console.log(error);
            });
    }


    validate() {
        this.dataLogin.username.value = this.dataLogin.username.value ? this.dataLogin.username.value.trim() : '';
        this.dataLogin.password.value = this.dataLogin.password.value ? this.dataLogin.password.value.trim() : '';
        if (this.username.invalid || this.password.invalid) {
            this.username.control.touched = true;
            this.password.control.touched = true;
            return false;
        }
        return true;
    }
    onTapSignUp(args) {
        this.routerExtensions.navigate([RoutingPath.SIGN_UP], {
            transition: config.application.NAVIGATION_TRANSITION
        })
    }

    goToHomeScreen() {
        this.routerExtensions.navigate([RoutingPath.HOME_SCREEN], {
            clearHistory: true,
            transition: config.application.NAVIGATION_TRANSITION
        });
    }

    getUserInfo(session_id) {
        console.log("session_id=" + session_id)
        let self = this;
        self.userService.getUserInfo();
    }

    onFacebookLoginTap(args) {
        let self = this;
        this.facebookService.logIn()
            .then(function (res) {
                console.log(res);
                self.facebookService.getUserFacebookInfo()
                    .then(function (res: any) {
                        console.log(res);
                        // alert("userFullName : " + res.userFullName + '\n userId : ' + res.userId);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            })
            .catch(function (err) {
                console.log(err);
                // alert(err);
            })
    }
}