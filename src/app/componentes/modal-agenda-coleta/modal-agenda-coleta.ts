import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColetaService } from '../../services/coleta';

@Component({
  selector: 'app-modal-coleta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-agenda-coleta.html',
  styleUrl: './modal-agenda-coleta.css',
})
export class ModalColetaComponent {
  @Output() fechar = new EventEmitter<void>();

  private service = inject(ColetaService);

  // Variáveis do formulário
  quantidade: number | null = null;
  dataPreferida: string = '';

  fecharModal() {
    this.fechar.emit();
  }

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

    // Pega o ID da escola logada
    const idEscola = sessionStorage.getItem('idEscola');
    if (!idEscola) {
      alert('Erro ao identificar a escola. Por favor, faça o login novamente.');
      return;
    }

    const dados = {
      idEscola: +idEscola, // Converte para número
      quantidade: this.quantidade,
      data: this.dataPreferida,
    };

    // Chama o Backend
    this.service.solicitar(dados).subscribe({
      next: () => {
        alert('Coleta solicitada com sucesso!');
        this.fecharModal();
      },
      error: (erro) => {
        console.error('Erro ao solicitar coleta:', erro);
        alert('Erro ao solicitar coleta.');
      },
    });
  }
}
