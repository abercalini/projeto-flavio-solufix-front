import { ProdutoFilter } from './produtoFilter';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = 'http://localhost:8080/produtos';

  constructor(private httpClient: HttpClient) { }

  salvar(produto: Produto): Observable<Produto> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post<Produto>(`${this.baseUrl}`, JSON.stringify(produto),
      {headers}).map(response => response);
  }

  editar(produto: Produto): Observable<Produto> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.put<Produto>(`${this.baseUrl}/${produto.codigo}`, JSON.stringify(produto), {headers})
      .map(response => response);
  }

  buscarProdutos(produtoFilter: ProdutoFilter): Observable<any> {

    let params = new HttpParams();

    params = params.append('page', produtoFilter.pagina.toString());
    params = params.append('size', produtoFilter.totalItensPorPagina.toString());

    if (produtoFilter.filtroProduto) {
      params = params.append('nome', produtoFilter.filtroProduto);
      params = params.append('descricao', produtoFilter.filtroProduto);
      params = params.append('codigoBarra', produtoFilter.filtroProduto);
    }

    return this.httpClient.get<any>(`${this.baseUrl}`, {params}).map(response => {
      const resultado = {
        produtos: response.content,
        total: response.totalElements
      };
      return resultado;
    });
  }

  buscarPorCodigo(codigo: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${codigo}`).map(response => response);
  }

  excluir(codigo: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${codigo}`).map(() => null);
  }

}
