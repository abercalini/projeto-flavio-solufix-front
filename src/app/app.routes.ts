import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import { CategoriaCadastroComponent } from './categoria/categoria-cadastro/categoria-cadastro.component';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { ProdutoPesquisaComponent } from './produto/produto-pesquisa/produto-pesquisa.component';
import { ProdutoCadastroComponent } from './produto/produto-cadastro/produto-cadastro.component';

export const routes: Routes = [
  {path: 'login', component: LoginFormComponent},

  {path: 'categoria/novo', component: CategoriaCadastroComponent},

  {path: 'produto/novo', component: ProdutoCadastroComponent},
  {path: 'produto', component: ProdutoPesquisaComponent},
  {path: 'produto/:codigo', component: ProdutoCadastroComponent},

];


export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
