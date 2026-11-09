function validarCodigo(codigo) {
  if (typeof codigo !== "string" || !/^COL\d{3,}$/.test(codigo)) {
    throw new Error("codigo: use o formato COL001");
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

function validarCargo(cargo) {
  if (typeof cargo !== "string" || cargo.trim().length === 0) {
    throw new Error("cargo: obrigatório");
  }
  return cargo.trim();
}

function validarSetor(setor) {
  if (typeof setor !== "string" || setor.trim().length === 0) {
    throw new Error("setor: obrigatório");
  }
  return setor.trim();
}

function validarSalario(salario) {
  if (typeof salario !== "number" || isNaN(salario) || salario < 0) {
    throw new Error("salario: deve ser um número positivo");
  }
  return salario;
}

function validarDataAdmissao(data) {
  if (!(data instanceof Date) || Number.isNaN(data.getTime())) {
    throw new Error("data_admissao: data inválida");
  }
  if (data > new Date()) {
    throw new Error("data_admissao: não pode ser futura");
  }
  return data;
}

function validarAtivo(ativo) {
  if (typeof ativo !== "boolean") {
    throw new Error("ativo: deve ser true ou false");
  }
  return ativo;
}

function validarColaborador(doc) {
  if (!doc || typeof doc !== "object") {
    throw new Error("colaborador: documento obrigatório");
  }

  return {
    codigo: validarCodigo(doc.codigo),
    nome: validarNome(doc.nome),
    cargo: validarCargo(doc.cargo),
    setor: validarSetor(doc.setor),
    salario: validarSalario(doc.salario),
    data_admissao: validarDataAdmissao(doc.data_admissao),
    ativo: validarAtivo(doc.ativo),
  };
}

module.exports = {
  validarCodigo,
  validarNome,
  validarCargo,
  validarSetor,
  validarSalario,
  validarDataAdmissao,
  validarAtivo,
  validarColaborador,
};
