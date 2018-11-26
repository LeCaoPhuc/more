import { Injectable, Inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class MultiLanguageService {
    constructor(
        @Inject(TranslateService) public translateService: TranslateService,
    ) { }

    get(key: string): string {
        return (this.translateService.get(key) as any).value;
    }

}
