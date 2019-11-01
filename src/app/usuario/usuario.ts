export class Usuario {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  permissoes: Permissao[];
}

export class Permissao {
  codigo: number;
  descricao: string;
}
