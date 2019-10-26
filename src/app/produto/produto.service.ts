import { ProdutoFilter } from './produtoFilter';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Produto } from './produto';

import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/produtos`;
   }


  // https://solufix.herokuapp.com/produtos
  salvar(produto: Produto): Observable<Produto> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post<Produto>('https://solufix.herokuapp.com/produtos',
      JSON.stringify(produto), {headers}).map(response => response);
  }

  upload(formData: any): Observable<any> {
    return this.httpClient.post<any>('https://solufix.herokuapp.com/produtos/upload', formData);
  }

  // https://solufix.herokuapp.com/produtos
  editar(produto: Produto): Observable<Produto> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.put<Produto>(`https://solufix.herokuapp.com/produtos/${produto.codigo}`, JSON.stringify(produto), {headers})
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
    // https://solufix.herokuapp.com/produtos
    return this.httpClient.get<any>('https://solufix.herokuapp.com/produtos', {params}).map(response => {
      const resultado = {
        produtos: response.content,
        total: response.totalElements
      };
      return resultado;
    });
  }
  // https://solufix.herokuapp.com/produtos
  buscarPorCodigo(codigo: number): Observable<any> {
    return this.httpClient.get<any>(`https://solufix.herokuapp.com/produtos/${codigo}`).map(response => response);
  }
  // https://solufix.herokuapp.com/produtos
  excluir(codigo: number): Observable<any> {
    return this.httpClient.delete(`https://solufix.herokuapp.com/produtos/${codigo}`).map(() => null);
  }

}
