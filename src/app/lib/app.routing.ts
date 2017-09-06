import { ModuleWithProviders }   from "@angular/core";
import { RouterModule, Routes }  from "@angular/router";

import { PageNotFoundComponent } from "../components/pages/404/404.component";

const APP_ROUTES: Routes = [
    {
        path: "**",
        component: PageNotFoundComponent
    }
];

export const ROUTER: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);