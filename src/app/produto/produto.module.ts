import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';

import { FormsModule } from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';




@NgModule({
  declarations: [ProdutoCadastroComponent, ProdutoPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    CurrencyMaskModule,
    DropdownModule,
    ButtonModule,
    RouterModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule
  ]
})
export class ProdutoModule { }
