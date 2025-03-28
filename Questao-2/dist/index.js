"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("🚀 Aplicação iniciada!");
require("reflect-metadata");
const data_source_1 = require("./data-source");
const readline_sync_1 = __importDefault(require("readline-sync"));
const Categoria_js_1 = require("./entity/Categoria.js");
const Produto_js_1 = require("./entity/Produto.js");
async function main() {
    await data_source_1.AppDataSource.initialize();
    const categoriaRepo = data_source_1.AppDataSource.getRepository(Categoria_js_1.Categoria);
    const produtoRepo = data_source_1.AppDataSource.getRepository(Produto_js_1.Produto);
    let sair = false;
    while (!sair) {
        const opcoes = [
            "Criar categoria",
            "Listar categorias",
            "Criar produto",
            "Listar produtos",
            "Sair"
        ];
        const escolha = readline_sync_1.default.keyInSelect(opcoes, "Escolha uma opção:");
        console.clear();
        switch (escolha) {
            case 0:
                const nomeCat = readline_sync_1.default.question("Nome da categoria: ");
                const descCat = readline_sync_1.default.question("Descrição (opcional): ");
                const novaCategoria = categoriaRepo.create({
                    nome: nomeCat,
                    descricao: descCat,
                    dataCriacao: new Date(),
                });
                await categoriaRepo.save(novaCategoria);
                break;
            case 1:
                const categorias = await categoriaRepo.find();
                console.table(categorias);
                break;
            case 2:
                const nomeProd = readline_sync_1.default.question("Nome do produto: ");
                const descProd = readline_sync_1.default.question("Descrição: ");
                const preco = parseFloat(readline_sync_1.default.question("Preço: "));
                const qtd = parseInt(readline_sync_1.default.question("Quantidade: "));
                const catId = parseInt(readline_sync_1.default.question("ID da categoria: "));
                const categoria = await categoriaRepo.findOneBy({ id: catId });
                if (!categoria) {
                    console.log("⚠️ Categoria não encontrada.");
                    break;
                }
                const produto = produtoRepo.create({
                    nome: nomeProd,
                    descricao: descProd,
                    preco,
                    quantidade: qtd,
                    categoria,
                    dataCriacao: new Date(),
                    dataAtualizacao: new Date()
                });
                await produtoRepo.save(produto);
                break;
            case 3:
                const produtos = await produtoRepo.find();
                console.table(produtos);
                break;
            default:
                sair = true;
                break;
        }
    }
}
main();
