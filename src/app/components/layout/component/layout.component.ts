import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "my-app",
    template: require("./layout.component.pug"),
    styleUrls: [ "layout.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {}