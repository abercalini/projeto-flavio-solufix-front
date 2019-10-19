import { RouterModule } from '@angular/router';
import {NgModule, LOCALE_ID} from '@angular/core';
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
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { ConfirmationService } from 'primeng/primeng';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,

        ScrollPanelModule,
        ToastModule,
        ConfirmDialogModule,

        CoreModule,
        RouterModule,

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
        ConfirmationService,
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
