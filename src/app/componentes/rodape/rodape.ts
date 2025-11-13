import { Component } from '@angular/core';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [Modal],
  templateUrl: './rodape.html',
  styleUrl: './rodape.css',
})
export class Rodape {
  mostrarModal = false;

  abrirModal() {
    this.mostrarModal = !this.mostrarModal;
  }
}
