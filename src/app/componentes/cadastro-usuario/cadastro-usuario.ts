import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro-usuario.html',
  styleUrl: './cadastro-usuario.css',
})
export class CadastroUsuario {
  usuario = {
    nome: '',
    cpf: '',
    telefone: '',
    endereco: '',
    bairro: '',
    cidade: '',
    bolsaFamilia: false, // começa desmarcado
    nis: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  // Função chamada ao clicar no botão "Criar Conta"
  cadastrar() {
    // Validação simples só visual (a validação pesada fica no Java)
    if (this.usuario.senha !== this.usuario.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Dados para enviar ao Java:', this.usuario);
    // TODO: Aqui futuramente você chamará o Service para enviar ao Backend
  }
}
