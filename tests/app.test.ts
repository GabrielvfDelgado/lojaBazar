import { Repository } from "typeorm";
import { Carrinho } from "../src/entities/carrinho.entity";
import { Produto } from "../src/entities/produto.entity";
import { CarrinhoService } from "../src/model/service/carrinhoService";

describe("Carrinho service", () => {
  let service: CarrinhoService;
  let repositorio: Repository<Carrinho>;
  beforeEach(() => {
    repositorio = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Carrinho>;
    service = new CarrinhoService(repositorio);
  });

  it("Adiciona produto no carrinho novo", async () => {
    const produto = new Produto();
    produto.preco = 10.0;
    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(null);
    const carrinho = await service.addItemCarrinho(1, produto);

    expect(carrinho).toBeDefined();
    expect(carrinho?.itens.length).toBe(1);
    expect(carrinho.valorTotal).toBe(10);
  });

  it("Adiciona produto no carrinho existente", async () => {
    const produto1 = new Produto();
    produto1.preco = 10.0;
    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(null);
    const carrinhoExistente = await service.addItemCarrinho(1, produto1);

    const produto2 = new Produto();
    produto2.preco = 20.0;
    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(carrinhoExistente);
    const carrinho = await service.addItemCarrinho(1, produto2);
    expect(carrinho).toBeDefined();
    expect(carrinho?.itens.length).toBe(2);
    expect(carrinho.valorTotal).toBe(30);
  });
});
