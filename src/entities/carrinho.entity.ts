import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ItemCarrinho } from "./itemCarrinho.entity";

@Entity()
export class Carrinho {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dataCompra: Date;

  @Column()
  valorTotal: number;

  @Column()
  frete: number;

  @OneToMany(() => ItemCarrinho, (ItemCarrinho) => ItemCarrinho.carrinho)
  itens: ItemCarrinho[];
}
