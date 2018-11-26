import * as commonModule from "./nativescript-fresco-common";
export declare class FrescoDrawee extends commonModule.FrescoDrawee {
    isLoading: boolean;
    resize: string;
    nativeView: any;
    circle: boolean;
    showIndicator: boolean;
    placeholderImage: string;
    failureImage: string;
    constructor();
    readonly ios: any;
    createNativeView(): any;
    initNativeView(): void;
    loadImageFromUri(src?: string): void;
    checkAndSetCircleImage(): void;
    resizeImage(): void;
}
