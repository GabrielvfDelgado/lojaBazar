import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity()
export class Carrinho {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  bairro: string;

  @Column()
  rua: string;
}
