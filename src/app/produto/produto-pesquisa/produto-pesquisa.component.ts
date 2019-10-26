import { AuthService } from './../../seguranca/auth.service';
import { ProdutoFilter } from './../produtoFilter';
import { ProdutoService } from './../produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Produto } from '../produto';
import { ConfirmationService, MessageService } from 'primeng/primeng';

@Component({
  selector: 'app-produto-pesquisa',
  templateUrl: './produto-pesquisa.component.html',
  styleUrls: ['./produto-pesquisa.component.css']
})
export class ProdutoPesquisaComponent implements OnInit {

  totalRegistro: any;
  produtos = [];

  produtoFilter = new ProdutoFilter();
  @ViewChild('tabela', {static: false}) tabela;


  constructor(
    private produtoService: ProdutoService,
    private title: Title,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private auth: AuthService) { }

  ngOnInit() {
    this.title.setTitle('SOLUFIX - Lista de produtos');
  }

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }

  listarProdutos(pagina = 0) {
    this.produtoFilter.pagina = pagina;
    this.produtoService.buscarProdutos(this.produtoFilter).subscribe(response => {
      this.totalRegistro = response.total;
      this.produtos = response.produtos;
    });
  }

  aoMudarPagina(event: any) {
    const pagina = event.first / event.rows;
    this.listarProdutos(pagina);
  }

  prepararExclusao(produto: Produto) {
    this.confirmationService.confirm({
      message: 'Deseja excluir?',
      accept: () => {
        this.excluirProduto(produto);
      }
    });
  }

  excluirProduto(produto: Produto) {
    this.produtoService.excluir(produto.codigo).subscribe(() => {
      this.tabela.first = 0;
      this.listarProdutos();
      this.messageService.add({severity: 'success', summary: 'Excluido com sucesso', detail: 'Excluido com sucesso'});
    });
  }


}
