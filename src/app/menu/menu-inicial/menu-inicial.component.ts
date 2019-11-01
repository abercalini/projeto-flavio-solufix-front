import { ProdutoService } from './../../produto/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.css']
})
export class MenuInicialComponent implements OnInit {

  quantidade = 0;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.listarProdutosMenu();
  }

  listarProdutosMenu() {
    this.produtoService.listarProdutosMenu().subscribe(response => {
      this.quantidade = response.length;
    });
  }

}
