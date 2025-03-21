# Portfolio Website | Rodrigo Nicolau Almeida

## Correr o site localmente

Para observar mudanças em tempo real editadas no site, não é possível apenas abrir um ficheiro .html como anteriormente. Existe vários conteúdos gerados programaticamentes e o site depende do pacote Node.js.

Por isso, instala [Node.js](https://nodejs.org/en). Depois, abre a pasta do projeto na raíz `/rodrigonalmeida.github.io` e corre
`npm i` e depois `npm run dev`.

Isto abrirá um url local onde se pode observar as edições.

## Como mudar os conteúdos do site?

## Editar cabeçalho na página Home

Os conteúdos que são gerados para o cabeçalho estão em `/src/settings.ts`. As descrições e títulos no cabeçalho estão na constante `profile` e os urls dos ícones das redes sociais estão em `social`.

### Adicionar publicações

Todas as publicações, artigos aceites e submetidos, e itens na lista de teses supervisionadas ou de seminares, estão no documento:
`/src/data/cv.ts`

Basta adicionar as informações relevantes aos arrays publications, accepted_articles, submtited_artciles, thesis_supervision, teaching e notes e estes serão atualizados automaticamente nas páginas correspondentes.

As publicações aparecem na página Home e Research, os restantes artigos e seminares em Research, as cadeiras e teses em Teaching.

## Adicionar notícias

As notícias estão guardadas no array em:
`/src/data/news.ts`

Basta adicionar a informação seguindo a estrutura do json indicada no documento e as páginas relevantes (Home e News) serão atualizadas automaticamente.

Na página Home só aparecem as 3 notícias mais recentes. O algoritmo não é ordenado e assume que a notícia mais recente é adicionada ao *fim* do json em news.ts.

## Adicionar projetos

Para adicionar projetos, basta adicionar um ficheiro markdown em:
`/src/content/BlogPosts.ts`

O ficheiro pode ser escrito da mesma forma que eram posteriormente, mas sem a necessidade de os converter em html. 

No entanto, é necessário adicionar um cabeçalho para serem adicionados à lista em Projects e serem visualizados corretamente. O cabeçalho tem de estar no início do ficheiro, sem quaisquer linhas vazias antes, e seguir esta estrutura:

Exemplo:
---
title: "Exemple class"
date: "2025-03-21"
tags: ["Supervised Project"] 
excerpt: "Descrição do projeto"
---

Para editar os projetos atualmente no site, basta abrir cada ficheiro em `/src/content/BlogPosts.ts` e editar o cabeçalho.

## Editar outros conteúdos embutidos nas páginas

Os outros restantes conteúdos estão em cada correspondente página e estas encontram-se em `/src/pages/`.

Conteúdos da Home -> index.astro

Conteúdos de Research -> research.astro

Conteúdos de Hobbies -> hobbies.astro

Conteúdos de Teaching -> teaching.astro

Conteúdos de Projects -> blog/[page].astro

Conteúdos  de News -> news.astro


## Como dar deploy das mudanças

Basta dar commit das mudanças para o main.

