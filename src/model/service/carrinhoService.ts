import { Repository } from "typeorm";
import { Carrinho } from "../../entities/carrinho.entity";

export class CarrinhoService {
  constructor(private readonly repositorio: Repository<Carrinho>) {}

  addCompra() {
    return 0;
  }
}
