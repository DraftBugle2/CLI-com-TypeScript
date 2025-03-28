import "reflect-metadata";
import { DataSource } from "typeorm";
import { Produto } from "./entity/Produto";
import { Categoria } from "./entity/Categoria";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "inventario.db",
  synchronize: true, // em produção, use migrations
  logging: false,
  entities: [Produto, Categoria],
});