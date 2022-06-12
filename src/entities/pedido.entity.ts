import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

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

  CalcularValorTotalPedido(): number {
    return 0;
  }

  CalcularValorTotalFrete(): number {
    return 0;
  }
}
