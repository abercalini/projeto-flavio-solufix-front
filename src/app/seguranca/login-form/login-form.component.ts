import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {

  }

  logarNoSistema(email, senha) {
    this.auth.logar(email, senha).subscribe(() => {
      this.router.navigate(['/categoria/novo']);
    });
  }

}
