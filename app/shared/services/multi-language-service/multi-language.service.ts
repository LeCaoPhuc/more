import { Injectable, Inject } from "@angular/core";
import { TranslateService } from "ng2-translate";

@Injectable()
export class MultiLanguageService {
    constructor(
        @Inject(TranslateService) public translateService: TranslateService,
    ) { }

    get(key: string): string {
        return (this.translateService.get(key) as any).value;
    }

}
