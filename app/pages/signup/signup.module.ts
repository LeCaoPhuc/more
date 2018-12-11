import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { SignUpComponent } from "./signup.component";
import { SharedModule } from "~/shared/shared.module";
import { SignUpRoutingModule } from "./signup.routing";

@NgModule({
    imports: [
        SharedModule,
        SignUpRoutingModule
    ],
    declarations: [
        SignUpComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SignUpModule { }