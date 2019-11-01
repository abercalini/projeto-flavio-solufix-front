import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { UsuarioFilter } from '../usuarioFilter';
import { Title } from '@angular/platform-browser';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent implements OnInit {

  usuarios = [];
  totalElemento = 0;
  usuarioFilter = new UsuarioFilter();
  @ViewChild('tabela', {static: false}) tabela;

  constructor(
    private usuarioService: UsuarioService,
    private title: Title,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.title.setTitle('Lista de Usuários');
  }

  listarUsuarios(pagina = 0) {
    this.usuarioFilter.pagina = pagina;
    this.usuarioService.listarUsuarios(this.usuarioFilter).subscribe(response => {
      this.usuarios = response.usuarios;
      this.totalElemento = response.totalElemento;
    });
  }

  aoMudarDePagina(event: any) {
    const pagina = event.first / event.rows;
    this.listarUsuarios(pagina);
  }

  excluir(codigo: number) {
    this.confirmationService.confirm({
      message: 'Deseja Excluir ?',
      accept: () => {
        this.usuarioService.excluir(codigo).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Excluido com sucesso', detail: 'Excluido com sucesso'});
          this.tabela.first = 0;
          this.listarUsuarios();
        });
      }
    });
  }
}
