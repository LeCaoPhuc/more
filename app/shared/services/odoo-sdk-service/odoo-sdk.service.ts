import { Injectable, Inject } from "@angular/core";

import { MultiLanguageService } from "~/shared/services/multi-language-service/multi-language.service";
import { ShareDataService } from "~/shared/services/share-data-service/share-data.service";
import { LocalStorageService } from "~/shared/services/local-storage-service/local-storage.service";
import { config } from "~/config";
import * as http from "http";
import { OdooUserModel } from "~/shared/index";
import { showToast, checkInternetConnection } from "~/utils";

@Injectable()
export class OdooSDKService {
    constructor(
        @Inject(ShareDataService) public sharedDataService: ShareDataService,
        @Inject(MultiLanguageService) public multiLanguageService: MultiLanguageService,
        @Inject(LocalStorageService) public localStorageService: LocalStorageService,
    ) {
        this.sharedDataService.setData("currentUser", this.getCurrentUser());
    }

    checkInternetConnection() {
        if (!checkInternetConnection()) {
            showToast(this.multiLanguageService.get('COMMON_ERROR_MESSAGE.NO_INTERNET_CONNECTION'));
            Promise.reject("No Internet Connection");
            return;
        }
    }

    setSessionId(sessionId) {
        this.localStorageService.set('session_id', sessionId);
    }

    getSessionId() {
        return this.localStorageService.get('session_id');
    }

    getCurrentUser(): OdooUserModel {
        let currentUser: any = this.localStorageService.get('current_user');
        if (currentUser)
            return JSON.parse(currentUser);
        return null;
    }

    getContext() {
        if (this.getCurrentUser() && this.getCurrentUser().user_context)
            return this.getCurrentUser().user_context;
        else return null;
    }

    buildHeader() {
        return {
            "Content-Type": "application/json",
            "X-Openerp-Session-Id": this.getSessionId() || Math.ceil(Math.random() * 100000000000000)
        };
    }

