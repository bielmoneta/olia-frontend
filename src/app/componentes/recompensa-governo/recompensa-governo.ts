import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalRecompensaComponent } from '../modal-recompensa/modal-recompensa';
import { RecompensaService } from '../../services/recompensa.service';

@Component({
  selector: 'app-recompensa-governo',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalRecompensaComponent],
  templateUrl: './recompensa-governo.html',
  styleUrl: './recompensa-governo.css',
})
export class RecompensaGovernoComponent implements OnInit {
  private recompensaService = inject(RecompensaService);

  solicitacoes: any[] = [];
  catalogo: any[] = [];

  ngOnInit() {
    this.carregarTudo();
  }

  carregarTudo() {
    // 1. Carrega Pedidos Pendentes
    this.recompensaService.listarSolicitacoes().subscribe((lista) => {
      this.solicitacoes = lista;
    });

    // 2. Carrega Catálogo
    this.recompensaService.listarTodas().subscribe((lista) => {
      this.catalogo = lista;
    });
  }

  aprovar(solicitacao: any) {
    if (confirm(`Aprovar o pedido de ${solicitacao.premio}?`)) {
      this.recompensaService.aprovar(solicitacao.id).subscribe(() => {
        alert('Pedido aprovado!');
        this.carregarTudo(); // Recarrega a lista para sumir o pendente
      });
    }
  }

  negar(solicitacao: any) {
    if (confirm('Tem certeza que deseja negar?')) {
      this.recompensaService.negar(solicitacao.id).subscribe(() => {
        this.carregarTudo();
      });
    }
  }

  modalAberto = false;
  recompensaSelecionada: any = null;

  adicionarNovoPremio() {
    this.recompensaSelecionada = null;
    this.modalAberto = true;
  }

  editarPremio(item: any) {
    this.recompensaSelecionada = item;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  salvarDados(dados: any) {
    if (dados.id) {
      // EDIÇÃO REAL
      this.recompensaService.editar(dados).subscribe(() => {
        alert('Prêmio atualizado!');
        this.carregarTudo();
        this.fecharModal();
      });
    } else {
      // CRIAÇÃO REAL
      this.recompensaService.cadastrar(dados).subscribe(() => {
        alert('Prêmio criado com sucesso!');
        this.carregarTudo();
        this.fecharModal();
      });
    }
  }
}
