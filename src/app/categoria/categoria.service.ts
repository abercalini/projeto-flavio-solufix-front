import { environment } from 'src/environments/environment';
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
  // https://solufix.herokuapp.com/categorias
  salvar(categoria: Categoria): Observable<Categoria> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post<Categoria>(`${this.baseUrl}`,
      JSON.stringify(categoria), {headers}).map(response => response);
  }

  // https://solufix.herokuapp.com/categorias
  editar(categoria: Categoria): Observable<Categoria> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.put<Categoria>(`${this.baseUrl}/${categoria.codigo}`,
      JSON.stringify(categoria), {headers}).map(response => response);
  }

  // https://solufix.herokuapp.com/categorias
  listarTodos(categoriaFilter: CategoriaFilter): Observable<any> {
    let params = new HttpParams();

    params = params.append('page', categoriaFilter.pagina.toString());
    params = params.append('size', categoriaFilter.itensPorPagina.toString());

    if (categoriaFilter.descricao) {
      params = params.append('descricao', categoriaFilter.descricao);
    }
    return this.httpClient.get<any>(`${this.baseUrl}`, {params}).map(response => response);
  }

  // https://solufix.herokuapp.com/categorias/
  excluir(codigo: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${codigo}`).map(() => null);
  }

  // https://solufix.herokuapp.com/categorias
  carregarCategorias(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}`).map(response => {
      return response.content;
    });
  }

}
