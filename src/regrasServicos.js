function validarCodigo(codigo) {
  if (typeof codigo !== "string" || !/^S\d{3,}$/.test(codigo)) {
    throw new Error("codigo: use o formato S001");
  }
  return codigo;
}

function validarNome(nome) {
  if (typeof nome !== "string") {
    throw new Error("nome: deve ser texto");
  }
  const limpo = nome.trim();
  if (limpo.length < 3 || limpo.length > 100) {
    throw new Error("nome: deve ter entre 3 e 100 caracteres");
  }
  return limpo;
}

function validarDescricao(descricao) {
  if (typeof descricao !== "string") {
    throw new Error("descricao: deve ser texto");
  }
  const limpo = descricao.trim();
  if (limpo.length < 5 || limpo.length > 200) {
    throw new Error("descricao: deve ter entre 5 e 200 caracteres");
  }
  return limpo;
}

function validarPrecoBase(preco) {
  if (typeof preco !== "number" || preco < 0) {
    throw new Error("preco_base: deve ser um número positivo");
  }
  return preco;
}

function validarDuracaoHoras(horas) {
  if (typeof horas !== "number" || !Number.isInteger(horas) || horas < 1) {
    throw new Error("duracao_horas: deve ser um inteiro positivo");
  }
  return horas;
}

function validarGarantiaDias(dias) {
  if (typeof dias !== "number" || !Number.isInteger(dias) || dias < 0) {
    throw new Error("garantia_dias: deve ser um inteiro não negativo");
  }
  return dias;
}

function validarAtivo(ativo) {
  if (typeof ativo !== "boolean") {
    throw new Error("ativo: deve ser true ou false");
  }
  return ativo;
}

function validarServico(doc) {
  if (!doc || typeof doc !== "object") {
    throw new Error("servico: documento obrigatório");
  }

  return {
    codigo: validarCodigo(doc.codigo),
    nome: validarNome(doc.nome),
    descricao: validarDescricao(doc.descricao),
    preco_base: validarPrecoBase(doc.preco_base),
    duracao_horas: validarDuracaoHoras(doc.duracao_horas),
    garantia_dias: validarGarantiaDias(doc.garantia_dias),
    ativo: validarAtivo(doc.ativo),
  };
}

module.exports = {
  validarCodigo,
  validarNome,
  validarDescricao,
  validarPrecoBase,
  validarDuracaoHoras,
  validarGarantiaDias,
  validarAtivo,
  validarServico,
};
