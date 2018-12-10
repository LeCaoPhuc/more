import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeComponent } from "~/pages/home/home.component";
import { LoginComponent } from "~/pages/login/login.component";

export class RoutingPath {
    public static LOGIN_SCREEN = "login";
    public static HOME_SCREEN = "home";
}

const routes: Routes = [
    { path: "", redirectTo: RoutingPath.HOME_SCREEN, pathMatch: "full" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
