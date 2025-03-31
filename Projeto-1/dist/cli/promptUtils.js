"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptTexto = promptTexto;
exports.promptNumero = promptNumero;
exports.mostrarMenu = mostrarMenu;
const readline_sync_1 = __importDefault(require("readline-sync"));
function promptTexto(mensagem) {
    return readline_sync_1.default.question(mensagem);
}
function promptNumero(mensagem) {
    return parseFloat(readline_sync_1.default.question(mensagem));
}
function mostrarMenu(opcoes) {
    return readline_sync_1.default.keyInSelect(opcoes, 'Escolha uma opcao:');
}
