import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Produto } from "./produto.entity";

@Entity()
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idProduto: number;

  @Column()
  quantidade: number;

  @Column()
  preco: number;

  @OneToOne(() => Produto)
  @JoinColumn({ name: "idProduto" })
  produto: Produto;
}
