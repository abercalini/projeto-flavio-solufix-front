import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuInicialComponent } from './menu-inicial/menu-inicial.component';



@NgModule({
  declarations: [MenuInicialComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MenuInicialComponent
  ]
})
export class MenuModule { }
