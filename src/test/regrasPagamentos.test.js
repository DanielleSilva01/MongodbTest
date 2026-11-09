const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env")
});

const { describe, test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { MongoClient } = require("mongodb");

const {
  validarCodigo,
  validarCodigoPedido,
  validarForma,
  validarValor,
  validarParcelas,
  validarStatus,
  validarData,
  validarTransacaoId,
  validarPagamento
} = require("../regrasPagamentos");

describe("pagamento no Atlas", () => {
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
      .collection("pagamentos")
      .findOne({ codigo: "PG001" });
  });

  after(async () => {
    if (client) {
      await client.close();
    }
  });

  test("encontra o pagamento PG001", () => {
    assert.ok(documento, "Pagamento não encontrado no Atlas");
  });

  test("passa nas regras e devolve os campos limpos", () => {
    const pagamento = validarPagamento(documento);

    assert.equal(pagamento.codigo, "PG001");
    assert.equal(pagamento.codigo_pedido, "PE001");

    const formasPermitidas = ["pix", "cartao_credito", "boleto", "cartao_debito"];
    const statusPermitidos = ["aprovado", "pendente", "estornado"];
    
    assert.ok(formasPermitidas.includes(pagamento.forma));
    assert.ok(statusPermitidos.includes(pagamento.status));

    assert.ok(pagamento.valor >= 0);
    assert.ok(pagamento.parcelas >= 1);

    assert.ok(pagamento.data instanceof Date);

    if (pagamento.transacao_id !== null) {
      assert.ok(typeof pagamento.transacao_id === "string" && pagamento.transacao_id.trim().length > 0);
    } else {
      assert.equal(pagamento.transacao_id, null);
    }
  });
});