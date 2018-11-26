import { Injectable, ChangeDetectorRef } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";

@Injectable()
export class SideDrawerService {
    public sideDrawer: RadSideDrawer;

    constructor(
        // private changeDetectorRef: ChangeDetectorRef
    ) {

    }
    public init() {
        var self = this;
        var interval = setInterval(function () {
            if (self.sideDrawer) {
                clearInterval(interval);
            }
            else {
                self.sideDrawer = <RadSideDrawer>app.getRootView();
                // self.changeDetectorRef.detectChanges();
            }
        }, 10)
    }
    public openDrawer() {
        this.sideDrawer.showDrawer();
    }
    public closeDrawer() {
        this.sideDrawer.closeDrawer();
    }
}