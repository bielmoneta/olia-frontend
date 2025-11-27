import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cabecalho } from './componentes/cabecalho/cabecalho';
import { Rodape } from './componentes/rodape/rodape';
import { RodapeUsuario } from './componentes/rodape-usuario/rodape-usuario';
import { RodapeEscola } from './componentes/rodape-escola/rodape-escola';
import { LeafletModule } from '@bluehalo/ngx-leaflet';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Cabecalho,
    RodapeUsuario,
    Rodape,
    CommonModule,
    RouterModule,
    LeafletModule,
    RodapeEscola,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);

  // retorna true se for o inicio
  isPaginaInicial(): boolean {
    return this.router.url === '/';
  }

  isUsuarioComum(): boolean {
    const url = this.router.url;
    const logado = sessionStorage.getItem('usuarioLogado') === 'true';
    const ehUsuario = sessionStorage.getItem('tipoUsuario') !== 'ESCOLA';

    return logado && ehUsuario && !url.includes('/login');
  }

  isEscola(): boolean {
    const url = this.router.url;
    const logado = sessionStorage.getItem('usuarioLogado') === 'true';
    const ehEscola = sessionStorage.getItem('tipoUsuario') === 'ESCOLA';

    // A CORREÇÃO É ESTA PARTE FINAL:
    return logado && ehEscola && !url.includes('/login');
  }
}
