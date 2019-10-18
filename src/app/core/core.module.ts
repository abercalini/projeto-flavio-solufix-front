import { SegurancaModule } from './../seguranca/seguranca.module';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './../seguranca/login-form/login-form.component';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule,
    SegurancaModule
  ],
  exports: []
})
export class CoreModule { }
