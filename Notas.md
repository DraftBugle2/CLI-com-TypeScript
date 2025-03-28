# 📘 Notas do Projeto 3 - Estudos e Exemplos com TypeScript e TypeORM

## 🔢 TypeScript com Tipagem Adequada

```ts
// Tipos primitivos
let idade: number = 25;
let nome: string = "João";
let ativo: boolean = true;
let vazio: null = null;
let indefinido: undefined = undefined;

// Tipo void
function logMensagem(msg: string): void {
  console.log(msg);
}

// Tipo any (evitar quando possível)
let valor: any = "Texto ou número";
```

## 📂 Modularização e Boas Práticas com OO

```ts
// Arquivo: src/models/Produto.ts
export class Produto {
  constructor(
    public id: number,
    public nome: string,
    public preco: number,
    public categoria?: string
  ) {}
}

// Arquivo: src/services/ProdutoService.ts
import { Produto } from "../models/Produto";

export class ProdutoService {
  private produtos: Produto[] = [];

  adicionar(produto: Produto): void {
    this.produtos.push(produto);
  }

  listar(): Produto[] {
    return this.produtos;
  }
}
```

## 🔑 Persistência em Memória

```ts
const listaProdutos: Produto[] = [];
listaProdutos.push(new Produto(1, "Notebook", 3000));
```

## ✍️ Tipos Condicionais, Union e Intersection Types

```ts
// Union type
function mostrarId(id: number | string) {
  console.log("ID:", id);
}

// Intersection type
type Pessoa = { nome: string } & { idade: number };

const joao: Pessoa = { nome: "João", idade: 30 };
```

## 🤷‍♂️ Interfaces e Tipos Personalizados

```ts
interface Usuario {
  id: number;
  nome: string;
  email?: string; // propriedade opcional
}

type ProdutoType = {
  id: number;
  nome: string;
  preco: number;
};
```

## 🎓 Funções em TypeScript

```ts
function soma(a: number, b: number): number {
  return a + b;
}

function saudacao(nome: string = "visitante"): string {
  return `Bem-vindo, ${nome}`;
}
```

## 💼 Classes, Herança e Modificadores

```ts
class Pessoa {
  constructor(public nome: string, protected idade: number) {}

  apresentar(): string {
    return `Nome: ${this.nome}, Idade: ${this.idade}`;
  }
}

class Funcionario extends Pessoa {
  constructor(nome: string, idade: number, private cargo: string) {
    super(nome, idade);
  }

  apresentar(): string {
    return `${super.apresentar()}, Cargo: ${this.cargo}`;
  }
}
```

## ✨ Generics

```ts
function primeiroElemento<T>(lista: T[]): T {
  return lista[0];
}

const numeros = primeiroElemento<number>([1, 2, 3]);
const palavras = primeiroElemento<string>(["a", "b", "c"]);
```

## ℹ️ Enums e Mapeamento

```ts
enum Status {
  Ativo = "ATIVO",
  Inativo = "INATIVO",
}

const usuarioStatus: Status = Status.Ativo;
```

## 📊 Configuração do `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

> Comentários:
- `strict: true` ativa verificadores de tipo mais rigorosos.
- `emitDecoratorMetadata` e `experimentalDecorators` são necessários para usar TypeORM com decorators.

## ⛏️ TypeORM

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao?: string;
}
```

