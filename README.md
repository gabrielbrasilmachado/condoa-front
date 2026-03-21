# Condoa Front

Estrutura inicial do front-end do projeto Condoa, baseada em `React + Vite + TypeScript`, com arquitetura modular alinhada aos dominios do backend.

## Stack

- React
- Vite
- TypeScript
- Chakra UI
- React Hook Form
- Zod
- TanStack Query
- Context API
- Axios
- React Router
- Yarn

## Arquitetura

O projeto foi organizado para espelhar os dominios do backend:

- `auth`
- `dashboard`
- `items`
- `categories`
- `users`
- `condominiums`
- `addresses`

Cada modulo deve concentrar seus proprios artefatos:

- `pages`: telas roteáveis
- `components`: componentes específicos do módulo
- `services`: integracao com a API
- `hooks`: hooks de consulta e regra de negocio
- `schemas`: validacoes com Zod
- `types`: contratos locais
- `contexts`: estado global do módulo quando fizer sentido

Itens compartilhados ficam em `src/shared`:

- `components`
- `config`
- `layout`
- `lib`
- `styles`
- `theme`
- `types`

Itens de composicao da aplicacao ficam em `src/app`:

- `providers`
- `router`

## Fluxo de autenticacao

- O login usa `React Hook Form + Zod`.
- O token JWT fica em `localStorage`.
- O `AuthContext` mantem o usuario autenticado no front.
- O cliente `axios` injeta o token automaticamente.
- O `RequireAuth` protege as rotas privadas.

## Gerenciador de pacotes

- O projeto usa `yarn`.
- O `nodeLinker` configurado e `node-modules`.
- Para instalar dependencias: `yarn`
- Para rodar em desenvolvimento: `yarn dev`
- Para gerar build: `yarn build`
- Para lint: `yarn lint`

## Rotas iniciais

- `/login`
- `/`
- `/items`
- `/categories`
- `/users`
- `/condominiums`
- `/addresses`

## Como expandir os modulos

Exemplo recomendado para um módulo:

```txt
src/modules/items/
  components/
  hooks/
  pages/
  schemas/
  services/
  types/
```

## Proximos passos sugeridos

1. Instalar as dependencias com `yarn`.
2. Criar o layout definitivo do painel.
3. Implementar o modulo `auth` completo com persistencia e feedback de sessao.
4. Construir o CRUD de `categories`, `users`, `condominiums` e `addresses`.
5. Evoluir `items` com filtros, cadastro, edicao e upload de imagens.
