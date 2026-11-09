function validarCodigo(codigo) {
  if (typeof codigo !== "string" || !/^PG\d{3,}$/.test(codigo)) {
    throw new Error("codigo: use o formato PG001");
  }
  return codigo;
}

function validarCodigoPedido(codigo) {
  if (typeof codigo !== "string" || !/^PE\d{3,}$/.test(codigo)) {
    throw new Error("codigo_pedido: use o formato PE001");
  }
  return codigo;
}

function validarForma(forma) {
  const formasPermitidas = ["pix", "cartao_credito", "boleto", "cartao_debito"];
  if (!formasPermitidas.includes(forma)) {
    throw new Error("forma: valor inválido");
  }
  return forma;
}

function validarValor(valor) {
  if (typeof valor !== "number" || valor < 0) {
    throw new Error("valor: deve ser um número positivo");
  }
  return valor;
}

function validarParcelas(parcelas) {
  if (
    typeof parcelas !== "number" ||
    !Number.isInteger(parcelas) ||
    parcelas < 1
  ) {
    throw new Error("parcelas: deve ser um inteiro positivo");
  }
  return parcelas;
}

function validarStatus(status) {
  const statusPermitidos = ["aprovado", "pendente", "estornado"];
  if (!statusPermitidos.includes(status)) {
    throw new Error("status: valor inválido");
  }
  return status;
}

function validarData(data) {
  if (!(data instanceof Date) || Number.isNaN(data.getTime())) {
    throw new Error("data: data inválida");
  }
  return data;
}

function validarTransacaoId(transacao_id) {
  if (transacao_id !== null) {
    if (typeof transacao_id !== "string" || transacao_id.trim().length === 0) {
      throw new Error("transacao_id: deve ser string não vazia ou null");
    }
  }
  return transacao_id;
}

function validarPagamento(doc) {
  if (!doc || typeof doc !== "object") {
    throw new Error("pagamento: documento obrigatório");
  }

  return {
    codigo: validarCodigo(doc.codigo),
    codigo_pedido: validarCodigoPedido(doc.codigo_pedido),
    forma: validarForma(doc.forma),
    valor: validarValor(doc.valor),
    parcelas: validarParcelas(doc.parcelas),
    status: validarStatus(doc.status),
    data: validarData(doc.data),
    transacao_id: validarTransacaoId(doc.transacao_id),
  };
}

module.exports = {
  validarCodigo,
  validarCodigoPedido,
  validarForma,
  validarValor,
  validarParcelas,
  validarStatus,
  validarData,
  validarTransacaoId,
  validarPagamento,
};
