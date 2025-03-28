import { promptTexto, promptNumero, mostrarMenu } from "./promptUtils";
import { CategoriaService } from "../services/CategoriaService";
import { ProdutoService } from "../services/ProdutoService";

const categoriaService = new CategoriaService();
const produtoService = new ProdutoService(categoriaService);

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
    const escolha = mostrarMenu(opcoes);
    console.clear();

    switch (escolha) {
      case 0:
        const nomeCat = promptTexto("Nome da categoria: ");
        const descricaoCat = promptTexto("Descricao (opcional): ");
        categoriaService.criar(nomeCat, descricaoCat);
        break;

      case 1:
        console.log("\n Categorias cadastradas:");
        console.table(categoriaService.listar());
        break;

      case 2:
        const nomeProd = promptTexto("Nome do produto: ");
        const descProd = promptTexto("Descricao do produto: ");
        const precoProd = promptNumero("Preco: ");
        const qtdProd = promptNumero("Quantidade: ");
        const catId = promptNumero("ID da categoria: ");

        produtoService.criar(nomeProd, precoProd, qtdProd, catId, descProd);
        break;

      case 3:
        console.log("\n Produtos cadastrados:");
        console.table(produtoService.listar());
        break;

      case 4:
        const termo = promptTexto("Nome do produto para buscar: ");
        const resultados = produtoService.buscarPorNome(termo);
        console.table(resultados);
        break;

      case 5:
        const idRemover = promptNumero("ID do produto para remover: ");
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