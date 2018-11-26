// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as application from "application";
import { AppModule } from "./app.module";
import * as fresco from "nativescript-fresco";
import { on as applicationOn, launchEvent, ApplicationEventData } from "application";
declare var IQKeyboardManager: any;
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

platformNativeScriptDynamic().bootstrapModule(AppModule);
