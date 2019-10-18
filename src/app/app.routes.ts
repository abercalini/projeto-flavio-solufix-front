import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import { LoginFormComponent } from './seguranca/login-form/login-form.component';

export const routes: Routes = [
  {path: 'login', component: LoginFormComponent}
];


export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
