import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolaService } from '../../services/escola.service';
import { RecompensaService } from '../../services/recompensa.service';

@Component({
  selector: 'app-recompensas-escola',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recompensa-escola.html',
  styleUrl: './recompensa-escola.css',
})
export class RecompensasEscolaComponent implements OnInit {
  private escolaService = inject(EscolaService);
  private recompensaService = inject(RecompensaService);

  pontosAtuais = 0;
  idEscola: number = 0;
  itens: any[] = [];

  ngOnInit() {
    const id = sessionStorage.getItem('idEscola');
    if (id) {
      this.idEscola = +id;
      this.carregarDados();
    }
  }

  carregarDados() {
    // 1. Carrega os Pontos da Escola
    this.escolaService.getDashboard(this.idEscola).subscribe((dados) => {
      this.pontosAtuais = dados.pontos;
    });

    // 2. Carrega o Catálogo de Prêmios Real
    this.recompensaService.listarTodas().subscribe((lista) => {
      this.itens = lista;
    });
  }

  resgatar(item: any) {
    if (this.pontosAtuais >= item.custo) {
      if (confirm(`Deseja resgatar "${item.titulo}" por ${item.custo} pontos?`)) {
        // Chama o Backend para criar o pedido
        this.recompensaService.solicitar(item.id, this.idEscola).subscribe({
          next: () => {
            alert('Solicitação enviada! Aguarde a aprovação do governo.');
            // Opcional: Recarregar os pontos se o backend já descontar na hora (depende da sua regra)
          },
          error: (err) => {
            console.error(err);
            alert('Erro ao solicitar: ' + (err.error || 'Tente novamente.'));
          },
        });
      }
    }
  }
}
