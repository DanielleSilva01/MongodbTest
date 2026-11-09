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
  validarCargo,
  validarSetor,
  validarSalario,
  validarDataAdmissao,
  validarAtivo,
  validarColaborador,
} = require("../regrasColaboradores");

describe("colaborador no Atlas", () => {
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
      .collection("colaboradores")
      .findOne({ codigo: "COL001" });
  });

  after(async () => {
    if (client) {
      await client.close();
    }
  });

  test("encontra o colaborador COL001", () => {
    assert.ok(documento, "Colaborador não encontrado no Atlas");
  });

  test("passa nas regras e devolve os campos limpos", () => {
    const colaborador = validarColaborador(documento);
   
    assert.equal(colaborador.codigo, "COL001");
    assert.ok(colaborador.nome.length >= 3 && colaborador.nome.length <= 100);
    assert.ok(colaborador.cargo.length > 0);
    assert.ok(colaborador.setor.length > 0);
    assert.ok(colaborador.salario >= 0);
    assert.ok(colaborador.data_admissao instanceof Date);
    assert.equal(colaborador.ativo, true); 
  });
});