export interface DadosEndereco {
  logradouro: string;
  bairro: string;
  cidade: string;
}

export interface DadosCadastroEscola {
  nome: string;
  cnpj: string;
  codigo_inep: string;
  endereco: DadosEndereco;
  capacidade: string;
  nome_responsavel: string;
  telefone: string;
  email: string;        // Email de contato
  email_acesso: string; // Login
  senha: string;
}
