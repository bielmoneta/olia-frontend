import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoacaoService } from '../../services/doacao.service';

@Component({
  selector: 'app-historico-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico-usuario.html',
  styleUrl: './historico-usuario.css',
})
export class HistoricoUsuario implements OnInit {

  private service = inject(DoacaoService);
  doacoes: any[] = [];

  ngOnInit() {
    this.carregarHistorico();
  }

  carregarHistorico() {
    // Pega o ID do usuário logado
    const idUsuario = sessionStorage.getItem('idUsuario');

    if (idUsuario) {
      // Chama o Backend
      this.service.listarPorUsuario(+idUsuario).subscribe({
        next: (listaReal) => {
          this.doacoes = listaReal;
        },
        error: (erro) => {
          console.error('Erro ao carregar histórico', erro);
        }
      });
    }
  }
}
