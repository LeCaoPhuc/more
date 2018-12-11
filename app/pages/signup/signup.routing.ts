import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SignUpComponent } from "./signup.component";
import { RoutingPath } from "~/app-routing.module"

const routes: Routes = [
    { path: RoutingPath.SIGN_UP, component: SignUpComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SignUpRoutingModule { }
