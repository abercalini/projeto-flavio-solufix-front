import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [LoginFormComponent, PaginaNaoEncontradaComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8080', 'https://solufix-angular.herokuapp.com',
          'https://solufix-angular.herokuapp.com/categoria/novo', 'https://solufix-angular.herokuapp.com/categorias'],
        blacklistedRoutes: ['http://localhost:8080/oauth/token', 'https://solufix-angular.herokuapp.com/oauth/token']
      }
    })
  ]
})
export class SegurancaModule { }
