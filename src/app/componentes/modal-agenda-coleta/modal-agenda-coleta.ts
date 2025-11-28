import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-coleta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-agenda-coleta.html',
  styleUrl: './modal-agenda-coleta.css',
})
export class ModalColetaComponent {
  @Output() fechar = new EventEmitter<void>();

  // Variáveis do formulário
  quantidade: number | null = null;
  dataPreferida: string = '';

  fecharModal() {
    this.fechar.emit();
  }

  // Aqui você chamaria o serviço para salvar no banco (POST /coletas)
  // Por enquanto, apenas fecha e avisa
  solicitar() {
    // Verificação de segurança
    if (!this.quantidade || this.quantidade <= 0) {
      alert('Por favor, insira uma quantidade válida (maior que zero).');
      return;
    }

    if (!this.dataPreferida) {
      alert('Selecione uma data preferida.');
      return;
    }

    alert(`Coleta agendada para ${this.dataPreferida} (${this.quantidade}L)`);
    this.fecharModal();
  }
}
