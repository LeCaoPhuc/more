import { Component, OnInit } from "@angular/core";
import * as moment from 'moment';
import { TranslateService } from "ng2-translate";
import { ShareDataService } from "~/shared";
import * as platform from "platform";
@Component({
    selector: "news-item",
    moduleId: module.id,
    templateUrl: "./news-item.html",
    styleUrls: ["./news-item.css"],
})
export class NewsItemComponent implements OnInit {
    public screenHeight: number;
    public screenWidth: number;
    constructor(
        public translateService: TranslateService,
        public shareDataService: ShareDataService,
    ) {
        this.screenWidth = platform.screen.mainScreen.widthDIPs;
        this.screenHeight = platform.screen.mainScreen.heightDIPs;
    }

    ngOnInit(): void {

        console.log("ngOnInit");
    }
}