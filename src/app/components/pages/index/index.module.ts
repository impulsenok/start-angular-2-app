import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { INDEX_ROUTES } from "./index.route";

import { IndexComponent } from "./component/index.component";

import { ComponentsProviderModule } from "../../../providers/components-provider.module";

@NgModule({
    imports: [
        CommonModule,
        ComponentsProviderModule,
        INDEX_ROUTES
    ],
    declarations: [
        IndexComponent
    ]
})

export class IndexModule {}