function validarCodigo(codigo) {
  if (typeof codigo !== "string" || !/^MOV\d{3,}$/.test(codigo)) {
    throw new Error("codigo: use o formato MOV001");
  }
  return codigo;
}

function validarCodigoProduto(codigo) {
  if (typeof codigo !== "string" || !/^P\d{3,}$/.test(codigo)) {
    throw new Error("codigo_produto: use o formato P001");
  }
  return codigo;
}

function validarTipoMovimentacao(tipo) {
  const tiposPermitidos = ["entrada", "saida", "ajuste"];
  if (!tiposPermitidos.includes(tipo)) {
    throw new Error("tipo: use entrada, saida ou ajuste");
  }
  return tipo;
}

function validarQuantidade(quantidade) {
  if (typeof quantidade !== "number" || !Number.isInteger(quantidade)) {
    throw new Error("quantidade: deve ser um número inteiro");
  }
  return quantidade;
}

function validarData(data) {
  if (!(data instanceof Date) || Number.isNaN(data.getTime())) {
    throw new Error("data: data inválida");
  }
  return data;
}

function validarResponsavel(responsavel) {
  if (typeof responsavel !== "string" || responsavel.trim().length === 0) {
    throw new Error("responsavel: obrigatório");
  }
  return responsavel.trim();
}

function validarMotivo(motivo) {
  if (typeof motivo !== "string" || motivo.trim().length === 0) {
    throw new Error("motivo: obrigatório");
  }
  return motivo.trim();
}

function validarMovimentacao(doc) {
  if (!doc || typeof doc !== "object") {
    throw new Error("movimentacao: documento obrigatório");
  }

  return {
    codigo: validarCodigo(doc.codigo),
    codigo_produto: validarCodigoProduto(doc.codigo_produto),
    tipo: validarTipoMovimentacao(doc.tipo),
    quantidade: validarQuantidade(doc.quantidade),
    data: validarData(doc.data),
    responsavel: validarResponsavel(doc.responsavel),
    motivo: validarMotivo(doc.motivo),
  };
}

module.exports = {
  validarCodigo,
  validarCodigoProduto,
  validarTipoMovimentacao,
  validarQuantidade,
  validarData,
  validarResponsavel,
  validarMotivo,
  validarMovimentacao,
};
