"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoService = void 0;
class ProdutoService {
    constructor(categoriaService) {
        this.categoriaService = categoriaService;
        this.produtos = [];
        this.idCounter = 1;
    }
    criar(nome, preco, quantidade, categoriaId, descricao) {
        const categoria = this.categoriaService.buscarPorIdOuNome(categoriaId);
        if (!categoria) {
            console.log("⚠️ Categoria não encontrada.");
            return null;
        }
        const agora = new Date();
        const produto = {
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
    listar() {
        return this.produtos;
    }
    buscarPorId(id) {
        return this.produtos.find(p => p.id === id);
    }
    atualizar(id, dados) {
        const produto = this.buscarPorId(id);
        if (!produto)
            return false;
        Object.assign(produto, dados);
        produto.dataAtualizacao = new Date();
        console.log("✅ Produto atualizado.");
        return true;
    }
    remover(id) {
        const index = this.produtos.findIndex(p => p.id === id);
        if (index >= 0) {
            this.produtos.splice(index, 1);
            console.log("✅ Produto removido.");
            return true;
        }
        return false;
    }
    buscarPorCategoria(categoriaId) {
        return this.produtos.filter(p => p.categoriaId === categoriaId);
    }
    buscarPorNome(nome) {
        return this.produtos.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));
    }
}
exports.ProdutoService = ProdutoService;
