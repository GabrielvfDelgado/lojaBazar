import { Repository } from "typeorm";
import { Cliente } from "../src/entities/cliente.entity";
import { ClienteService } from "../src/model/service/clienteService";

describe("Cliente service", () => {
  let service: ClienteService;
  let repositorio: Repository<Cliente>;

  beforeEach(() => {
    repositorio = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Cliente>;

    service = new ClienteService(repositorio);
  });

  it("Adicionar cliente novo", async () => {
    let cliente = await service.addCliente("Gabriel", 12233);
    expect(cliente).toBeDefined();
    expect(cliente.cpf).toBe(12233);
  });
});
