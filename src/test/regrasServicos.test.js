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
  validarPrecoBase,
  validarDuracaoHoras,
  validarGarantiaDias,
  validarAtivo,
  validarServico,
} = require("../regrasServicos");

describe("servico no Atlas", () => {
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
      .collection("servicos")
      .findOne({ codigo: "S001" });
  });

  after(async () => {
    if (client) {
      await client.close();
    }
  });

  test("encontra o serviço S001", () => {
    assert.ok(documento, "Serviço não encontrado no Atlas");
  });

  test("passa nas regras e devolve os campos limpos", () => {
    const servico = validarServico(documento);

    assert.equal(servico.codigo, "S001");

    assert.ok(servico.nome.length >= 3 && servico.nome.length <= 100);
    assert.ok(servico.descricao.length >= 5 && servico.descricao.length <= 200);

    assert.ok(servico.preco_base >= 0);
    assert.ok(servico.duracao_horas >= 1);
    assert.ok(servico.garantia_dias >= 0);

    assert.equal(servico.ativo, true); 
  });
});