import { Injectable, Inject } from "@angular/core";
import { OdooService } from "../odoo-service/odoo.service";
import { OdooClient } from "nativescript-odoo/odoo-api/odoo-client";


@Injectable()
export class UserService {

    public static TAB_CONFIG = {
        REPORT_TAB: false,
        GRAPH_TAB: false,
        SALE_ORDER_TAB: false,
        CRM_TAB: false,
        MENU_TAB: true,
    };

    constructor(
        @Inject(OdooService) public odooService: OdooService
    ) { }

    sendFCMToken(params: {
        fcmToken: string
    }) {
        return OdooClient.getInstance().callKW({
            model: 'res.users',
            method: 'add_fcm_token',
            args: [params.fcmToken],
            kwargs: null
        });
    }

    login(params: {
        username: string,
        password: string
    }) {
        return OdooClient.getInstance().authenticate(params.username, params.password, this.odooService.getDatabaseName());
    }

    logout() {
        this.sendFCMToken({
            fcmToken: ""
        }).then(() => {
            console.log("---removeFCMToken success: ");
        }).catch((error) => {
            console.log("---removeFCMToken failed: ", error);
        });
        return OdooClient.getInstance().logout();
    }

    getUserInfo() {
        let odooClient = OdooClient.getInstance();
        OdooClient.getInstance().callKW({
            model: "res.users",
            method: "read",
            args: [[OdooClient.getInstance().getCurrentUser().context.uid]]
        }).then((result) => {
            console.log("---getUserInfo: ", result);
        }).catch((error) => {
            console.error(error);
        });
    }

    getUserFeaturePermission() {

    }
}