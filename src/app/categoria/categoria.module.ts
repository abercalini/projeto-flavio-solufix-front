import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';

import { FormsModule } from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';



@NgModule({
  declarations: [CategoriaCadastroComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
  ]
})
export class CategoriaModule { }
