import { map } from 'rxjs/operators';
import { Usuario } from './usuario';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioFilter } from './usuarioFilter';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlBasePermissao: string;
  urlBase: string;

  constructor(private httpClient: HttpClient) {
    this.urlBasePermissao = `${environment.apiUrl}/permissoes`;
    this.urlBase = `${environment.apiUrl}/usuarios`;
  }

  listarPermissoes(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlBasePermissao}`).map(response => response);
  }

  salvarUsuario(usuario: Usuario): Observable<Usuario> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post<Usuario>(`${this.urlBase}`, JSON.stringify(usuario), {headers})
      .map(response => response);
  }

  listarUsuarios(usuarioFilter: UsuarioFilter): Observable<any> {
    let params = new HttpParams();
    params = params.append('size', usuarioFilter.itensPorPagina.toString());
    params = params.append('page', usuarioFilter.pagina.toString());
    if (usuarioFilter.filtroUsuario) {
      params = params.append('nome', usuarioFilter.filtroUsuario);
      params = params.append('email', usuarioFilter.filtroUsuario);
    }

    return this.httpClient.get<any>(`${this.urlBase}`, {params}).map(response => {
      const usuario = {
        totalPagina: response.totalPages,
        totalElemento: response.totalElements,
        usuarios: response.content};
      return usuario;
    });
  }

  buscarPorCodigo(codigo: number): Observable<any> {
    return this.httpClient.get<any>(`${this.urlBase}/${codigo}`).map(response => response);
  }

  atualizarUsuario(usuario: Usuario): Observable<Usuario> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.put<Usuario>(`${this.urlBase}/${usuario.codigo}`, JSON.stringify(usuario),
      {headers}).map(response => response);
  }

  excluir(codigo: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlBase}/${codigo}`).map(() => null);
  }

}
