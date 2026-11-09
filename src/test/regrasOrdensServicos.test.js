const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const { describe, test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { MongoClient } = require("mongodb");

const {
  validarCodigo,
  validarCodigoCliente,
  validarCodigoServico,
  validarCodigoColaborador,
  validarEquipamento,
  validarDefeito,
  validarStatus,
  validarValorTotal,
  validarData,
  validarOrdemServico,
} = require("../regrasOrdensServico");

describe("ordem de serviço no Atlas", () => {
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
      .collection("ordens_servico")
      .findOne({ codigo: "OS001" });
  });

  after(async () => {
    if (client) {
      await client.close();
    }
  });

  test("encontra a ordem de serviço OS001", () => {
    assert.ok(documento, "Ordem de Serviço não encontrada no Atlas");
  });

  test("passa nas regras e devolve os campos limpos", () => {
    const os = validarOrdemServico(documento);

    assert.equal(os.codigo, "OS001");
    assert.equal(os.codigo_cliente, "C001"); 
    assert.equal(os.codigo_servico, "S001"); 
    assert.equal(os.codigo_colaborador, "COL001"); 

    assert.ok(os.equipamento.length > 0);
    assert.ok(os.defeito_relatado.length > 0);

    const statusPermitidos = [
      "aberta",
      "aguardando_aprovacao",
      "em_andamento",
      "concluida",
    ];
    assert.ok(statusPermitidos.includes(os.status));

    assert.ok(os.valor_total >= 0);

    assert.ok(os.data_abertura instanceof Date);

    if (os.data_conclusao !== null) {
      assert.ok(os.data_conclusao instanceof Date);
    } else {
      assert.equal(os.data_conclusao, null);
    }
  });
});