import { NgModule }              from "@angular/core";
import { BrowserModule }         from "@angular/platform-browser";
import { HttpClientModule,
         HttpClient,
         HTTP_INTERCEPTORS }     from "@angular/common/http"

import { ROUTER }                from "./lib/app.routing";

import { LayoutModule }          from "./components/layout/layout.module";
import { IndexModule }           from "./components/pages/index/index.module";

import { LayoutComponent }       from "./components/layout/component/layout.component";

import { PageNotFoundComponent } from "./components/pages/404/404.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        ROUTER,

        LayoutModule,

        IndexModule
    ],
    declarations: [
        PageNotFoundComponent
    ],
    providers: [],
    bootstrap: [
        LayoutComponent
    ]
})
export class AppModule {}