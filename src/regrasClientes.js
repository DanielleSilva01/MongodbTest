function validarCodigo(codigo) {
  if (typeof codigo !== "string" || !/^C\d{3,}$/.test(codigo)) {
    throw new Error("codigo: use o formato C001");
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

function validarTipo(tipo) {
  if (tipo !== "PF" && tipo !== "PJ") {
    throw new Error("tipo: use PF ou PJ");
  }
  return tipo;
}

function validarDocumento(documento, tipo) {
  const soDigitos = String(documento ?? "").replace(/\D/g, "");

  if (tipo === "PF" && soDigitos.length !== 11) {
    throw new Error("documento: CPF deve ter 11 dígitos");
  }
  if (tipo === "PJ" && soDigitos.length !== 14) {
    throw new Error("documento: CNPJ deve ter 14 dígitos");
  }
  return soDigitos;
}

function validarEmail(email) {
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("email: inválido");
  }
  return email.trim().toLowerCase();
}

function validarTelefone(telefone) {
  const soDigitos = String(telefone ?? "").replace(/\D/g, "");
  if (soDigitos.length < 10 || soDigitos.length > 11) {
    throw new Error("telefone: informe DDD + número");
  }
  return soDigitos;
}

function validarCidade(cidade) {
  if (typeof cidade !== "string" || cidade.trim().length === 0) {
    throw new Error("cidade: obrigatória");
  }
  return cidade.trim();
}

function validarUf(uf) {
  if (typeof uf !== "string" || !/^[A-Z]{2}$/.test(uf)) {
    throw new Error("uf: use a sigla com 2 letras maiúsculas");
  }
  return uf;
}

function validarDataCadastro(data) {
  if (!(data instanceof Date) || Number.isNaN(data.getTime())) {
    throw new Error("data_cadastro: data inválida");
  }
  if (data > new Date()) {
    throw new Error("data_cadastro: não pode ser futura");
  }
  return data;
}

function validarAtivo(ativo) {
  if (typeof ativo !== "boolean") {
    throw new Error("ativo: deve ser true ou false");
  }
  return ativo;
}

function validarCliente(doc) {
  if (!doc || typeof doc !== "object") {
    throw new Error("cliente: documento obrigatório");
  }

  const tipo = validarTipo(doc.tipo);

  return {
    codigo: validarCodigo(doc.codigo),
    nome: validarNome(doc.nome),
    tipo,
    documento: validarDocumento(doc.documento, tipo),
    email: validarEmail(doc.email),
    telefone: validarTelefone(doc.telefone),
    cidade: validarCidade(doc.cidade),
    uf: validarUf(doc.uf),
    data_cadastro: validarDataCadastro(doc.data_cadastro),
    ativo: validarAtivo(doc.ativo)
  };
}

module.exports = {
  validarCodigo,
  validarNome,
  validarTipo,
  validarDocumento,
  validarEmail,
  validarTelefone,
  validarCidade,
  validarUf,
  validarDataCadastro,
  validarAtivo,
  validarCliente
};
