import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { LeftMenuComponent } from "./left-menu.component";
import { SharedModule } from "~/shared/shared.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        SharedModule
    ],
    declarations: [
        LeftMenuComponent
    ],
    bootstrap: [LeftMenuComponent],
    exports: [LeftMenuComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LeftMenuModule { }
