import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';


@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro-usuario.html',
  styleUrl: './cadastro-usuario.css',
})
export class CadastroUsuario {

  constructor(private usuarioService: UsuarioService) {} // <-- INJEÇÃO DO SERVICE

  usuario = {
    nome: '',
    cpf: '',
    telefone: '',
    endereco: {
      logradouro: '',
      bairro: '',
      cidade: ''
    },
    temBolsaFamilia: false,
    numeroNis: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  cadastrar() {

    if (this.usuario.senha !== this.usuario.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    //Objeto com os dados para enviar ao backend, pois o backend não espera o campo confirmarSenha
    const usuarioParaEnviar = {
      nome: this.usuario.nome,
      email: this.usuario.email,
      senha: this.usuario.senha,
      cpf: this.usuario.cpf,
      telefone: this.usuario.telefone,
      temBolsaFamilia: this.usuario.temBolsaFamilia,
      numeroNis: this.usuario.numeroNis,
      endereco: {
        logradouro: this.usuario.endereco.logradouro,
        bairro: this.usuario.endereco.bairro,
        cidade: this.usuario.endereco.cidade
      }
    };

    // Chamando o método do service para cadastrar o usuário
    this.usuarioService.cadastrarUsuario(usuarioParaEnviar).subscribe({
      next: (res) => {
        console.log('Sucesso:', res);
        alert('Usuário cadastrado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        alert('Erro ao cadastrar usuário.');
      }
    });
  }
}
