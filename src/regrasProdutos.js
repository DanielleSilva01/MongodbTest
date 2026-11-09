function validarCodigo(codigo) {
  if (typeof codigo !== "string" || !/^P\d{3,}$/.test(codigo)) {
    throw new Error("codigo: use o formato P001");
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

function validarCodigoExterno(codigo) {
  if (typeof codigo !== "string" || !/^[A-Z0-9]{3,}$/.test(codigo)) {
    throw new Error("codigo_categoria/codigo_marca: formato inválido");
  }
  return codigo;
}

function validarPreco(preco) {
  if (typeof preco !== "number" || isNaN(preco) || preco < 0) {
    throw new Error("preco: deve ser um número positivo");
  }
  return preco;
}

function validarEstoque(estoque) {
  if (
    typeof estoque !== "number" ||
    !Number.isInteger(estoque) ||
    estoque < 0
  ) {
    throw new Error("estoque: deve ser um número inteiro não negativo");
  }
  return estoque;
}

function validarGarantia(garantia) {
  if (
    typeof garantia !== "number" ||
    !Number.isInteger(garantia) ||
    garantia < 0
  ) {
    throw new Error("garantia_meses: deve ser um número inteiro não negativo");
  }
  return garantia;
}

function validarEspecificacoes(espec) {
  if (typeof espec !== "object" || espec === null) {
    throw new Error("especificacoes: deve ser um objeto");
  }
  return espec;
}

function validarAtivo(ativo) {
  if (typeof ativo !== "boolean") {
    throw new Error("ativo: deve ser true ou false");
  }
  return ativo;
}

function validarProduto(doc) {
  if (!doc || typeof doc !== "object") {
    throw new Error("produto: documento obrigatório");
  }

  return {
    codigo: validarCodigo(doc.codigo),
    nome: validarNome(doc.nome),
    codigo_categoria: validarCodigoExterno(doc.codigo_categoria),
    codigo_marca:
      doc.codigo_marca === null ? null : validarCodigoExterno(doc.codigo_marca),
    preco: validarPreco(doc.preco),
    estoque: validarEstoque(doc.estoque),
    garantia_meses: validarGarantia(doc.garantia_meses),
    especificacoes: validarEspecificacoes(doc.especificacoes),
    ativo: validarAtivo(doc.ativo),
  };
}

module.exports = {
  validarCodigo,
  validarNome,
  validarCodigoExterno,
  validarPreco,
  validarEstoque,
  validarGarantia,
  validarEspecificacoes,
  validarAtivo,
  validarProduto,
};
