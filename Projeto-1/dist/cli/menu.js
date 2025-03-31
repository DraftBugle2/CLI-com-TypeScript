"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promptUtils_1 = require("./promptUtils");
const CategoriaService_1 = require("../services/CategoriaService");
const ProdutoService_1 = require("../services/ProdutoService");
const categoriaService = new CategoriaService_1.CategoriaService();
const produtoService = new ProdutoService_1.ProdutoService(categoriaService);
function exibirMenuPrincipal() {
    const opcoes = [
        "Criar Categoria",
        "Listar Categorias",
        "Criar Produto",
        "Listar Produtos",
        "Buscar Produto por Nome",
        "Remover Produto",
        "Sair"
    ];
    let sair = false;
    while (!sair) {
        console.log("\n==== MENU PRINCIPAL ====");
        const escolha = (0, promptUtils_1.mostrarMenu)(opcoes);
        console.clear();
        switch (escolha) {
            case 0:
                const nomeCat = (0, promptUtils_1.promptTexto)("Nome da categoria: ");
                const descricaoCat = (0, promptUtils_1.promptTexto)("Descricao (opcional): ");
                categoriaService.criar(nomeCat, descricaoCat);
                break;
            case 1:
                console.log("\n Categorias cadastradas:");
                console.table(categoriaService.listar());
                break;
            case 2:
                const nomeProd = (0, promptUtils_1.promptTexto)("Nome do produto: ");
                const descProd = (0, promptUtils_1.promptTexto)("Descricao do produto: ");
                const precoProd = (0, promptUtils_1.promptNumero)("Preco: ");
                const qtdProd = (0, promptUtils_1.promptNumero)("Quantidade: ");
                const catId = (0, promptUtils_1.promptNumero)("ID da categoria: ");
                produtoService.criar(nomeProd, precoProd, qtdProd, catId, descProd);
                break;
            case 3:
                console.log("\n Produtos cadastrados:");
                console.table(produtoService.listar());
                break;
            case 4:
                const termo = (0, promptUtils_1.promptTexto)("Nome do produto para buscar: ");
                const resultados = produtoService.buscarPorNome(termo);
                console.table(resultados);
                break;
            case 5:
                const idRemover = (0, promptUtils_1.promptNumero)("ID do produto para remover: ");
                produtoService.remover(idRemover);
                break;
            default:
                sair = true;
                console.log("Encerrando sistema...");
                break;
        }
    }
}
exibirMenuPrincipal();
