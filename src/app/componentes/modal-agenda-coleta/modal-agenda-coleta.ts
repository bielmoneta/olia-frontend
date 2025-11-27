import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-coleta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-agenda-coleta.html',
  styleUrl: './modal-agenda-coleta.css'
})
export class ModalColetaComponent {
  @Output() fechar = new EventEmitter<void>();

  // Variáveis do formulário
  quantidade: number | null = null;
  dataPreferida: string = '';

  fecharModal() {
    this.fechar.emit();
  }

  solicitar() {
    if (!this.quantidade || !this.dataPreferida) {
      alert('Preencha todos os campos!');
      return;
    }

    // Aqui você chamaria o serviço para salvar no banco (POST /coletas)
    // Por enquanto, apenas fecha e avisa
    alert(`Coleta agendada para ${this.dataPreferida} (${this.quantidade}L)`);
    this.fecharModal();
  }
}
