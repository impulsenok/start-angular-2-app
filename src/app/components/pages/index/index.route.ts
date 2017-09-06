import { ModuleWithProviders }  from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IndexComponent }       from "./component/index.component";

const MODULE_ROUTES: Routes = [{
    path: "",
    component: IndexComponent
}];

export const INDEX_ROUTES: ModuleWithProviders = RouterModule.forChild(MODULE_ROUTES);