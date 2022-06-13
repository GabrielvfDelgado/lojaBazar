import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Pedido } from "./pedido.entity";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: number;

  @OneToMany(() => Pedido, (Pedido) => Pedido.idCliente, {
    cascade: true,
  })
  pedidos: Pedido[];
}
