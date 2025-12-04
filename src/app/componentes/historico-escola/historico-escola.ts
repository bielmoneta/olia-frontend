import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoacaoService } from '../../services/doacao.service';
import { ModalValidacaoDoacaoComponent } from '../modal-validacao-doacao/modal-validacao-doacao';

@Component({
  selector: 'app-historico-escola',
  imports: [CommonModule, ModalValidacaoDoacaoComponent],
  templateUrl: './historico-escola.html',
  styleUrl: './historico-escola.css',
})
export class HistoricoEscola implements OnInit {
  private service = inject(DoacaoService);
  doacoes: any[] = [];

  modalAberto = false;
  doacaoSelecionada: any = null;

  ngOnInit() {
    this.carregarHistorico();
  }

  carregarHistorico() {
    const idEscola = sessionStorage.getItem('idEscola');
    if (idEscola) {
      this.service.listarPorEscola(+idEscola).subscribe({
        next: (lista) => {
          this.doacoes = lista;
        },
        error: (erro) => console.error(erro),
      });
    }
  }

  abrirModal(doacao: any) {
    // 1. Adicione este log para ver no console (F12) se o clique está chegando
    console.log('Clicou na doação:', doacao);

    // 2. O Java manda 'PENDENTE', então precisamos verificar assim:
    if (doacao.status === 'PENDENTE' || doacao.status === 'Pendente') {
      this.doacaoSelecionada = doacao;
      this.modalAberto = true;
    }
    else {
      console.log('Não abriu porque o status não é Pendente. É:', doacao.status);
    }
  }

  fecharModal() {
    this.modalAberto = false;
    this.doacaoSelecionada = null;
  }

  recarregarLista() {
    this.carregarHistorico(); // Recarrega a lista para atualizar o status para Confirmado
  }
}
