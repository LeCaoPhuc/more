import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { ShareDataService } from '~/shared/services';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SideDrawerService, MultiLanguageService, OdooService, LocalStorageService, FirebaseService } from "./services";
import { NgShadowModule } from "nativescript-ngx-shadow";
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}
@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptHttpClientModule,
        NgShadowModule,
        TNSFontIconModule.forRoot({
            'mdi': 'fonts/material-design-icons.css'
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        ShareDataService,
        SideDrawerService,
        MultiLanguageService,
        OdooService,
        LocalStorageService,
        FirebaseService
    ],
    exports: [
        NativeScriptModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        TNSFontIconModule,
        TranslateModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        NgShadowModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }