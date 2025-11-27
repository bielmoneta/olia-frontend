import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login-usuario.html',
  styleUrl: './login-usuario.css',
})
export class LoginUsuario {
  private router = inject(Router);
  private service = inject(UsuarioService);

  loginData = {
    email: '',
    senha: ''
  };

  fazerLogin() {
    this.service.fazerLogin(this.loginData).subscribe({
      next: (resposta: any) => {
        sessionStorage.setItem('auth-token', resposta.token);
        sessionStorage.setItem('usuarioLogado', 'true');
        sessionStorage.setItem('tipoUsuario', 'USUARIO');
        sessionStorage.setItem('nomeUsuario', resposta.nome);
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
