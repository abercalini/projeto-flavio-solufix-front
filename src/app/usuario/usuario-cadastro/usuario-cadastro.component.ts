import { map } from 'rxjs/operators';
import { Usuario } from './../usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { NgForm } from '@angular/forms';
import {SelectItem, MessageService} from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();
  senha: string;
  permissoes: SelectItem[];

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private title: Title,
    private router: ActivatedRoute
    ) { }

  ngOnInit() {
    this.listarPermissoes();
    const codigo = this.router.snapshot.params.codigo;
    if (codigo) {
      this.buscarPorCodigo(codigo);
      this.title.setTitle('Edição de usuário');
    } else {
      this.title.setTitle('Cadastro de usuário');
    }
  }

  editar(usuario: Usuario) {
    this.usuarioService.atualizarUsuario(usuario).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Alterado com Sucesso', detail: 'Alterado com Sucesso'});
    });
  }

  prepararSalvar(form: NgForm) {
    if (this.isEditando()) {
      console.log('Salvar');
    } else {
      this.editar(this.usuario);
    }
  }

  isEditando(): boolean {
    if (this.usuario.codigo) {
        return false;
    } else {
      return true;
    }
  }

  buscarPorCodigo(codigo: number) {
    this.usuarioService.buscarPorCodigo(codigo).subscribe(response => {
      this.usuario = response;
      this.senha = this.usuario.senha;
    });
  }


  listarPermissoes() {
    this.usuarioService.listarPermissoes().subscribe(response => {
      this.permissoes = response.map(p => ({label: p.descricao, value: {codigo: p.codigo, descricao: p.descricao}}));
    });
  }

  salvar(form: NgForm) {
    console.log(this.usuario.permissoes);
    if (this.usuario.senha === this.senha) {
      this.usuarioService.salvarUsuario(this.usuario).subscribe(response => {
        this.messageService.add({severity: 'success', summary: 'Adicionado com Sucesso', detail: 'Adicionado com Sucesso'});
        this.usuario = new Usuario();
        form.reset();
      });
    } else {
      this.messageService.add({severity: 'error', summary: 'Senhas diferentes', detail: 'Senhas diferentes'});
    }
  }

}
