import { Component, OnInit } from "@angular/core";
import * as moment from 'moment';
import { TranslateService } from "ng2-translate";
import { ShareDataService, SideDrawerService } from "~/shared";
import * as platform from "platform";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
    selector: "left-menu",
    moduleId: module.id,
    templateUrl: "./left-menu.html",
    styleUrls: ["./left-menu.css"],
})
export class LeftMenuComponent implements OnInit {
    public
    constructor(
        public translateService: TranslateService,
        public shareDataService: ShareDataService,
        public sideDrawerService: SideDrawerService,
    ) {
    }

    ngOnInit(): void {

    }

    public closeDrawer() {
        this.sideDrawerService.closeDrawer();
    }
}