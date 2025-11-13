import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [CommonModule, RouterModule, Modal],
  templateUrl: './rodape.html',
  styleUrl: './rodape.css',
})
export class Rodape {
  private router = inject(Router);

  mostrarModal = false;
  abrirModal() {
    this.mostrarModal = !this.mostrarModal;
  }

  isPaginaInicial(): boolean {
    return this.router.url === '/'; // retorna true apenas se a URL for exatamente a barra "/" --> volta para a página inicial
  }
}
