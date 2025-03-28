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
    const opcoes = [
      "Criar categoria",
      "Listar categorias",
      "Criar produto",
      "Listar produtos",
      "Sair"
    ];
    const escolha = readlineSync.keyInSelect(opcoes, "Escolha uma opção:");
    console.clear();

    switch (escolha) {
      case 0:
        const nomeCat = readlineSync.question("Nome da categoria: ");
        const descCat = readlineSync.question("Descrição (opcional): ");
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
        const nomeProd = readlineSync.question("Nome do produto: ");
        const descProd = readlineSync.question("Descrição: ");
        const preco = parseFloat(readlineSync.question("Preço: "));
        const qtd = parseInt(readlineSync.question("Quantidade: "));
        const catId = parseInt(readlineSync.question("ID da categoria: "));
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