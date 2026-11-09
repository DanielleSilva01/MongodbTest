const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const { describe, test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { MongoClient } = require("mongodb");

const {
  validarCodigo,
  validarNome,
  validarDescricao,
  validarAtivo,
  validarCategoria,
} = require("../regrasCategorias");

describe("categoria no Atlas", () => {
  let client;
  let documento;

  before(async () => {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI não encontrada no arquivo .env");
    }

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    documento = await client
      .db("LojaInformatica")
      .collection("categorias")
      .findOne({ codigo: "CAT001" });
  });

  after(async () => {
    if (client) {
      await client.close();
    }
  });

  test("encontra a categoria CAT001", () => {
    assert.ok(documento, "Categoria não encontrada no Atlas");
  });

  test("passa nas regras e devolve os campos limpos", () => {
    const categoria = validarCategoria(documento);

    assert.equal(categoria.codigo, "CAT001");
    assert.equal(categoria.nome, "Notebooks");
    assert.equal(categoria.descricao, "Computadores portáteis para uso geral"); 
    assert.equal(categoria.ativo, true); 
  });
});