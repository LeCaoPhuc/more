import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ErrorMessageComponent } from "./error-message.component";
import { SharedModule } from "~/shared/shared.module";
@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        SharedModule
    ],
    declarations: [
        ErrorMessageComponent
    ],
    exports: [ErrorMessageComponent],
})
export class ErrorMessageModule { }
