"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaService = void 0;
class CategoriaService {
    constructor() {
        this.categorias = [];
        this.idCounter = 1;
    }
    criar(nome, descricao) {
        const novaCategoria = {
            id: this.idCounter++,
            nome,
            descricao,
            dataCriacao: new Date()
        };
        this.categorias.push(novaCategoria);
        return novaCategoria;
    }
    listar() {
        return this.categorias;
    }
    buscarPorIdOuNome(termo) {
        if (typeof termo === "number") {
            return this.categorias.find(cat => cat.id === termo);
        }
        return this.categorias.find(cat => cat.nome.toLowerCase() === termo.toLowerCase());
    }
    atualizar(id, dados) {
        const categoria = this.buscarPorIdOuNome(id);
        if (!categoria)
            return false;
        Object.assign(categoria, dados);
        return true;
    }
    remover(id, produtosAssociados) {
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
exports.CategoriaService = CategoriaService;
