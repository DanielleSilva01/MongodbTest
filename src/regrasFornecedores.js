function validarCodigo(codigo) {
  if (typeof codigo !== "string" || !/^F\d{3,}$/.test(codigo)) {
    throw new Error("codigo: use o formato F001");
  }
  return codigo;
}

function validarRazaoSocial(razao) {
  if (typeof razao !== "string") {
    throw new Error("razao_social: deve ser texto");
  }
  const limpo = razao.trim();
  if (limpo.length < 3 || limpo.length > 100) {
    throw new Error("razao_social: deve ter entre 3 e 100 caracteres");
  }
  return limpo;
}

function validarCnpj(cnpj) {
  const soDigitos = String(cnpj).replace(/\D/g, "");
  if (soDigitos.length !== 14) {
    throw new Error("cnpj: deve ter 14 dígitos");
  }
  return soDigitos;
}

function validarNomeContato(nome) {
  if (typeof nome !== "string" || nome.trim().length === 0) {
    throw new Error("contato.nome: obrigatório");
  }
  return nome.trim();
}

function validarEmailContato(email) {
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("contato.email: inválido");
  }
  return email.trim().toLowerCase();
}

function validarTelefoneContato(telefone) {
  const soDigitos = String(telefone).replace(/\D/g, "");
  if (soDigitos.length < 10 || soDigitos.length > 11) {
    throw new Error("contato.telefone: informe DDD + número");
  }
  return soDigitos;
}

function validarPrazoEntrega(prazo) {
  if (typeof prazo !== "number" || !Number.isInteger(prazo) || prazo < 0) {
    throw new Error(
      "prazo_entrega_dias: deve ser um número inteiro não negativo",
    );
  }
  return prazo;
}

function validarMarcasAtendidas(marcas) {
  if (!Array.isArray(marcas)) {
    throw new Error("marcas_atendidas: deve ser um array");
  }
  // Validação simples de formato dos IDs de marca
  const regex = /^MAR\d{3,}$/;
  for (const marca of marcas) {
    if (typeof marca !== "string" || !regex.test(marca)) {
      throw new Error(`marcas_atendidas: código de marca inválido "${marca}"`);
    }
  }
  return marcas;
}

function validarAtivo(ativo) {
  if (typeof ativo !== "boolean") {
    throw new Error("ativo: deve ser true ou false");
  }
  return ativo;
}

function validarFornecedor(doc) {
  if (!doc || typeof doc !== "object") {
    throw new Error("fornecedor: documento obrigatório");
  }

  if (!doc.contato || typeof doc.contato !== "object") {
    throw new Error("fornecedor: contato é obrigatório");
  }

  return {
    codigo: validarCodigo(doc.codigo),
    razao_social: validarRazaoSocial(doc.razao_social),
    cnpj: validarCnpj(doc.cnpj),
    contato: {
      nome: validarNomeContato(doc.contato.nome),
      email: validarEmailContato(doc.contato.email),
      telefone: validarTelefoneContato(doc.contato.telefone),
    },
    prazo_entrega_dias: validarPrazoEntrega(doc.prazo_entrega_dias),
    marcas_atendidas: validarMarcasAtendidas(doc.marcas_atendidas),
    ativo: validarAtivo(doc.ativo),
  };
}

module.exports = {
  validarCodigo,
  validarRazaoSocial,
  validarCnpj,
  validarNomeContato,
  validarEmailContato,
  validarTelefoneContato,
  validarPrazoEntrega,
  validarMarcasAtendidas,
  validarAtivo,
  validarFornecedor,
};
