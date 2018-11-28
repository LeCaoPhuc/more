import { Injectable, Inject } from "@angular/core";
import { MultiLanguageService } from "../multi-language-service/multi-language.service";
import { LocalStorageService } from "../local-storage-service/local-storage.service";

@Injectable()
export class OdooService {

    constructor(
        @Inject(MultiLanguageService) public multiLanguageService: MultiLanguageService,
        @Inject(LocalStorageService) public localStorageService: LocalStorageService,
    ) {
    }

    isAvailableServerUrlAndDatabase(): boolean {
        return Boolean(this.getServerUrl() && this.getDatabaseName());
    }

    setServerUrl(serverUrl: string) {
        if (serverUrl == null) {
            this.localStorageService.remove("serverUrl");
        }
        else {
            this.localStorageService.set("serverUrl", serverUrl);
        }
    }

    setDatabaseName(databaseName: string) {
        if (databaseName == null) {
            this.localStorageService.remove("databaseName");
        }
        else {
            this.localStorageService.set("databaseName", databaseName);
        }
    }

    getServerUrl(): string {
        if (this.localStorageService.get("serverUrl") && this.localStorageService.get("serverUrl").trim() !== "") {
            return this.localStorageService.get("serverUrl");
        }
        return null;
    }

    getDatabaseName(): string {
        if (this.localStorageService.get("databaseName") && this.localStorageService.get("databaseName").trim() !== "") {
            return this.localStorageService.get("databaseName");
        }
        return null;
    }
}