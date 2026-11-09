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
  validarCodigoExterno,
  validarPreco,
  validarEstoque,
  validarGarantia,
  validarEspecificacoes,
  validarAtivo,
  validarProduto
} = require("../regrasProdutos");

describe("produto no Atlas", () => {
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
      .collection("produtos")
      .findOne({ codigo: "P001" });
  });

  after(async () => {
    if (client) {
      await client.close();
    }
  });

  test("encontra o produto P001", () => {
    assert.ok(documento, "Produto não encontrado no Atlas");
  });

  test("passa nas regras e devolve os campos limpos", () => {
    const produto = validarProduto(documento);

    assert.equal(produto.codigo, "P001");
    assert.ok(produto.codigo_categoria.length >= 3); 
    
    if (produto.codigo_marca !== null) {
      assert.ok(produto.codigo_marca.length >= 3);
    } else {
      assert.equal(produto.codigo_marca, null);
    }

    assert.ok(produto.nome.length >= 3 && produto.nome.length <= 100);

    assert.ok(produto.preco >= 0);
    assert.ok(produto.estoque >= 0);
    assert.ok(produto.garantia_meses >= 0);

    assert.ok(typeof produto.especificacoes === "object" && produto.especificacoes !== null);

    assert.equal(produto.ativo, true); 
  });
});