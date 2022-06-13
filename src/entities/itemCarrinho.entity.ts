import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Carrinho } from "./carrinho.entity";
import { Produto } from "./produto.entity";

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

  @OneToOne(() => Produto)
  @JoinColumn({ name: "idProduto" })
  produto: Produto;

  simularFrete(): number {
    return 2;
  }
}
