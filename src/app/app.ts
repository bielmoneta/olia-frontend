import { Component, signal, inject} from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cabecalho } from "./componentes/cabecalho/cabecalho";
import { Rodape } from './componentes/rodape/rodape';
import { RodapeUsuario } from './componentes/rodape-usuario/rodape-usuario';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecalho, RodapeUsuario, Rodape, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);

  // retorna true se for o inicio
  isPaginaInicial(): boolean {
    return this.router.url === '/';
  }

  // Retorna true se for uma página do app (mapa, perfil, historico etc.)
  isPaginaApp(): boolean {
    const url = this.router.url;
    return url.includes('/mapa-usuario') || url.includes('/perfil-usuario') || url.includes('/historico-usuario') || url.includes('/recompensa-usuario');
  }

  isLogado(): boolean {
    return sessionStorage.getItem('usuarioLogado') === 'true';
  }
}
