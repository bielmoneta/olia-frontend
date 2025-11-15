import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {
  private router = inject(Router); //injeta o roteador para ler a url das páginas
  private location = inject(Location); //injeta o location para manipular o histórico de navegação

  isPaginaLogin(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/cadastro');
  }

  voltar() {
    const urlAtual = this.router.url;

  // Se estiver na página de cadastro de usuário
    if (urlAtual === '/cadastro-usuario') {
    // ele volta para o login de usuário.
    this.router.navigate(['/login-usuario']);
    }

  //  Se estiver na página de login de usuário
    else if (urlAtual === '/login-usuario') {
    // ele volta para o inicio
    this.router.navigate(['/']);
    }

    // TODO: adicionar regras para escola e governo)

      // Para qualquer outro caso
      else {
    this.location.back();
      }
    }
}
