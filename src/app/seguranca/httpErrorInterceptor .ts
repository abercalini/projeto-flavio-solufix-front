import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/primeng';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          console.log(error);

          if (error.error.error === 'Internal Server Error' && error.error.status === 500) {
              errorMessage = 'Esse registro já esta sendo movimentada por outra tabela';
              this.messageService.add({severity: 'error', summary: errorMessage, detail: errorMessage});
          }

          if (error.error.error === 'invalid_token' && error.error.error_description.includes('Access token expired:')) {
            errorMessage = 'Atualizar a pagina por favor';
            this.auth.obterNovoAccessToken().subscribe(() => null);
            this.messageService.add({severity: 'error', summary: errorMessage, detail: errorMessage});
          }

          if (error.error.error === 'invalid_grant' && error.error.error_description === 'Bad credentials') {
            errorMessage = 'Usuario ou senha invalido';
            this.messageService.add({severity: 'error', summary: errorMessage, detail: errorMessage});          }
         /* if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          window.alert(errorMessage); */
          return throwError(errorMessage);
        })
      );
  }

}
