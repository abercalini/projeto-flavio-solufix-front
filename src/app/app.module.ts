import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';

import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppBreadcrumbComponent} from './app.breadcrumb.component';
import { AppFooterComponent } from './app.footer.component';
import { AppTopBarComponent } from './app.topbar.component';

import { CoreModule } from './core/core.module';

import { ScrollPanelModule } from 'primeng/scrollpanel';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,

        ScrollPanelModule,

        CoreModule,
        RouterModule
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppBreadcrumbComponent,
        AppTopBarComponent,
        AppFooterComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: PathLocationStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
