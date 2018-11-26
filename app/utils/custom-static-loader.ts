import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";
import { Http, HttpModule, Response } from "@angular/http";
import { map } from "rxjs-compat/operator/map";
import "rxjs-compat/add/observable/of";
import "rxjs-compat/add/operator/share";
import "rxjs-compat/add/operator/map";
import "rxjs-compat/add/operator/merge";
import "rxjs-compat/add/operator/toArray";
import "rxjs-compat/add/operator/take";
import 'rxjs-compat/operator/map';
import 'rxjs-compat/operators/map';
export class CustomTranslateStaticLoader extends TranslateLoader { // custom class to load json from local to fix error when uglify function http.get
    public http: Http;
    public prefix: String;
    public suffix: String;
    constructor(http: Http, prefix, suffix) {
        super();
        this.http = http;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    getTranslation(lang: string) {

        return this.http.get(this.prefix + "/" + lang + this.suffix)
            .pipe()
            .map(function (res) {
                return res.json();
            })
    }
}