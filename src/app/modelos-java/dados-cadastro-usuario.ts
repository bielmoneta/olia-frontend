// 1. Interface do Endereço (Espelho do seu DadosEndereco do Java)
export interface DadosEndereco {
  logradouro: string;
  bairro: string;
  cidade: string;
}

// 2. Interface do Cadastro (Espelho Exato do seu DadosCadastroUsuario)
export interface DadosCadastroUsuario {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
  numeroNis?: string; // Opcional, pois nem todos têm Bolsa Família
  temBolsaFamilia: boolean;
  endereco: DadosEndereco; // Usa a interface que criamos acima
}
