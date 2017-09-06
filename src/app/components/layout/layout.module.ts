import { NgModule }     from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { LayoutComponent } from "./component/layout.component";

import { ComponentsProviderModule } from "../../providers/components-provider.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ComponentsProviderModule
    ],
    declarations: [
        LayoutComponent
    ]
})

export class LayoutModule {}