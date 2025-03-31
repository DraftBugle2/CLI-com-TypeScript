import { Categoria } from "../models/Categoria";

export class CategoriaService {
  private categorias: Categoria[] = [];
  private idCounter = 1;

  criar(nome: string, descricao?: string): Categoria {
    const novaCategoria: Categoria = {
      id: this.idCounter++,
      nome,
      descricao,
      dataCriacao: new Date()
    };
    this.categorias.push(novaCategoria);
    return novaCategoria;
  }

  listar(): Categoria[] {
    return this.categorias;
  }

  buscarPorIdOuNome(termo: number | string): Categoria | undefined {
    if (typeof termo === "number") {
      return this.categorias.find(cat => cat.id === termo);
    }
    return this.categorias.find(cat => cat.nome.toLowerCase() === termo.toLowerCase());
  }

  atualizar(id: number, dados: Partial<Categoria>): boolean {
    const categoria = this.buscarPorIdOuNome(id);
    if (!categoria) return false;
    Object.assign(categoria, dados);
    return true;
  }

  remover(id: number, produtosAssociados: boolean): boolean {
    if (produtosAssociados) {
      console.log("❌ Não é possível remover uma categoria com produtos associados.");
      return false;
    }
    const index = this.categorias.findIndex(cat => cat.id === id);
    if (index >= 0) {
      this.categorias.splice(index, 1);
      return true;
    }
    return false;
  }
}