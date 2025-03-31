# 📝 Projeto 1: CLI com TypeScript (Persistência em Memória)

## 📌 Descrição do Projeto
Este projeto é uma aplicação de linha de comando (CLI) feita com **TypeScript**, com o objetivo de gerenciar um pequeno inventário de produtos e categorias. A persistência é feita **em memória**, ou seja, os dados são perdidos ao encerrar a aplicação.

## 🚀 Tecnologias Utilizadas
- TypeScript
- Node.js
- readline-sync

## 📦 Instalação dos Pacotes
Rode o seguinte comando para instalar as dependências do projeto:

```bash
npm install typescript ts-node-dev --save-dev
npm install reflect-metadata typeorm sqlite3 readline-sync
npm install reflect-metadata typeorm readline-sync
npm install @types/readline-sync --save-dev
```
### Função dos pacotes:
- `typescript`: Transpila o código TypeScript para JavaScript.
- `ts-node-dev`: Executa e reinicia a aplicação ao detectar alterações no código.
- `reflect-metadata`: Necessário para o funcionamento do TypeORM com decorators.
- `typeorm`: ORM utilizado para manipular o banco de dados.
- `sqlite3`: Banco de dados leve utilizado localmente.
- `readline-sync`: Permite interação com o usuário via terminal.
- `@types/readline-sync`: Tipagem do `readline-sync` para TypeScript.

## 📁 Estrutura de Arquivos (Exemplo)
```
Questao-1/
├── src
│   ├── entity
│   │   ├── Categoria.ts
│   │   └── Produto.ts
│   ├── data-source.ts
│   └── index.ts
├── tsconfig.json
├── package.json
├── ormconfig.json (opcional dependendo da versão do TypeORM)
└── dist (gerado após build)
└── Notas.md
```

## ⚙️ Configuração do TypeScript
O `tsconfig.json` deve conter ao menos:
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

## ▶️ Como Executar o Projeto

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar em modo desenvolvimento (recomendado enquanto estiver codando)
```bash
npm run dev
```

### 3. Gerar versão compilada para produção
```bash
npm run build
```

### 4. Executar versão compilada
```bash
npm run start
```

## 🚀 Funcionalidades
- Criar Categoria
- Listar Categorias
- Criar Produto com Categoria existente
- Listar Produtos
- Sair do programa

## 📌 Observações
- Todos os dados são armazenados em arrays na memória.
- Ao sair do programa, os dados são perdidos.
- Ideal para aprendizado de conceitos básicos de TypeScript, Orientação a Objetos e entrada de dados via terminal.
-Banco de dados SQLite é gerado localmente como `database.sqlite` (caso não exista, o TypeORM cria automaticamente).
- As entidades estão mapeadas com base nos decorators do TypeORM.
- O CLI usa `readline-sync` para exibir menus e ler entradas do usuário.

---

Se precisar resetar o banco, basta deletar o arquivo `database.sqlite`.

Caso queira migrar para outro banco como PostgreSQL ou MySQL, basta ajustar a configuração do `AppDataSource` em `data-source.ts`.
---