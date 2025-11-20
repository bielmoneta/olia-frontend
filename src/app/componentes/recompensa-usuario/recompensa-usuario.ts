import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recompensa-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recompensa-usuario.html',
  styleUrl: './recompensa-usuario.css',
})
export class RecompensaUsuario {
  // Essa informação virá do Backend/Login
  isElegivel: boolean = true;

  // Pega o NIS salvo no login ou usa um exemplo
  nisUsuario = sessionStorage.getItem('nisUsuario');

  // Dados fictícios dos locais (Mock)
  locais = [
    {
      nome: 'Farmácia Popular Centro',
      endereco: 'Av. Central, 100',
      data: '15/10/2025',
      horario: '9h - 16h',
      status: 'Disponível'
    },
    {
      nome: 'Farmácia Popular Jardim',
      endereco: 'Rua do Jardim, 250',
      data: '16/10/2025',
      horario: '8h - 17h',
      status: 'Disponível'
    }
  ];

  confirmarRetirada(local: any) {
    alert(`Retirada confirmada em: ${local.nome}`);
    // TODO: Lógica de backend para reservar o sabão
  }
}
