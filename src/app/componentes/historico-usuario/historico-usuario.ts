import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historico-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico-usuario.html',
  styleUrl: './historico-usuario.css',
})
export class HistoricoUsuario {
  doacoes: any[] = [];

  constructor() {
    //função que busca os dados
    this.carregarHistorico();
  }

  carregarHistorico() {
    //chamada HTTP para o Backend Java

    this.doacoes = [
      {
        escola: "Escola Municipal Santos Dumont",
        data: "05/10/2025",
        quantidade: "2L",
        codigo: "DOA-2025-001",
        status: "Confirmado"
      },
      {
        escola: "Escola Estadual Machado de Assis",
        data: "28/09/2025",
        quantidade: "3.5L",
        codigo: "DOA-2025-002",
        status: "Confirmado"
      },
      {
        escola: "Escola Municipal Santos Dumont",
        data: "15/09/2025",
        quantidade: "4L",
        codigo: "DOA-2025-003",
        status: "Pendente"
      }
    ];
  }
}
