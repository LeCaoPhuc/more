// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScript } from "nativescript-angular/platform-static";
import { enableProdMode } from "@angular/core";
import { AppModuleNgFactory } from "./app.module.ngfactory";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as application from "application";
import { AppModule } from "./app.module";
import * as fresco from "nativescript-fresco";
import { on as applicationOn, launchEvent, ApplicationEventData } from "application";
declare var IQKeyboardManager: any;
import { config } from "~/config";
let nsFacebook = require('nativescript-facebook');
application.on(application.launchEvent, function (args) {
    nsFacebook.init(config.application.FACEBOOK_ID, nsFacebook.LoginBehavior.LoginBehaviorWeb);
});
if (application.ios) {
    const iqKeyboard = IQKeyboardManager.sharedManager();
    iqKeyboard.overrideKeyboardAppearance = true;
    iqKeyboard.shouldResignOnTouchOutside = true;
}
else {
    applicationOn(launchEvent, function (args: ApplicationEventData) {
        if (args.android) {
            fresco.initialize();
        }
    });
}
enableProdMode();
platformNativeScript().bootstrapModuleFactory(AppModuleNgFactory);
