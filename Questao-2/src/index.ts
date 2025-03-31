console.log("🚀 Aplicação iniciada!");
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import readlineSync from "readline-sync";
import { Categoria } from "./entity/Categoria.js";
import { Produto } from "./entity/Produto.js";

async function main() {
  await AppDataSource.initialize();
  const categoriaRepo = AppDataSource.getRepository(Categoria);
  const produtoRepo = AppDataSource.getRepository(Produto);

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
    const escolha = readlineSync.keyInSelect(opcoes, "Escolha uma opcao:", { cancel: "CANCEL" });
    console.clear();

    switch (escolha) {
      case 0:
        const nomeCat = readlineSync.question("Nome da categoria: ");
        const descCat = readlineSync.question("Descricao (opcional): ");
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
        const nomeProd = readlineSync.question("Nome do produto: ");
        const descProd = readlineSync.question("Descricao: ");
        const preco = parseFloat(readlineSync.question("Preco: "));
        const qtd = parseInt(readlineSync.question("Quantidade: "));
        const catId = parseInt(readlineSync.question("ID da categoria: "));
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
        const buscaNome = readlineSync.question("Digite o nome do produto para buscar: ");
        const encontrados = await produtoRepo.findBy({ nome: buscaNome });
        if (encontrados.length > 0) {
          console.table(encontrados);
        } else {
          console.log("🔍 Nenhum produto encontrado com esse nome.");
        }
        break;

      case 5:
        const nomeRemover = readlineSync.question("Digite o nome do produto a ser removido: ");
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
