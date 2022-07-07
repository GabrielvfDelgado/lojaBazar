import { Repository } from "typeorm";
import { Cliente } from "../../entities/cliente.entity";

export class ClienteService {
  constructor(private readonly repositorio: Repository<Cliente>) {}

  async procuraCliente(cpf: number) {
    let cliente = await this.repositorio.findOne({
      where: {
        cpf: cpf,
      },
      relations: ["pedidos"],
    });
    return cliente;
  }

  async addCliente(nome: string, cpf: number) {
    let cliente = await this.procuraCliente(cpf);

    if (cliente != null) {
      throw new Error("Ja existe um cliente com esse CPF");
    }
    cliente = new Cliente();
    cliente.nome = nome;
    cliente.cpf = cpf;
    console.log(cliente);
    await this.repositorio.save(cliente);
    return cliente;
  }
}
