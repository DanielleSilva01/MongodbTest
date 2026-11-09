const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env")
});

const test = require("node:test");
const assert = require("node:assert/strict");
const { MongoClient } = require("mongodb");
const { calcularPedido } = require("../regrasPedidos");

test("calcula pedido usando produto real do Atlas", async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI não foi encontrada no arquivo .env");
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();

    const db = client.db("LojaInformatica");

    const produto = await db.collection("produtos").findOne({
      nome: "Notebook Dell Inspiron 15"
    });

    assert.ok(produto, "Produto não encontrado no Atlas");
    assert.ok(produto.estoque >= 100, "Produto sem estoque disponível");

    const pedido = calcularPedido(
      [{ produtoId: produto._id, quantidade: 1 }],
      [produto]
    );

    assert.equal(pedido.total, produto.preco);
  } finally {
    await client.close();
  }
});