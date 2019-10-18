import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import { CategoriaCadastroComponent } from './categoria/categoria-cadastro/categoria-cadastro.component';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';

export const routes: Routes = [
  {path: 'login', component: LoginFormComponent},

  {path: 'categoria/novo', component: CategoriaCadastroComponent}
];


export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
