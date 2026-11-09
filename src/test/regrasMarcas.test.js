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
  validarPais,
  validarSite,
  validarAtivo,
  validarMarca,
} = require("../regrasMarcas");

describe("marca no Atlas", () => {
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
      .collection("marcas")
      .findOne({ codigo: "MAR001" });
  });

  after(async () => {
    if (client) {
      await client.close();
    }
  });

  test("encontra a marca MAR001", () => {
    assert.ok(documento, "Marca não encontrada no Atlas");
  });

  test("passa nas regras e devolve os campos limpos", () => {
    const marca = validarMarca(documento);

    assert.equal(marca.codigo, "MAR001");
    assert.ok(marca.nome.length >= 2 && marca.nome.length <= 50);
    assert.ok(marca.pais_origem.length >= 2 && marca.pais_origem.length <= 50);
    assert.ok(marca.site.includes(".")); 
    assert.equal(marca.ativo, true); 
  });
});