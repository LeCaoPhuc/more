import * as connectivity from "connectivity";
import * as Toast from "nativescript-toast";
import * as application from "application";
import { SnackBar } from "nativescript-snackbar";
const LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
const loadingIndicator = new LoadingIndicator();
const loadingIndicatorOptions = {
    ios: {
        dimBackground: true
    }
};
export function checkInternetConnection() {
    let connectionType = connectivity.getConnectionType();
    if (connectionType === connectivity.connectionType.none) {
        return false;
    }
    return true;
}

export function showToast(message: string, longTime?: boolean) {
    if (longTime) {
        Toast.makeText(message, Toast.duration.long[0]);
    }
    else {
        Toast.makeText(message).show();
    }
}

export function showLoadingIndicator(message?: string) {
    loadingIndicator.show({
        message: message,
        ios: loadingIndicatorOptions.ios
    });
}

export function hideLoadingIndicator() {
    loadingIndicator.hide();
}

export function showSnackBar(message: string) {
    let snackBar = new SnackBar();
    snackBar.simple(message);
}