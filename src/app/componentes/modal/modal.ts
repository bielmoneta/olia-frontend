import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
 @Output() eventoFechar = new EventEmitter<void>(); //isso aqui é para avisar ao rodape que o modal foi fechado!!

 fecharModal() {
  this.eventoFechar.emit(); //emite o evento para avisar que o modal foi fechado
 }
}
