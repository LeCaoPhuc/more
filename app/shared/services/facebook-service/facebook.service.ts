// import * as firebase from "nativescript-plugin-firebase";
// import { Message } from "nativescript-plugin-firebase";
// import { Injectable, Inject } from "@angular/core";
// import { MultiLanguageService } from "~/shared/services/multi-language-service/multi-language.service";
// import * as Facebook from "nativescript-facebook";
// import * as http from "tns-core-modules/http";
// import { config } from "~/config"
// @Injectable()
// export class FacebookService {
//     public fbToken: string;
//     constructor(
//         @Inject(MultiLanguageService) public multiLanguageService: MultiLanguageService,
//     ) {

//     }

//     logIn() {
//         let self = this;
//         return new Promise(function (resolve, reject) {
//             Facebook.login(function (error: string, fbData: any) {
//                 if (error) {
//                     reject(error);
//                 }
//                 else {
//                     if (fbData && fbData.token) {
//                         self.fbToken = fbData.token;
//                         resolve(fbData.token);
//                     }
//                     else {
//                         reject({
//                             message: self.multiLanguageService.get("ERROR_MESSAGE_GENERAL.TOKEN_FB_NULL")
//                         })
//                     }
//                 }
//             });
//         })
//     }

//     logOut() {
//         return new Promise(function (resolve, reject) {
//             Facebook.logout(function () {
//                 console.log("logOut");
//                 resolve();
//             })
//         })
//     }

//     getUserFacebookInfo() {
//         let self = this;
//         http.getJSON(config.application.FACEBOOK_API_URL + "/me?access_token=" + self.fbToken).then((res) => {
//             if (res) {
//                 Promise.resolve({
//                     userFullName: res["name"],
//                     userId: res["id"]
//                 })
//             }
//             else {
//                 Promise.reject({
//                     message: self.multiLanguageService.get("ERROR_MESSAGE_GENERAL.USER_FB_INFO_NULL")
//                 })
//             }
//         }, function (err) {
//             Promise.reject({
//                 message: self.multiLanguageService.get("ERROR_MESSAGE_GENERAL.GET_DATA_FB_ERROR")
//             })
//         });
//     }

//     getFbAvatar(userId: string) {
//         let self = this
//         http.getJSON(config.application.FACEBOOK_API_URL + "/" + userId + "/picture?type=large&redirect=false&access_token=" + self.fbToken).then((res) => {
//             if (res && res["data"] && res["data"]["url"]) {
//                 Promise.resolve({
//                     avatarUrl: res["data"]["url"]
//                 })
//             }
//             else {
//                 Promise.reject({
//                     message: self.multiLanguageService.get("ERROR_MESSAGE_GENERAL.USER_FB_INFO_NULL")
//                 })
//             }
//         }, function (err) {
//             Promise.reject({
//                 message: self.multiLanguageService.get("ERROR_MESSAGE_GENERAL.GET_DATA_FB_ERROR")
//             })
//         });
//     }
// }