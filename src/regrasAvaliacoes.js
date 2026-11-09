function validarCodigo(codigo) {
  if (typeof codigo !== "string" || !/^AV\d{3,}$/.test(codigo)) {
    throw new Error("codigo: use o formato AV001");
  }
  return codigo;
}

function validarCodigoCliente(codigo) {
  if (typeof codigo !== "string" || !/^C\d{3,}$/.test(codigo)) {
    throw new Error("codigo_cliente: use o formato C001");
  }
  return codigo;
}

function validarTipo(tipo) {
  const tiposPermitidos = ["pedido", "ordem_servico"];
  if (!tiposPermitidos.includes(tipo)) {
    throw new Error("tipo: use pedido ou ordem_servico");
  }
  return tipo;
}

function validarCodigoReferencia(codigo) {
  if (typeof codigo !== "string" || codigo.trim().length === 0) {
    throw new Error("codigo_referencia: obrigatório");
  }
  return codigo.trim();
}

function validarNota(nota) {
  if (
    typeof nota !== "number" ||
    !Number.isInteger(nota) ||
    nota < 1 ||
    nota > 5
  ) {
    throw new Error("nota: deve ser um inteiro entre 1 e 5");
  }
  return nota;
}

function validarComentario(comentario) {
  if (typeof comentario !== "string") {
    throw new Error("comentario: deve ser texto");
  }
  const limpo = comentario.trim();
  if (limpo.length < 5 || limpo.length > 500) {
    throw new Error("comentario: deve ter entre 5 e 500 caracteres");
  }
  return limpo;
}

function validarData(data) {
  if (!(data instanceof Date) || Number.isNaN(data.getTime())) {
    throw new Error("data: data inválida");
  }
  return data;
}

function validarAvaliacao(doc) {
  if (!doc || typeof doc !== "object") {
    throw new Error("avaliacao: documento obrigatório");
  }

  return {
    codigo: validarCodigo(doc.codigo),
    codigo_cliente: validarCodigoCliente(doc.codigo_cliente),
    tipo: validarTipo(doc.tipo),
    codigo_referencia: validarCodigoReferencia(doc.codigo_referencia),
    nota: validarNota(doc.nota),
    comentario: validarComentario(doc.comentario),
    data: validarData(doc.data),
  };
}

module.exports = {
  validarCodigo,
  validarCodigoCliente,
  validarTipo,
  validarCodigoReferencia,
  validarNota,
  validarComentario,
  validarData,
  validarAvaliacao,
};
