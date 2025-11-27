import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Não esqueça!
import { EscolaService } from '../../services/escola.service';

@Component({
  selector: 'app-login-escola',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login-escola.html',
  styleUrl: './login-escola.css'
})
export class LoginEscola implements OnInit {
  private router = inject(Router);
  private service = inject(EscolaService);

  loginData = { email: '', senha: '' };

  ngOnInit() {
    sessionStorage.clear();
  }

  fazerLogin() {
    this.service.fazerLogin(this.loginData).subscribe({
      next: (resposta: any) => {
        console.log("Escola Logada!", resposta);

        // 1. Salva o Token e os dados da Escola
        sessionStorage.setItem('auth-token', resposta.token);
        sessionStorage.setItem('usuarioLogado', 'true');
        sessionStorage.setItem('tipoUsuario', 'ESCOLA');
        sessionStorage.setItem('nomeUsuario', resposta.nome);
        sessionStorage.setItem('idEscola', resposta.id);
        this.router.navigate(['/dashboard-escola']);
      },
      error: (erro) => {
        console.error(erro);
        alert('Email ou senha inválidos!');
      }
    });
  }
}
