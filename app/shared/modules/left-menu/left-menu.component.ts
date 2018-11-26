import { Component, OnInit } from "@angular/core";
import * as moment from 'moment';
import { TranslateService } from "@ngx-translate/core";
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