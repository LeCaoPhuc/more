import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeComponent } from "./home.component";
import { HomeGuard } from "~/shared/services/guard-services/home-guard.service";
import { RoutingPath } from "~/app-routing.module";

const routes: Routes = [
    { path: RoutingPath.HOME_SCREEN, component: HomeComponent, canActivate: [HomeGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
