import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "error-message",
    styleUrls: ["./error-message.css"],
    templateUrl: "./error-message.html"
})
export class ErrorMessageComponent {
    @Input() model: any;
    @Input() errorMessage: any;
    constructor(
    ) {
    }



}