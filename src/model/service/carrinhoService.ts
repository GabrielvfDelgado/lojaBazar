import { Repository } from "typeorm";
import { Carrinho } from "../../entities/carrinho.entity";
import { ItemCarrinho } from "../../entities/itemCarrinho.entity";
import { Produto } from "../../entities/produto.entity";

export class CarrinhoService {
  constructor(private readonly repositorio: Repository<Carrinho>) {}

  async addItemCarrinho(idCarrinho: number, produto: Produto) {
    let carrinho = await this.repositorio.findOne({
      where: {
        id: idCarrinho,
      },
      relations: ["itens"],
    });

    console.log(carrinho);
    if (carrinho == null) {
      carrinho = new Carrinho();
      carrinho.itens = [];
      carrinho.valorTotal = 0;
    }
    console.log(carrinho);

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
    await this.repositorio.save(carrinho);
    return carrinho;
  }
}
