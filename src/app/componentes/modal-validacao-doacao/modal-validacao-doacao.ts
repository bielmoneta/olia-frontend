import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoacaoService } from '../../services/doacao.service';

@Component({
  selector: 'app-modal-validacao-doacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-validacao-doacao.html',
  styleUrl: './modal-validacao-doacao.css',
})
export class ModalValidacaoDoacaoComponent {
  private service = inject(DoacaoService);

  @Input() doacao: any; // Recebe os dados do card clicado
  @Output() fechar = new EventEmitter<void>();
  @Output() atualizou = new EventEmitter<void>(); // Avisa para recarregar a lista

  codigoInput: string = '';
  quantidadeReal: number = 0;
  erro: string = '';

  ngOnInit() {
    // Inicializa a quantidade com o que o usuário disse, mas a escola pode mudar
    if (this.doacao) {
      this.quantidadeReal = parseFloat(this.doacao.quantidade.replace('L', ''));
    }
  }

  fecharModal() {
    this.fechar.emit();
  }

  validarDoacao() {
    this.erro = '';

    // 1. Validação Local: O código digitado bate?
    if (this.codigoInput.trim().toUpperCase() !== this.doacao.codigo) {
      this.erro = 'Código incorreto! Verifique o app do doador.';
      return;
    }

    if (this.quantidadeReal <= 0) {
      this.erro = 'A quantidade deve ser maior que zero.';
      return;
    }

    const dadosConfirmacao = {
      idDoacao: this.doacao.id,
      quantidadeReal: this.quantidadeReal,
    };

    // 2. Chama o Backend para confirmar
    this.service.confirmarRecebimento(dadosConfirmacao).subscribe({
      next: () => {
        alert('Doação validada com sucesso! 🎉');
        this.atualizou.emit();
        this.fecharModal();
      },
      error: (err) => {
        console.error(err);
        this.erro = 'Erro ao validar no sistema.';
      },
    });
  }
}
