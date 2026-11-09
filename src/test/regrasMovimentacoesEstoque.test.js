const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const { describe, test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { MongoClient } = require("mongodb");

const {
  validarCodigo,
  validarCodigoProduto,
  validarTipoMovimentacao,
  validarQuantidade,
  validarData,
  validarResponsavel,
  validarMotivo,
  validarMovimentacao,
} = require("../regrasMovimentacoesEstoque");

describe("movimentacao de estoque no Atlas", () => {
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
      .collection("movimentacoes_estoque")
      .findOne({ codigo: "MOV001" });
  });

  after(async () => {
    if (client) {
      await client.close();
    }
  });

  test("encontra a movimentação MOV001", () => {
    assert.ok(documento, "Movimentação não encontrada no Atlas");
  });

  test("passa nas regras e devolve os campos limpos", () => {
    const movimentacao = validarMovimentacao(documento);

    assert.equal(movimentacao.codigo, "MOV001");
    assert.equal(movimentacao.codigo_produto, "P001");
    assert.ok(["entrada", "saida", "ajuste"].includes(movimentacao.tipo));
    assert.ok(typeof movimentacao.quantidade === "number");
    assert.ok(movimentacao.data instanceof Date);
    assert.ok(movimentacao.responsavel.length > 0);
    assert.ok(movimentacao.motivo.length > 0);
  });
});