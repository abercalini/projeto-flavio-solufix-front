import { PaginaNaoEncontradaComponent } from './seguranca/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { GuardGuard } from './seguranca/guard.guard';
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import { CategoriaCadastroComponent } from './categoria/categoria-cadastro/categoria-cadastro.component';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { ProdutoPesquisaComponent } from './produto/produto-pesquisa/produto-pesquisa.component';
import { ProdutoCadastroComponent } from './produto/produto-cadastro/produto-cadastro.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado/nao-autorizado.component';

export const routes: Routes = [
  {path: 'login', component: LoginFormComponent},

  {path: 'categoria/novo', component: CategoriaCadastroComponent,
    canActivate: [GuardGuard], data: {roles: ['ROLE_PESQUISAR_CATEGORIA']}},

  {path: 'produto/novo', component: ProdutoCadastroComponent,
    canActivate: [GuardGuard], data: {roles: ['ROLE_CADASTRAR_PRODUTO']}},
  {path: 'produto', component: ProdutoPesquisaComponent,
    canActivate: [GuardGuard], data: {roles: ['ROLE_PESQUISAR_PRODUTO']}},
  {path: 'produto/:codigo', component: ProdutoCadastroComponent,
    canActivate: [GuardGuard], data: {roles: ['ROLE_CADASTRAR_PRODUTO']}},

  {path: 'nao-autorizado', component: NaoAutorizadoComponent},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'pagina-nao-encontrada', pathMatch: 'full'}

];


export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