    buildParams(params?: any) {
        return JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: params,
        });
    }

    login(userName, password) {
        this.checkInternetConnection();
        let self = this;
        return http.request({
            url: this.localStorageService.get("config").serverUrl + config.odoo.authenUrl,
            headers: this.buildHeader(),
            method: 'POST',
            content: this.buildParams({
                db: this.localStorageService.get("config").dbName,
                login: userName,
                password: password
            })
        }).then(res => {
            if (res && res.content && res.content.toJSON) {
                let data = res.content.toJSON();
                if (data.error) {
                    return self.handleOdooErrors(data);
                } else {
                    self.setSessionId(data.result.session_id);
                    this.localStorageService.set('current_user', JSON.stringify(data.result));
                    self.sharedDataService.setData("currentUser", self.getCurrentUser());
                    return Promise.resolve(data.result);
                }
            } else {
                return Promise.reject({
                    message: 'Login error'
                });
            }
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    logout() {
        this.localStorageService.set('session_id', '');
        this.localStorageService.set('current_user', '');
    }

    public getDbList(serverUrl?: string) {
        this.checkInternetConnection();
        let self = this;
        if (!serverUrl) {
            serverUrl = this.localStorageService.get("config").serverUrl;
        }
        return http.request({
            headers: this.buildHeader(),
            url: serverUrl + config.odoo.getDBList,
            method: 'POST',
            content: this.buildParams({
                context: {}
            })
        }).then((res) => {
            if (res && res.content && res.content.toJSON) {
                let data = res.content.toJSON();
                if (data.error) {
                    return self.handleOdooErrors(data);
                } else {
                    return Promise.resolve(data.result);
                }
            } else {
                return Promise.reject({
                    message: 'API error'
                });
            }
        }).catch((err) => {
            return Promise.reject(err);
        });
    }

    searchRead(params: {
        model: string, domain?: Array<any>, fields?: Array<string>, limit?: number, offset?: number, context?: any, sort?: string
    }) {
        this.checkInternetConnection();
        let self = this;
        if (!params.context) params.context = this.getContext() || {};
        if (!params.domain) params.domain = [];
        return http.request({
            url: this.localStorageService.get("config").serverUrl + config.odoo.searchRead,
            headers: this.buildHeader(),
            method: 'POST',
            content: this.buildParams(params)
        }).then(res => {
            if (res && res.content && res.content.toJSON) {
                let data = res.content.toJSON();
                if (data.error) {
                    return self.handleOdooErrors(data);
                } else {
                    return Promise.resolve(data.result);
                }
            } else {
                return Promise.reject({
                    message: 'API error'
                });
            }
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    callKW(params: {
        model: string, method: string, args: any, kwargs: any
    }) {
        this.checkInternetConnection();
        let self = this;
        params.kwargs = params.kwargs || {};
        params.kwargs.context = params.kwargs.context || {};
        (<any>Object).assign(params.kwargs.context, this.getContext());
        return http.request({
            url: this.localStorageService.get("config").serverUrl + config.odoo.callKW,
            headers: this.buildHeader(),
            method: 'POST',
            content: this.buildParams(params)
        }).then(res => {
            if (res && res.content && res.content.toJSON) {
                let data = res.content.toJSON();
                if (data.error) {
                    return self.handleOdooErrors(data);
                } else {
                    return Promise.resolve(data.result);
                }
            } else {
                return Promise.reject({
                    message: 'API error'
                });
            }
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    createRecrod(params: {
        model: string,
        args: Array<{ [key: string]: any }>;
        kwargs?: any;
    }) {
        return this.callKW({
            model: params.model,
            method: 'create',
            args: params.args,
            kwargs: params.kwargs || {}
        });
    }

    updateRecord(params: {
        model: string,
        args: [Array<number>, { [key: string]: any }];
        kwargs?: any;
    }) {
        return this.callKW({
            model: params.model,
            method: 'write',
            args: params.args,
            kwargs: params.kwargs || {}
        });
    }

    updateResUsers(context: any) {
        let args = [[this.getContext().uid], context];
        return this.callKW({
            model: 'res.users',
            method: 'write',
            args: args,
            kwargs: {}
        });
    }

    handleOdooErrors(response: any) {
        if (!response.error) {
            return Promise.reject(response.result);
        }

        let error = response.error;
        let errorObj = {
            title: "    ",
            message: "",
            fullTrace: error
        };

        if (error.code === 200 && error.message === "Odoo Server Error" && error.data.name === "werkzeug.exceptions.NotFound") {
            errorObj.title = "page_not_found";
            errorObj.message = "HTTP Error";
        } else if ((error.code === 100 && error.message === "Odoo Session Expired") || // v8
            (error.code === 300 && error.message === "OpenERP WebClient Error" && error.data.debug.match("SessionExpiredException")) // v7
        ) {
            errorObj.title = "session_expired";
            this.logout();
        } else if ((error.message === "Odoo Server Error" && /FATAL:  database "(.+)" does not exist/.test(error.data.message))) {
            errorObj.title = "database_not_found";
            errorObj.message = error.data.message;
        } else if ((error.data.name === "openerp.exceptions.AccessError")) {
            errorObj.title = "AccessError";
            errorObj.message = error.data.message;
        } else {
            let split = ("" + error.data.fault_code).split("\n")[0].split(" -- ");
            if (split.length > 1) {
                error.type = split.shift();
                error.data.fault_code = error.data.fault_code.substr(error.type.length + 4);
            }

            if (error.code === 200 && error.type) {
                errorObj.title = error.type;
                errorObj.message = error.data.fault_code.replace(/\n/g, "<br />");
            } else {
                errorObj.title = error.message;
                errorObj.message = error.data.debug.replace(/\n/g, "<br />");
            }
        }
        return Promise.reject(errorObj);
    }

}
