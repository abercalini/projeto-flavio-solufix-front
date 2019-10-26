export class Produto {
  codigo: number;
  nome: string;
  descricao: string;
  codigoBarra: string;
  observacao: string;
  valor: number;
  estoque = new Estoque();
  categoria = new Categoria();
  caminhoFoto: string;
}

export class Estoque {
  quantidade: number;
}

export class Categoria {
  codigo: number;
}
