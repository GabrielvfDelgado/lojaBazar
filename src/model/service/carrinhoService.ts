import { Repository } from "typeorm";
import { Carrinho } from "../../entities/carrinho.entity";
import { Cliente } from "../../entities/cliente.entity";
import { ItemCarrinho } from "../../entities/itemCarrinho.entity";
import { Pedido } from "../../entities/pedido.entity";
import { Produto } from "../../entities/produto.entity";

export class CarrinhoService {
  constructor(
    private readonly repositorio: Repository<Carrinho>,
    private readonly repositorioCliente: Repository<Cliente>
  ) {}

  async procuraCarrinho(idCarrinho: number) {
    let carrinho = await this.repositorio.findOne({
      where: {
        id: idCarrinho,
      },
      relations: ["itens"],
    });
    return carrinho;
  }

  async procuraCliente(idCliente: number) {
    let cliente = await this.repositorio.findOne({
      where: {
        id: idCliente,
      },
      relations: ["pedidos"],
    });
    return cliente;
  }

  async addItemCarrinho(idCarrinho: number, produto: Produto) {
    let carrinho = await this.procuraCarrinho(idCarrinho);
    if (carrinho == null) {
      carrinho = new Carrinho();
      carrinho.itens = [];
      carrinho.valorTotal = 0;
      carrinho.frete = 0;
    }
    const itemCarrinho = new ItemCarrinho();
    itemCarrinho.quantidade = produto.quantidade;
    itemCarrinho.preco = produto.preco;
    itemCarrinho.nomeProduto = produto.nome;
    itemCarrinho.produto = produto;
    itemCarrinho.carrinho = carrinho;
    itemCarrinho.idProduto = produto.id;
    itemCarrinho.idCarrinho = carrinho.id;
    carrinho.itens.push(itemCarrinho);
    carrinho.valorTotal += produto.preco;
    carrinho.frete += itemCarrinho.simularFrete();
    await this.repositorio.save(carrinho);
    return carrinho;
  }

  async calculaFrete(idCarrinho: number, frete: number) {
    const carrinho = await this.procuraCarrinho(idCarrinho);
    if (carrinho == null) {
      return 0;
    }
    carrinho.frete += frete;
    return carrinho.frete;
  }

  async fecharPedido(idCarrinho: number, cliente: Cliente) {
    let carrinho = await this.procuraCarrinho(idCarrinho);
    if (carrinho == null) {
      return 0;
    }
    if (cliente == null) {
      return 0;
    }

    const pedido = new Pedido();
    pedido.idEntrega = 0;
    pedido.cliente = cliente;
    pedido.valorTotal =
      pedido.CalcularValorTotalFrete(carrinho.frete) +
      pedido.CalcularValorTotalPedido(carrinho.valorTotal);
    pedido.idCliente = cliente.id;
    if (cliente.pedidos == null) {
      cliente.pedidos = [];
    }
    cliente.pedidos.push(pedido);
    await this.repositorioCliente.save(cliente);
    return cliente;
  }
}
