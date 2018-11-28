import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { TNSFrescoModule } from "nativescript-fresco/angular";
import { HomeModule } from "./pages";
import {
    SharedModule,
    LeftMenuModule
} from "./shared";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
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
