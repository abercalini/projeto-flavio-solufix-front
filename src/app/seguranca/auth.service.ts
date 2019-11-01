import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService();
  tokenPayload: any;
  urlBase: string;
  urlBaseLogOut: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.urlBase = `${environment.apiUrl}/oauth/token`;
    this.urlBaseLogOut = `${environment.apiUrl}/token/revoke`;
    this.carregarToken();
  }

  logar(email: string, senha: string): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${email}&password=${senha}&grant_type=password`;
    // https://solufix-api.herokuapp.com/oauth/token
    return this.httpClient.post<any>(`${this.urlBase}`,
    body, {headers, withCredentials: true}).map(response => {
      this.armazenarToken(response.access_token);
    });
  }

  armazenarToken(token: string) {
    this.tokenPayload = this.helper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  temPermissao(permissao: string) {
    return this.tokenPayload && this.tokenPayload.authorities.includes(permissao);
  }

  obterNovoAccessToken(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';
    // https://solufix-api.herokuapp.com/oauth/token
    return this.httpClient.post<any>(`${this.urlBase}`,
      body, {headers, withCredentials: true}).map(response => {
      console.log(response);
      this.armazenarToken(response.access_token);
    });
  }

  temQualquerPermissao(roles) {
    for (const r of roles) {
      if (this.temPermissao(r)) {
        return true;
      }
    }
    return false;
  }

  // `https://solufix-api.herokuapp.com/token/revoke`
  logOut(): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlBaseLogOut}`, {withCredentials: true}).map(()  => {
      this.limparAccessToken();
      this.router.navigate(['/login']);
    });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.tokenPayload = null;
  }

}
