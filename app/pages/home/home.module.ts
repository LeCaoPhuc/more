import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.routing";
import { SharedModule } from "~/shared/shared.module";
import { NewsItemModule } from "~/shared/modules";
import { HomeGuard } from "~/shared/services/guard-services/home-guard.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        SharedModule,
        HomeRoutingModule,
        NewsItemModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        HomeGuard
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
