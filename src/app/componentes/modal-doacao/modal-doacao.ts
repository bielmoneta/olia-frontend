import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-doacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-doacao.html',
  styleUrl: './modal-doacao.css',
})
export class ModalDoacao {
  @Input() escola: any; // Recebe os dados da escola clicada
  @Output() fechar = new EventEmitter<void>();
  @Output() doacaoConcluida = new EventEmitter<any>();

  etapa: number = 1; // 1 = Inserir Quantidade, 2 = Mostrar Código
  quantidade: number | null = null;

  // Dados gerados
  codigoDoacao: string = '';
  qrCodeUrl: string = '';

  fecharModal() {
    this.fechar.emit();
  }

  avancarEtapa() {
    if (!this.quantidade || this.quantidade <= 0) {
      alert('Por favor, informe uma quantidade válida.');
      return;
    }

    // Simula a geração de um código único
    const randomId = Math.floor(1000 + Math.random() * 9000);
    this.codigoDoacao = `OLIA-${randomId}`;

    // Gera URL do QR Code (usando API pública do QRServer)
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.codigoDoacao}`;

    this.etapa = 2;
  }

  concluirDoacao() {
    const idUsuario = sessionStorage.getItem('idUsuario'); // Pega o ID de quem está logado

    // Monta o objeto igual ao DTO do Java
    const dadosParaOJava = {
      codigo: this.codigoDoacao,
      quantidade: this.quantidade,
      idEscola: this.escola.id,
      idUsuario: idUsuario ? +idUsuario : null,
    };

    // Emite esse objeto pronto
    this.doacaoConcluida.emit(dadosParaOJava);

    this.fecharModal();
  }
}
