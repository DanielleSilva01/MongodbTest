function validarCodigo(codigo) {
  if (typeof codigo !== "string" || !/^OS\d{3,}$/.test(codigo)) {
    throw new Error("codigo: use o formato OS001");
  }
  return codigo;
}

function validarCodigoCliente(codigo) {
  if (typeof codigo !== "string" || !/^C\d{3,}$/.test(codigo)) {
    throw new Error("codigo_cliente: use o formato C001");
  }
  return codigo;
}

function validarCodigoServico(codigo) {
  if (typeof codigo !== "string" || !/^S\d{3,}$/.test(codigo)) {
    throw new Error("codigo_servico: use o formato S001");
  }
  return codigo;
}

function validarCodigoColaborador(codigo) {
  if (typeof codigo !== "string" || !/^COL\d{3,}$/.test(codigo)) {
    throw new Error("codigo_colaborador: use o formato COL001");
  }
  return codigo;
}

function validarEquipamento(equip) {
  if (typeof equip !== "string" || equip.trim().length === 0) {
    throw new Error("equipamento: obrigatório");
  }
  return equip.trim();
}

function validarDefeito(defeito) {
  if (typeof defeito !== "string" || defeito.trim().length === 0) {
    throw new Error("defeito_relatado: obrigatório");
  }
  return defeito.trim();
}

function validarStatus(status) {
  const statusPermitidos = [
    "aberta",
    "aguardando_aprovacao",
    "em_andamento",
    "concluida",
  ];
  if (!statusPermitidos.includes(status)) {
    throw new Error("status: valor inválido");
  }
  return status;
}

function validarValorTotal(valor) {
  if (typeof valor !== "number" || valor < 0) {
    throw new Error("valor_total: deve ser um número positivo");
  }
  return valor;
}

function validarData(data) {
  if (!(data instanceof Date) || Number.isNaN(data.getTime())) {
    throw new Error("data: data inválida");
  }
  return data;
}

function validarOrdemServico(doc) {
  if (!doc || typeof doc !== "object") {
    throw new Error("ordem_servico: documento obrigatório");
  }

  return {
    codigo: validarCodigo(doc.codigo),
    codigo_cliente: validarCodigoCliente(doc.codigo_cliente),
    codigo_servico: validarCodigoServico(doc.codigo_servico),
    codigo_colaborador: validarCodigoColaborador(doc.codigo_colaborador),
    equipamento: validarEquipamento(doc.equipamento),
    defeito_relatado: validarDefeito(doc.defeito_relatado),
    status: validarStatus(doc.status),
    valor_total: validarValorTotal(doc.valor_total),
    data_abertura: validarData(doc.data_abertura),
    data_conclusao:
      doc.data_conclusao === null ? null : validarData(doc.data_conclusao),
  };
}

module.exports = {
  validarCodigo,
  validarCodigoCliente,
  validarCodigoServico,
  validarCodigoColaborador,
  validarEquipamento,
  validarDefeito,
  validarStatus,
  validarValorTotal,
  validarData,
  validarOrdemServico,
};
