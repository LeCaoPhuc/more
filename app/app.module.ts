import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { TNSFrescoModule } from "nativescript-fresco/angular";
import { HomeModule } from "./pages/home/home.module";
import { LoginModule } from "./pages/login/login.module";
import {
    SharedModule,
    LeftMenuModule
} from "./shared";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
registerElement("Gradient", () => require("nativescript-gradient").Gradient);
// registerElement('ImageCacheIt', () => require('nativescript-image-cache-it').ImageCacheIt);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        SharedModule,
        HomeModule,
        LoginModule,
        LeftMenuModule,
        TNSFrescoModule
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
