import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Categoria } from "./Categoria"; // Adjust the path as needed

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  nome!: string;

  @Column({ nullable: true })
  descricao?: string;

  @Column("decimal")
  preco!: number;

  @ManyToOne(() => Categoria, (categoria: Categoria) => categoria.produtos, { eager: true })
  quantidade!: number;

  @ManyToOne(() => Categoria, categoria => categoria.produtos, { eager: true })
  @JoinColumn({ name: "categoriaId" })
  categoria!: Categoria;

  @Column()
  dataCriacao!: Date;

  @Column()
  dataAtualizacao!: Date;
}
