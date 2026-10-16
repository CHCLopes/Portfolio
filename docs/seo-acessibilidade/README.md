# SEO e acessibilidade - 16/10/2026

## Estado da entrega

Implementação local sobre a base Git e822949. Sem commit, push ou publicação desta rodada. A identidade visual e a arquitetura React/Vite foram preservadas.

## SEO implementado

- Título, descrição e autoria coerentes com Desenvolvimento & Gestão.
- Uma URL canônica de produção; Open Graph e Twitter Card com imagem própria de 1200 x 630.
- JSON-LD estático de WebSite, ProfilePage e Person, com referências consistentes e os perfis públicos fornecidos.
- robots.txt e sitemap.xml com uma única URL indexável; âncoras das seções não são apresentadas como páginas distintas.
- Página 404 noindex e regra Netlify após os três redirecionamentos 301 existentes.
- Cache imutável apenas para os arquivos com hash gerados pelo Vite.
- Preload responsivo do Hero; imagens WebP do Hero e dos cards; Manrope ExtraLight em WOFF2 sem alteração dos glifos. Fontes e imagens originais preservadas.

## Acessibilidade implementada

- Nome acessível da marca e do botão de tema compatível com o texto visível.
- Foco no título após usar o menu móvel; Escape fecha o menu e devolve foco ao acionador.
- Setas, Home e End no carrossel horizontal e estado anunciado por leitor de tela.
- Galeria com apenas o slide ativo exposto à árvore de acessibilidade e sem papel ARIA inválido em figure.
- Tab/Shift+Tab contidos nos modais; Escape, foco inicial e retorno ao acionador conferidos nos oito projetos.
- Controle para pausar/retomar os cometas na mesma posição; preferência por movimento reduzido respeitada.
- Redução das atualizações da animação para 30 fps e reaproveitamento dos estados de visibilidade.
- Sem banner semântico aninhado no modal do rodapé; instruções invisíveis para leitores de tela e aviso de abertura em nova aba.
- Cores forçadas do sistema com foco visível. Reflow de títulos, marca e competências com espaçamento de leitura ampliado.
- Abaixo de 600 px, a introdução dos projetos fica abaixo do título para evitar transbordamento. A justificação solicitada dos parágrafos foi mantida.

## Resultado observado

| Medida | Mobile | Desktop |
| --- | ---: | ---: |
| Desempenho | 92 | 100 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |

Lighthouse 12.8.2. LCP mobile: 2.89 s; desktop: 0.59 s. CLS zero nas duas execuções. Resultados de laboratório no build local; os scores podem variar por máquina e condições da execução.

axe-core 4.14.0: 28 estados, zero violações automáticas; 15 verificações de layout sem transbordamento; nenhum erro de execução. Larguras 320, 375, 412, 768, 1280 e 1920 px nos temas claro e escuro. Há testes de espaçamento de texto, reflow equivalente a 200% por viewport, movimento reduzido e cores forçadas.

Contraste dos tokens originais: menor razão revisada de texto normal 4,86:1 entre verde e painel claro; texto principal/off-white 10,78:1. O modo de cores forçadas usa cores do sistema. Inspeção automática de contraste não substitui a revisão de conteúdo sobre imagens ou uma avaliação completa de WCAG.

## Limites e próximos passos

A renderização principal continua no cliente. Buscadores que não executam JavaScript podem ver apenas os metadados e a alternativa noscript. O conteúdo completo dos modais depende de interação; não foram criadas páginas individuais de case nem adotado SSR/pré-renderização nesta alteração. Uma mudança dessa arquitetura exige decisão própria.

O LCP mobile desta execução ficou acima de 2,5 s; o score de desempenho não é declaração de aprovação de Core Web Vitals em dados reais. Campo, Search Console, indexação e elegibilidade de resultados enriquecidos não foram avaliados. Não há promessa de ranking.

Não foi feita avaliação com NVDA/TalkBack ou no hardware do Moto G84. A entrega não é uma certificação WCAG. Redirecionamentos e cache foram validados como configuração TOML local; a resposta HTTP efetiva deve ser conferida após o deploy.

## Como verificar novamente

```bash
npm run build
npm run lint
npm run check:seo
npm run preview -- --host 127.0.0.1 --port 4173
```

O teste de interface é separado das dependências da aplicação. Instale as ferramentas em uma pasta local de QA, sem alterá-las no package.json de produção:

```bash
npm install --prefix work/qa-tools --no-save --ignore-scripts playwright axe-core lighthouse
npm run check:a11y
```

O script usa Edge instalado e o servidor local na porta 4173. QA_BROWSER, QA_BASE_URL, QA_TOOLS_DIR e PLAYWRIGHT_MODULE permitem ajustar o ambiente. A instalação das ferramentas não instala navegador globalmente. A execução desta entrega usou Playwright do runtime local do Codex.

## Arquivos

- [Resumo estruturado das verificações](validacao.json)
- [Script de SEO](../../scripts/verify-seo.mjs)
- [Script de interface](../../scripts/verify-accessibility.mjs)
- Relatórios brutos locais: outputs/qa-acessibilidade.json e outputs/lighthouse-{mobile,desktop}-final.json (ignorados pelo Git).

## Referências primárias

- [Google Search Central - SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google - SEO em JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [W3C - Pausar, parar ou ocultar](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)
- [W3C - Contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WAI - Padrão de carrossel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)

O build emitiu o aviso pré-existente de atualização da base Browserslist. As dependências da aplicação não foram alteradas nesta rodada.
