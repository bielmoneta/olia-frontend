import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login-usuario.html',
  styleUrl: './login-usuario.css',
})
export class LoginUsuario implements OnInit {
  private router = inject(Router);
  private service = inject(UsuarioService);
  private route = inject(ActivatedRoute);

  loginData = {
    email: '',
    senha: ''
  };

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email'] && params['senha']) {
        this.loginData.email = params['email'];
        this.loginData.senha = params['senha'];
      }
    });
  }

  fazerLogin() {
    this.service.fazerLogin(this.loginData).subscribe({
      next: (resposta: any) => {
        sessionStorage.setItem('auth-token', resposta.token);
        sessionStorage.setItem('usuarioLogado', 'true');
        sessionStorage.setItem('nomeUsuario', resposta.nome);
        sessionStorage.setItem('tipoUsuario', 'USUARIO');
        sessionStorage.setItem('idUsuario', resposta.id);
        this.router.navigate(['/mapa-usuario']);
      },
      error: (erro) => {
        console.error("Erro no login:", erro);
        alert('Email ou senha incorretos!');
      }
    });
  }
}
