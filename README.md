# CLI com TypeScript

Este projeto foi desenvolvido com o objetivo de servir como base para **exemplos descontextualizados, anotações, estudos e observações** relacionados ao uso do TypeScript com foco em boas práticas de organização, orientação a objetos e persistência em memória.

---

## ✨ Objetivos Técnicos

### ✅ TypeScript com Tipagem Adequada
- Tipos primitivos: `number`, `string`, `boolean`, `null`, `undefined`, `void`, `any`
- Tipos avançados: `union types`, `intersection types`, tipos condicionais
- Definição de `type` vs `interface`, com propriedades opcionais
- Contratos de objetos por meio de interfaces personalizadas

### ✅ Funções em TypeScript
- Declaração de funções com parâmetros tipados
- Definição explícita de tipos de retorno
- Utilização de parâmetros opcionais e valores padrão

### ✅ Classes, Herança e Modificadores de Acesso
- Utilização de `class` com herança e composição
- Modificadores de acesso: `public`, `private`, `protected`

### ✅ Generics
- Aplicados em funções e classes reutilizáveis para maior flexibilidade com tipagem segura

### ✅ Enums e Mapeamento de Valores
- Uso de `enums` nomeados e conversão/mapeamento de valores descritivos

---

## ⚙️ tsconfig.json

O arquivo de configuração do TypeScript foi customizado com comentários explicativos:

```jsonc
{
  "compilerOptions": {
    "target": "ES6",             // Compila para código compatível com ES6
    "module": "commonjs",        // Usa sistema de módulos CommonJS
    "strict": true,              // Ativa verificações estritas de tipo
    "esModuleInterop": true,     // Suporte a importações padrão
    "experimentalDecorators": true, // Necessário para uso com TypeORM no futuro
    "outDir": "./dist"           // Pasta de saída para os arquivos compilados
  }
}
```

---

## 📁 Estrutura de Pastas

```
📁 src/
├── models/           // Classes e interfaces de dados
├── services/         // Lógica de negócio
├── repositories/     // Persistência em memória
├── cli/              // Comandos e entrada via linha de comando
├── utils/            // Utilitários auxiliares
├── enums/            // Definições de enums utilizados
├── entities/         // (Opcional) entidades para o exemplo com TypeORM
├── data-source.ts    // Configuração da fonte de dados do TypeORM
└── main.ts           // Arquivo de entrada principal
```

---

## 🛠️ Ferramentas e Dependências

- **TypeScript**
- **Node.js** (executar com `ts-node`)
- **Pronto para integração com TypeORM**, com suporte a SQLite

---

## 🚀 Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Compile e execute com:
   ```bash
   npx ts-node src/main.ts
   ```

3. Para rodar o exemplo com TypeORM:
   ```bash
   npm install typeorm reflect-metadata sqlite3
   npx ts-node src/main.ts
   ```

---

## 📚 Ideal Para Estudo

Este projeto é indicado para quem deseja estudar e aplicar:
- Fundamentos de TypeScript
- Design orientado a objetos
- Tipagem segura e avançada
- Organização modular de projetos
- Persistência temporária de dados em memória
- Introdução ao uso do TypeORM com SQLite

---

## 🧪 Exemplo funcional de TypeORM

Este projeto inclui um exemplo funcional de uso do **TypeORM** com entidades e repositórios. Embora a persistência principal seja em memória, este trecho simula como o TypeORM seria utilizado em um cenário real com banco de dados.

### 📦 Instalação do TypeORM e dependências

```bash
npm install typeorm reflect-metadata sqlite3
```

### 🧱 Estrutura da entidade

```ts
// src/entities/Product.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('decimal')
  price!: number;

  @Column({ nullable: true })
  description?: string;
}
```

### ⚙️ Configuração da conexão com SQLite

```ts
// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entities/Product';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Product],
});
```

### 🚀 Inicialização e uso básico

```ts
// src/main.ts
import { AppDataSource } from './data-source';
import { Product } from './entities/Product';

AppDataSource.initialize().then(async () => {
  const repo = AppDataSource.getRepository(Product);

  const product = repo.create({
    name: 'Camiseta',
    price: 49.9,
    description: 'Produto de exemplo',
  });

  await repo.save(product);

  const produtos = await repo.find();
  console.log('Produtos salvos:', produtos);
});
```

> 💡 **Observação:** Esse exemplo utiliza SQLite para facilitar testes locais sem depender de configuração externa de banco de dados.