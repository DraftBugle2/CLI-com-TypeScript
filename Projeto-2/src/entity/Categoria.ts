import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Produto } from "./Produto";

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ nullable: true })
  descricao?: string;

  @OneToMany(() => Produto, (produto: Produto) => produto.categoria)
  dataCriacao!: Date;

  @OneToMany(() => Produto, produto => produto.categoria)
  produtos!: Produto[];
}
