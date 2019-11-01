import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';

import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';


import { FormsModule } from '@angular/forms';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';


@NgModule({
  declarations: [UsuarioCadastroComponent, UsuarioPesquisaComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    PickListModule,
    ButtonModule,
    MultiSelectModule,
    TableModule,
    RouterModule
  ]
})
export class UsuarioModule { }
