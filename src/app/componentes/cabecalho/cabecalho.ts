import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {
  private router = inject(Router); //injeta o roteador para ler a url das páginas

  isPaginaLogin(): boolean {
    return this.router.url === '/login-usuario'
  }
}
