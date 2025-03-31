/*
# Questao 2 - Gerenciamento de Inventário com TypeORM

## 📦 Tecnologias Utilizadas
- TypeScript
- Node.js
- TypeORM
- SQLite
- readline-sync

## 🚀 Instalação de Pacotes

Este projeto utiliza o TypeScript com TypeORM e sqlite para persistência de dados. Abaixo estão listados os pacotes utilizados:

### Dependências de Produção:
```bash
npm install typeorm reflect-metadata sqlite3 readline-sync
```

### Dependências de Desenvolvimento:
```bash
npm install -D typescript ts-node @types/node @types/readline-sync
```


## ⚙️ Configuração do TypeScript

O arquivo `tsconfig.json` está configurado com:
- `target`: ES2020
- `module`: ESNext
- `outDir`: `dist`
- `esModuleInterop`: true
- `moduleResolution`: node
- `strict`: true

Essas configurações garantem compatibilidade com os módulos ES e boa tipagem.


## ▶️ Como executar o projeto

1. Compile o projeto:
```bash
npx tsc
```

2. Execute o arquivo compilado:
```bash
node dist/index.js
```

Se tudo estiver correto, você verá a mensagem:
```bash
🚀 Aplicação iniciada!
```
e em seguida o menu interativo:
```
[0] Criar categoria
[1] Listar categorias
[2] Criar produto
[3] Listar produtos
[4] Cancel
Escolha uma opção:
```


## 🗃️ Banco de dados
- O banco é criado automaticamente na primeira execução com base nas entidades `Categoria` e `Produto`.
- O arquivo será `banco.sqlite` na raiz do projeto.


## ✅ Recursos disponíveis
- Cadastro e listagem de categorias.
- Cadastro e listagem de produtos, com vínculo à categoria.


## 🛠️ Outras observações
- Certifique-se de sempre compilar com `npx tsc` antes de executar.
- Em caso de erro "Cannot find module 'readline-sync'", verifique se ele está instalado corretamente.
- Para limpar a tela do terminal após cada operação, utilizamos `console.clear()`.


---
