import readlineSync from 'readline-sync';

export function promptTexto(mensagem: string): string {
  return readlineSync.question(mensagem);
}

export function promptNumero(mensagem: string): number {
  return parseFloat(readlineSync.question(mensagem));
}

export function mostrarMenu(opcoes: string[]): number {
  return readlineSync.keyInSelect(opcoes, 'Escolha uma opção:');
}
