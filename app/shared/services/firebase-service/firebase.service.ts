import * as firebase from "nativescript-plugin-firebase";
import { Message } from "nativescript-plugin-firebase";
import { Injectable } from "@angular/core";

@Injectable()
export class FirebaseService {
    constructor(
    ) { }

    initFireBase(params: {
        onMessageReceivedCallback: (message: Message) => void,
        onPushTokenReceivedCallback: (token: string) => void,
    }) {
        var self = this;
        return new Promise(function (resolve, reject) {
            firebase.getCurrentPushToken()
                .then((token) => {
                    console.log("---getCurrentToken success: ", token);
                    if (token) {
                        firebase.addOnMessageReceivedCallback(params.onMessageReceivedCallback)
                            .then(() => {
                                console.log("---addOnMessageReceivedCallback success");
                            })
                            .catch((error) => {
                                console.log("---addOnMessageReceivedCallback failed: ", error);
                            });
                        params.onPushTokenReceivedCallback(token);
                        resolve();
                    }
                    else {
                        self.init(params);
                    }
                })
                .catch((error) => {
                    console.log("---getCurrentToken failed: ", error);
                    self.init(params);
                });
        });
    }

    init(params: {
        onMessageReceivedCallback: (message: Message) => void,
        onPushTokenReceivedCallback: (token: string) => void,
    }) {
        return new Promise(function (resolve, reject) {
            firebase.init({
                onMessageReceivedCallback: params.onMessageReceivedCallback,
                onPushTokenReceivedCallback: params.onPushTokenReceivedCallback
            }).then((res) => {
                firebase.getCurrentPushToken()
                    .then((token) => {
                        console.log("---getCurrentToken success: ", token);
                        if (token) {
                            firebase.addOnMessageReceivedCallback(params.onMessageReceivedCallback)
                                .then(() => {
                                    console.log("---addOnMessageReceivedCallback success");
                                })
                                .catch((error) => {
                                    console.log("---addOnMessageReceivedCallback failed: ", error);
                                });
                            params.onPushTokenReceivedCallback(token);
                            resolve();
                        }
                        else {
                            reject();
                        }
                    }).catch((error) => {
                        reject(error);
                    });
            })
        })
    }

    unregisterForPushNotifications() {
        return firebase.unregisterForPushNotifications();
    }

    getCurrentToken() {
        return firebase.getCurrentPushToken();
    }

    onMessageReceivedCallback(callback: (data: Message) => void) {
        return firebase.addOnMessageReceivedCallback(callback);
    }
}