import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Cliente } from "./cliente.entity";

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idCliente: number;

  @Column()
  valorTotal: number;

  @Column()
  idEntrega: number;

  @ManyToOne(() => Cliente, (Cliente) => Cliente.pedidos)
  @JoinColumn({ name: "idCliente" })
  cliente: Cliente;

  CalcularValorTotalPedido(valorTotal: number): number {
    return valorTotal;
  }

  CalcularValorTotalFrete(valorFrete: number): number {
    return valorFrete;
  }
}
