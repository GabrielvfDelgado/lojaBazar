import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Carrinho } from "./carrinho.entity";

@Entity()
export class ItemCarrinho {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idCarrinho: number;

  @Column()
  idProduto: number;

  @Column()
  quantidade: number;

  @Column()
  preco: number;

  @Column()
  nomeProduto: string;

  @ManyToOne(() => Carrinho, (Carrinho) => Carrinho.itens)
  @JoinColumn({ name: "idCarrinho" })
  carrinho: Carrinho;

  simularFrete(): number {
    return 0;
  }
}
