"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Produto_1 = require("./entity/Produto");
const Categoria_1 = require("./entity/Categoria");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "inventario.db",
    synchronize: true, // em produção, use migrations
    logging: false,
    entities: [Produto_1.Produto, Categoria_1.Categoria],
});
