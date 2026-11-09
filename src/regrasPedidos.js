function calcularPedido(itens, produtos) {
  if (!Array.isArray(itens) || itens.length === 0) {
    throw new Error("O pedido precisa ter pelo menos um item.");
  }

  const ids = itens.map(item => String(item.produtoId));

  if (new Set(ids).size !== ids.length) {
    throw new Error("Não repita o mesmo produto no pedido.");
  }

  const itensCalculados = itens.map(item => {
    if (!Number.isInteger(item.quantidade) || item.quantidade <= 0) {
      throw new Error("A quantidade deve ser um inteiro positivo.");
    }

    const produto = produtos.find(
      produto => String(produto._id) === String(item.produtoId)
    );

    if (!produto) {
      throw new Error("Produto não encontrado.");
    }

    if (!Number.isInteger(produto.estoque) || produto.estoque < item.quantidade) {
      throw new Error("Estoque insuficiente.");
    }

    if (typeof produto.preco !== "number" || produto.preco < 0) {
      throw new Error("Preço inválido.");
    }

    return {
      produtoId: produto._id,
      nome: produto.nome,
      quantidade: item.quantidade,
      precoUnitario: produto.preco
    };
  });

  const totalCentavos = itensCalculados.reduce(
    (soma, item) =>
      soma + Math.round(item.precoUnitario * 100) * item.quantidade,
    0
  );

  return {
    itens: itensCalculados,
    total: totalCentavos / 100
  };
}

module.exports = { calcularPedido };