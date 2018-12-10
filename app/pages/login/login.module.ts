import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { LoginComponent } from "./login.component";
import { LoginGuard } from "~/shared/services/guard-services/login-guard.service";
import { SharedModule } from "~/shared/shared.module";
import { LoginRoutingModule } from "./login.routing";

@NgModule({
    imports: [
        SharedModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }