import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
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
        translate.setDefaultLang('vi');
        translate.use("vi");
        sideDrawerService.init();
        shareDataService.setData("akaNoArcher", "Atalanta Alter");

    }
}
