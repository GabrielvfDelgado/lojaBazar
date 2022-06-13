import { Repository } from "typeorm";
import { Carrinho } from "../src/entities/carrinho.entity";
import { Cliente } from "../src/entities/cliente.entity";
import { Produto } from "../src/entities/produto.entity";
import { CarrinhoService } from "../src/model/service/carrinhoService";

describe("Carrinho service", () => {
  let service: CarrinhoService;
  let repositorio: Repository<Carrinho>;
  let repositorioCliente: Repository<Cliente>;
  beforeEach(() => {
    repositorio = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Carrinho>;
    repositorioCliente = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Cliente>;
    service = new CarrinhoService(repositorio, repositorioCliente);
  });

  it("Adicionar produto no carrinho novo", async () => {
    const produto = new Produto();
    produto.preco = 10.0;
    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(null);
    const carrinho = await service.addItemCarrinho(1, produto);

    expect(carrinho).toBeDefined();
    expect(carrinho?.itens.length).toBe(1);
    expect(carrinho.valorTotal).toBe(10);
  });

  it("Adicionar produto no carrinho existente", async () => {
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

  it("Simular Frete Carrinho", async () => {
    const produto1 = new Produto();
    produto1.preco = 10.0;
    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(null);
    const carrinhoExistente = await service.addItemCarrinho(1, produto1);
    expect(carrinhoExistente.frete).toBe(2);
  });

  it("Fechar pedido carrinho", async () => {
    const produto1 = new Produto();
    produto1.preco = 10.0;
    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(null);
    const carrinhoExistente = await service.addItemCarrinho(1, produto1);

    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(carrinhoExistente);
    const frete = await service.calculaFrete(1, 10.5);

    const cliente = new Cliente();
    cliente.nome = "Gabriel";
    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(carrinhoExistente);
    const fecharPedido = await service.fecharPedido(1, cliente);
    expect(fecharPedido).toBeDefined();
    expect(cliente.pedidos[0].valorTotal).toBe(22.5);
    expect(cliente.pedidos.length).toBe(1);
  });

  it("Calcular frete ", async () => {
    const produto1 = new Produto();
    produto1.preco = 10.0;
    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(null);
    const carrinhoExistente = await service.addItemCarrinho(1, produto1);

    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(carrinhoExistente);
    const frete = await service.calculaFrete(1, 10.5);
    expect(frete).toBe(12.5);
  });

  it("Fazer Pagamento", async () => {
    const produto1 = new Produto();
    produto1.preco = 10.0;
    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(null);
    const carrinhoExistente = await service.addItemCarrinho(1, produto1);

    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(carrinhoExistente);
    const frete = await service.calculaFrete(1, 10.5);

    const cliente = new Cliente();
    cliente.nome = "Gabriel";
    jest.spyOn(repositorio, "findOne").mockResolvedValueOnce(carrinhoExistente);
    const fecharPedido = await service.fecharPedido(1, cliente);

    jest.spyOn(repositorioCliente, "findOne").mockResolvedValueOnce(cliente);
    const pagamento = await service.fazerPagamento(1, 22.5);
    expect(pagamento).toBe(200);
  });
});
