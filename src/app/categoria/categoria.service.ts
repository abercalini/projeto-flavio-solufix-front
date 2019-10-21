import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Categoria } from './categoria';
import { CategoriaFilter } from './categoriaFilter';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/categorias`;
  }

  salvar(categoria: Categoria): Observable<Categoria> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post<Categoria>(`https://solufix.herokuapp.com/categorias`,
      JSON.stringify(categoria), {headers}).map(response => response);
  }

  editar(categoria: Categoria): Observable<Categoria> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.put<Categoria>(`$https://solufix.herokuapp.com/categorias/${categoria.codigo}`,
      JSON.stringify(categoria), {headers}).map(response => response);
  }

  listarTodos(categoriaFilter: CategoriaFilter): Observable<any> {
    let params = new HttpParams();

    params = params.append('page', categoriaFilter.pagina.toString());
    params = params.append('size', categoriaFilter.itensPorPagina.toString());

    if (categoriaFilter.descricao) {
      params = params.append('descricao', categoriaFilter.descricao);
    }
    return this.httpClient.get<any>('https://solufix.herokuapp.com/categorias', {params}).map(response => response);
  }

  excluir(codigo: number): Observable<any> {
    return this.httpClient.delete(`https://solufix.herokuapp.com/categorias/${codigo}`).map(() => null);
  }

  carregarCategorias(): Observable<any> {
    return this.httpClient.get<any>(`https://solufix.herokuapp.com/categorias`).map(response => {
      return response.content;
    });
  }

}
