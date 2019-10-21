import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    constructor(public app: AppComponent, private router: Router) {}

    exibirMenu() {
      if (this.router.url === '/login' || this.router.url === '/nao-autorizado'
        || this.router.url === '/pagina-nao-encontrada') {
        return false;
      } else {
        return true;
      }
    }

}
