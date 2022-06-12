import { createConnection, getConnection, getRepository } from "typeorm";
import { Carrinho } from "../src/entities/carrinho.entity";
import { CarrinhoService } from "../src/model/service/carrinhoService";

beforeEach(() => {
  return createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Carrinho],
    synchronize: true,
    logging: false,
  });
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});

describe("Testando Carrinho Service", () => {
  it("Adiciona item carrinho", () => {
    const service = new CarrinhoService();
    const result = service.addCompra();
  });
});
