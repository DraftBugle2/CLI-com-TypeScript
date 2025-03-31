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
        console.log("\n==== MENU PRINCIPAL ====");
        const opcoes = [
            "Criar Categoria",
            "Listar Categorias",
            "Criar Produto",
            "Listar Produtos",
            "Buscar Produto por Nome",
            "Remover Produto",
            "Sair"
        ];
        const escolha = readline_sync_1.default.keyInSelect(opcoes, "Escolha uma opcao:", { cancel: "CANCEL" });
        console.clear();
        switch (escolha) {
            case 0:
                const nomeCat = readline_sync_1.default.question("Nome da categoria: ");
                const descCat = readline_sync_1.default.question("Descricao (opcional): ");
                const novaCategoria = categoriaRepo.create({
                    nome: nomeCat,
                    descricao: descCat,
                    dataCriacao: new Date(),
                });
                await categoriaRepo.save(novaCategoria);
                console.log("✅ Categoria criada com sucesso!");
                break;
            case 1:
                const categorias = await categoriaRepo.find();
                console.table(categorias);
                break;
            case 2:
                const nomeProd = readline_sync_1.default.question("Nome do produto: ");
                const descProd = readline_sync_1.default.question("Descricao: ");
                const preco = parseFloat(readline_sync_1.default.question("Preco: "));
                const qtd = parseInt(readline_sync_1.default.question("Quantidade: "));
                const catId = parseInt(readline_sync_1.default.question("ID da categoria: "));
                const categoria = await categoriaRepo.findOneBy({ id: catId });
                if (!categoria) {
                    console.log("⚠️ Categoria nao encontrada.");
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
                console.log("✅ Produto criado com sucesso!");
                break;
            case 3:
                const produtos = await produtoRepo.find({ relations: ["categoria"] });
                console.table(produtos);
                break;
            case 4:
                const buscaNome = readline_sync_1.default.question("Digite o nome do produto para buscar: ");
                const encontrados = await produtoRepo.findBy({ nome: buscaNome });
                if (encontrados.length > 0) {
                    console.table(encontrados);
                }
                else {
                    console.log("🔍 Nenhum produto encontrado com esse nome.");
                }
                break;
            case 5:
                const nomeRemover = readline_sync_1.default.question("Digite o nome do produto a ser removido: ");
                const produtoRemover = await produtoRepo.findOneBy({ nome: nomeRemover });
                if (!produtoRemover) {
                    console.log("❌ Produto nao encontrado.");
                    break;
                }
                await produtoRepo.remove(produtoRemover);
                console.log("🗑️ Produto removido com sucesso.");
                break;
            case 6:
                sair = true;
                break;
            default:
                console.log("❌ Operacao cancelada.");
                break;
        }
    }
}
main();
