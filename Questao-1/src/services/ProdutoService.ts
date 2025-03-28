import { Produto } from "../models/Produto";
import { CategoriaService } from "./CategoriaService";

export class ProdutoService {
  private produtos: Produto[] = [];
  private idCounter = 1;

  constructor(private categoriaService: CategoriaService) {}

  criar(
    nome: string,
    preco: number,
    quantidade: number,
    categoriaId: number,
    descricao?: string
  ): Produto | null {
    const categoria = this.categoriaService.buscarPorIdOuNome(categoriaId);
    if (!categoria) {
      console.log("⚠️ Categoria não encontrada.");
      return null;
    }

    const agora = new Date();

    const produto: Produto = {
      id: this.idCounter++,
      nome,
      preco,
      quantidade,
      categoriaId,
      descricao,
      dataCriacao: agora,
      dataAtualizacao: agora
    };

    this.produtos.push(produto);
    console.log("✅ Produto criado com sucesso.");
    return produto;
  }

  listar(): Produto[] {
    return this.produtos;
  }

  buscarPorId(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  atualizar(id: number, dados: Partial<Produto>): boolean {
    const produto = this.buscarPorId(id);
    if (!produto) return false;

    Object.assign(produto, dados);
    produto.dataAtualizacao = new Date();
    console.log("✅ Produto atualizado.");
    return true;
  }

  remover(id: number): boolean {
    const index = this.produtos.findIndex(p => p.id === id);
    if (index >= 0) {
      this.produtos.splice(index, 1);
      console.log("✅ Produto removido.");
      return true;
    }
    return false;
  }

  buscarPorCategoria(categoriaId: number): Produto[] {
    return this.produtos.filter(p => p.categoriaId === categoriaId);
  }

  buscarPorNome(nome: string): Produto[] {
    return this.produtos.filter(p =>
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
}