import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { NewsItemComponent } from "./news-item.component";
import { SharedModule } from "~/shared/shared.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        SharedModule
    ],
    declarations: [
        NewsItemComponent
    ],
    bootstrap: [NewsItemComponent],
    exports: [NewsItemComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NewsItemModule { }
