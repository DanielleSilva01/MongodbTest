const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const { describe, test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { MongoClient } = require("mongodb");

const {
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
} = require("../regrasFornecedores");

describe("fornecedor no Atlas", () => {
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
      .collection("fornecedores")
      .findOne({ codigo: "F001" });
  });

  after(async () => {
    if (client) {
      await client.close();
    }
  });

  test("encontra o fornecedor F001", () => {
    assert.ok(documento, "Fornecedor não encontrado no Atlas");
  });

  test("passa nas regras e devolve os campos limpos", () => {
    const fornecedor = validarFornecedor(documento);

    assert.equal(fornecedor.codigo, "F001");
    assert.ok(
      fornecedor.razao_social.length >= 3 &&
        fornecedor.razao_social.length <= 100,
    );
    assert.equal(fornecedor.cnpj.length, 14);

    assert.ok(fornecedor.contato.nome.length > 0);
    assert.ok(fornecedor.contato.email.includes("@"));
    assert.equal(fornecedor.contato.telefone.length, 10 || 11);

    assert.ok(fornecedor.prazo_entrega_dias >= 0);
    assert.ok(Array.isArray(fornecedor.marcas_atendidas));
    assert.equal(fornecedor.ativo, true); 
  });
});