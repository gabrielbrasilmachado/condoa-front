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
- O `accessToken` fica em memoria.
- O `refreshToken` fica em cookie HttpOnly.
- O `AuthContext` tenta `refresh` ao recarregar a aplicacao.
- O cliente `axios` injeta o token automaticamente e tenta repetir requests apos `refresh`.
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

## Regras de responsividade

- No desktop, a navegacao principal usa sidebar fixa.
- No mobile, a navegacao principal usa drawer.
- A tela de login permanece em coluna unica em qualquer breakpoint.
- Formularios complexos devem ser divididos em blocos de secao quando fizer sentido.
- Formularios podem usar duas colunas no desktop e devem usar uma coluna no mobile.
- Listagens em grid de cards devem usar 1 coluna no mobile e ate 3 colunas no desktop.

## Componentes compartilhados para layout

- `FormSection`: bloco visual para secoes de formulario.
- `ResponsiveFormGrid`: grid responsivo de formulario com 1 coluna no mobile e 2 no desktop.
- `ResponsiveCardGrid`: grid responsivo de cards com 1 a 3 colunas.

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
