import { AuthService } from './../../seguranca/auth.service';
import { CategoriaService } from './../categoria.service';
import { Categoria } from './../categoria';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessageService, ConfirmationService } from 'primeng/primeng';
import { CategoriaFilter } from '../categoriaFilter';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

  categoria = new Categoria();
  categoriaFilter = new CategoriaFilter();
  listaCategorias = [];
  totalRegistro: any;
  @ViewChild('tabela', {static: false}) tabela;

  constructor(
    private title: Title,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private auth: AuthService) { }

  ngOnInit() {
    this.title.setTitle('SOLUFIX - Categorias');
  }

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }

  salvar(form: any) {
    this.categoriaService.salvar(this.categoria).subscribe(response => {
      this.messageService.add({severity: 'success', summary: 'Adicionado com sucesso', detail: 'Adicionado com sucesso'});
      form.reset();
      this.categoria = new Categoria();
      this.pesquisar();
    });
  }

  pesquisar(pagina = 0) {
    this.categoriaFilter.pagina = pagina;
    this.categoriaService.listarTodos(this.categoriaFilter).subscribe(response => {
      this.totalRegistro = response.totalElements;
      this.listaCategorias = response.content;
    });
  }

  aoMudarDePagina(event: any) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  atualizarCategoria(categoria: Categoria) {
    this.categoriaService.editar(categoria).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Atualizado com sucesso', detail: 'Atualizado com sucesso'});    });
  }

  prepararExclusao(categoria: Categoria) {
    this.confirmationService.confirm({
      message: 'Deseja excluir a categoria?',
      accept: () => {
        this.exluir(categoria);
      }
    });
  }

  exluir(categoria: Categoria) {
    this.categoriaService.excluir(categoria.codigo).subscribe(() => {
      this.tabela.first = 0;
      this.pesquisar();
      this.messageService.add({severity: 'success', summary: 'Excluido com sucesso', detail: 'Excluido com sucesso'});
    });
  }




}
