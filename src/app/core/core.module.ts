import { UsuarioModule } from './../usuario/usuario.module';
import { GuardGuard } from './../seguranca/guard.guard';
import { ProdutoService } from './../produto/produto.service';
import { CategoriaService } from './../categoria/categoria.service';
import { HttpErrorInterceptor } from './../seguranca/httpErrorInterceptor ';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CategoriaModule } from './../categoria/categoria.module';
import { SegurancaModule } from './../seguranca/seguranca.module';
import { ProdutoModule } from './../produto/produto.module';

import { MessageService } from 'primeng/primeng';
import { Title } from '@angular/platform-browser';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';
import { MenuModule } from '../menu/menu.module';
import { UsuarioService } from '../usuario/usuario.service';


@NgModule({
  declarations: [

  NaoAutorizadoComponent],
  imports: [
    CommonModule,
    RouterModule,

    SegurancaModule,
    CategoriaModule,
    ProdutoModule,
    MenuModule,
    UsuarioModule
  ],
  exports: [],
  providers: [
    MessageService,
    CategoriaService,
    ProdutoService,
    UsuarioService,
    Title,
    GuardGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ]
})
export class CoreModule { }
