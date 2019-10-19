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


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule,

    SegurancaModule,
    CategoriaModule,
    ProdutoModule,
  ],
  exports: [],
  providers: [
    MessageService,
    CategoriaService,
    ProdutoService,
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ]
})
export class CoreModule { }
