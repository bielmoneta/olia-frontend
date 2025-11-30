import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GovernoService } from '../../services/governo.service'; // ajuste o caminho se necessário

@Component({
  selector: 'app-login-governo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-governo.html',
  styleUrl: './login-governo.css',
})
export class LoginGoverno {
  private router = inject(Router);
  private service = inject(GovernoService);

  loginData = {
    email: '',
    senha: ''
  };

  fazerLogin() {
    this.service.fazerLogin(this.loginData).subscribe({
      next: (resposta: any) => {
        // ajustar nomes das chaves de acordo com resposta do backend
        sessionStorage.setItem('auth-token', resposta.token);
        sessionStorage.setItem('usuarioLogado', 'true');
        sessionStorage.setItem('tipoUsuario', 'GOVERNO');
        sessionStorage.setItem('nomeGestor', resposta.nome ?? '');
        sessionStorage.setItem('idGestor', resposta.id?.toString() ?? '');

        // redirecione para o dashboard do governo
        this.router.navigate(['/dashboard-governo']);
      },
      error: (erro) => {
        console.error("Erro no login governo:", erro);
        alert("E-mail ou senha incorretos.");
      }
    });
  }
}
