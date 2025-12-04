import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mensagens-governo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mensagens-governo.html',
  styleUrl: './mensagens-governo.css',
})
export class MensagensGovernoComponent {
  mensagem = {
    titulo: '',
    corpo: '',
  };

  enviarMensagem() {
    if (!this.mensagem.titulo || !this.mensagem.corpo) {
      alert('Preencha o título e a mensagem!');
      return;
    }

    // TODO: Chamar Backend (POST /api/mensagens)
    console.log('Enviando para todas as escolas:', this.mensagem);

    alert('Mensagem enviada com sucesso para todas as escolas!');

    // Limpa o formulário
    this.mensagem = { titulo: '', corpo: '' };
  }
}
