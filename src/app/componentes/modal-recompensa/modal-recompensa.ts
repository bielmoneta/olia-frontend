import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-recompensa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-recompensa.html',
  styleUrl: './modal-recompensa.css',
})
export class ModalRecompensaComponent implements OnInit {
  @Input() recompensa: any = null; // Se vier preenchido, é Edição
  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<any>();

  tituloModal = 'Novo Prêmio';

  // Dados do formulário
  dadosForm = {
    id: null,
    titulo: '',
    custo: 0,
    icone: 'assets/imagens/icon-presente.png', // Padrão
  };

  ngOnInit() {
    if (this.recompensa) {
      this.tituloModal = 'Editar Prêmio';
      // Copia os dados para não alterar a lista diretamente antes de salvar
      this.dadosForm = { ...this.recompensa };
    }
  }

  confirmar() {
    this.salvar.emit(this.dadosForm);
    this.fecharModal();
  }

  fecharModal() {
    this.fechar.emit();
  }
}
