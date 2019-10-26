import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../produto.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/primeng';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  produto = new Produto();
  categorias = [];

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private produtoService: ProdutoService,
    private title: Title,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.listarCategorias();
    this.title.setTitle('SOLUFIX - Cadastro de Produto');
    const codigo = this.route.snapshot.params.codigo;
    if (codigo) {
      this.title.setTitle('SOLUFIX - Edição de Produto');
      this.buscarPorCodigo(codigo);
    }

  }

  listarCategorias() {
    this.categoriaService.carregarCategorias().subscribe(response => {
      this.categorias = response.map(c => ({label: c.descricao, value: c.codigo}));
    });
  }

  inputFileSelectd(event) {
    if (event.target.files || event.target.files[0]) {
       const arquivo = event.target.files[0];

       console.log(arquivo);

       const formData = new FormData();
       formData.set('foto', arquivo);

       this.produtoService.upload(formData).subscribe();
    }
  }

  salvar(form: any) {
    this.produtoService.salvar(this.produto).subscribe(response => {
      this.messageService.add({severity: 'success', summary: 'Salvo com sucesso', detail: 'Salvo com sucesso'});
      form.reset();
      this.produto = new Produto();
    });
  }

  verificarSalvarOuEditar(form: any) {
    if (this.isEditando()) {
      this.editar();
    } else {
      this.salvar(form);
    }
  }

  buscarPorCodigo(codigo: number) {
    this.produtoService.buscarPorCodigo(codigo).subscribe(response => {
      this.produto = response;
    });
  }

  isEditando(): boolean {
    return Boolean(this.produto.codigo);
  }

  editar() {
    this.produtoService.editar(this.produto).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Editado com sucesso', detail: 'Editado com sucesso'});
    });
  }

}
