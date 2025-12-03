import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GovernoService } from '../../services/governo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-governo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-governo.html',
  styleUrl: './login-governo.css',
})
export class LoginGoverno implements OnInit {
  private router = inject(Router);
  private service = inject(GovernoService);

  loginData = {
    email: '',
    senha: ''
  };

  ngOnInit() {
    sessionStorage.clear();
  }

  fazerLogin() {
    this.service.fazerLogin(this.loginData).subscribe({
      next: (resposta: any) => {
        // ajustar nomes das chaves de acordo com resposta do backend
        sessionStorage.setItem('token', resposta.token);
        sessionStorage.setItem('usuarioLogado', 'true');
        sessionStorage.setItem('tipoUsuario', 'GOVERNO');
        sessionStorage.setItem('nomeGestor', resposta.nome ?? '');
        sessionStorage.setItem('idGestor', resposta.id?.toString() ?? '');

        this.router.navigate(['/dashboard-governo']);
      },
      error: (erro) => {
        console.error("Erro no login governo:", erro);
        alert("Acesso negado. Verifique suas credenciais de gestor.");
      }
    });
  }
}
