export interface cliente {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  salario: number;
  telefones: telefone[];
  enderecos: endereco[];
  empresas: empresa[];
}

interface telefone {
  id: number;
  codigo_pais: number;
  codigo_area: number;
  numero: number;
}

interface endereco {
  id: number;
  cep: number;
  logradouro: string;
  numero: number;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface empresa {
  id: number;
  nome: string;
  cnpj: number;
  valor: number;
}
