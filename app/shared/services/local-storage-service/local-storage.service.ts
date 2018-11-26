import { Injectable } from "@angular/core";
import * as localStorage from "nativescript-localstorage";

@Injectable()

export class LocalStorageService {
    constructor() {
    }
    get(key: string) {
        return localStorage.getItem(key);
    }

    set(key: string, value: any) {
        localStorage.setItem(key, value);
    }
}