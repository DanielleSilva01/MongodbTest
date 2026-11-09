function validarCodigo(codigo) {
  if (typeof codigo !== "string" || !/^MAR\d{3,}$/.test(codigo)) {
    throw new Error("codigo: use o formato MAR001");
  }
  return codigo;
}

function validarNome(nome) {
  if (typeof nome !== "string") {
    throw new Error("nome: deve ser texto");
  }
  const limpo = nome.trim();
  if (limpo.length < 2 || limpo.length > 50) {
    throw new Error("nome: deve ter entre 2 e 50 caracteres");
  }
  return limpo;
}

function validarPais(pais) {
  if (typeof pais !== "string") {
    throw new Error("pais_origem: deve ser texto");
  }
  const limpo = pais.trim();
  if (limpo.length < 2 || limpo.length > 50) {
    throw new Error("pais_origem: deve ter entre 2 e 50 caracteres");
  }
  return limpo;
}

function validarSite(site) {
  if (
    typeof site !== "string" ||
    !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(site)
  ) {
    throw new Error("site: formato inválido (ex: exemplo.com)");
  }
  return site.trim().toLowerCase();
}

function validarAtivo(ativo) {
  if (typeof ativo !== "boolean") {
    throw new Error("ativo: deve ser true ou false");
  }
  return ativo;
}

function validarMarca(doc) {
  if (!doc || typeof doc !== "object") {
    throw new Error("marca: documento obrigatório");
  }

  return {
    codigo: validarCodigo(doc.codigo),
    nome: validarNome(doc.nome),
    pais_origem: validarPais(doc.pais_origem),
    site: validarSite(doc.site),
    ativo: validarAtivo(doc.ativo),
  };
}

module.exports = {
  validarCodigo,
  validarNome,
  validarPais,
  validarSite,
  validarAtivo,
  validarMarca,
};
