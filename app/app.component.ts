import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { ShareDataService, SideDrawerService } from "~/shared";
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
    constructor(
        public translate: TranslateService,
        public shareDataService: ShareDataService,
        public sideDrawerService: SideDrawerService,
    ) {
        translate.setDefaultLang('en');
        translate.use("en");
        sideDrawerService.init();
        shareDataService.setData("akaNoArcher", "Atalanta Alter");

    }
}
