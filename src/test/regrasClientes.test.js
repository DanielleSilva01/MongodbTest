const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env")
});

const { describe, test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { MongoClient } = require("mongodb");

const {
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
} = require("../regrasClientes");

describe("cliente no Atlas", () => {
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
      .collection("clientes")
      .findOne({ codigo: "C002" });
  });

  after(async () => {
    if (client) {
      await client.close();
    }
  });

  test("encontra o cliente C002", () => {
    assert.ok(documento, "Cliente não encontrado no Atlas");
  });

  test("passa nas regras e devolve os campos limpos", () => {
    const cliente = validarCliente(documento);

    assert.equal(cliente.nome, "Bruno Carvalho Lima");
    assert.equal(cliente.tipo, "PF");
    assert.equal(cliente.documento, "98765432100");
    assert.equal(cliente.telefone, "41997448899");
    assert.equal(cliente.uf, "PR");
    assert.ok(cliente.data_cadastro instanceof Date);
  });
});