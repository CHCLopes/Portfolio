# Portfólio de Carlos Lopes

Aplicação em React, TypeScript e Vite. Apresenta a relação entre experiência operacional, desenvolvimento front-end e decisões de interface.

## Executar e verificar

```powershell
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

`npm ci` é necessário somente quando as dependências ainda não estão instaladas. Dependências e lockfile foram preservados. A compilação produz `dist/`, que deve ser servida por HTTP.

## Conteúdo e estrutura

A sequência da página é Hero → Sobre mim breve → projetos (JBL Desk em destaque) → trajetória profissional → publicações → contato. A apresentação inicial conecta gestão, processos, educação corporativa e desenvolvimento; cargos, períodos e formação ficam na trajetória. Os textos se baseiam no resumo e nas experiências do PDF de LinkedIn fornecido pelo usuário. Os sete projetos abrem em carrossel horizontal, com os detalhes nos modais, incluindo os três capítulos do JBL Desk. Após a comparação, o usuário aprovou o carrossel como apresentação única.

- `src/data/portfolio.ts`: identidade, contatos, projetos públicos e publicações.
- `src/sections/ProjectShowcase.tsx`: cards em carrossel, controles laterais e abertura dos modais.
- `src/components/ProjectCover.tsx`: capas editoriais dos projetos de estudo e governança.
- `src/components/ProjectModal.tsx`: modal nativo que reutiliza os componentes dos projetos, bloqueia a rolagem de fundo e restaura o foco ao fechar.
- `src/components/ProjectGallery.tsx` e `src/data/projectGallery.ts`: galerias verticais, imagens e metadados dos cards.
- `src/project-showcase.css`: estilos específicos de cards, modal, galeria e flutuação no hover.
- `src/sections/FeaturedProject.tsx`: narrativa documentada do JBL Desk.
- `src/sections/About.tsx`: apresentação breve e retrato, logo depois do Hero.
- `src/sections/Trajectory.tsx`: experiências selecionadas, formação, currículo e LinkedIn, depois dos projetos.
- `src/sections/Approach.tsx`: seção de publicações; o nome interno do arquivo foi preservado.
- `src/components/ThemeToggle.tsx`: modo claro por padrão, escolha explícita de tema, persistência local e sincronização entre abas. A inicialização em `index.html` aplica a mesma regra antes de carregar o React.
- `src/index.css`: tokens, composição, responsividade e movimento.
- `tailwind.config.js`: aliases das mesmas variáveis semânticas.
- `public/projects/`: capturas das aplicações.
- `public/projects/gallery/sources.json`: origem e hashes das doze capturas obtidas nos repositórios públicos.
- `public/profile.jpg`: retrato fornecido, sem manipulação.
- `public/carlos-lopes-trajetoria.pdf`: PDF de LinkedIn fornecido, sem alterações.
- `public/fonts/`: Manrope e DM Sans locais, com licenças OFL.

## Integridade dos casos

No JBL Desk, Carlos cuidou do front-end e do storytelling da interface, em colaboração com Product Owner e back-end. Gemini apoiou a construção por agentes de IA. A base foi criada com dados fictícios para trabalhar a interface. A legenda e o texto alternativo da captura deixam isso explícito. Números da tela não são resultados comerciais medidos.

Os outros projetos são Endereçador, Michely Massoterapia, Sk8-Genius, Bikcraft, Desenvolvimento assistido por IA e MyAntigravityHarness. Seus detalhes apresentam contexto, papel, decisões, evidência e uma próxima validação possível. Bikcraft atribui o layout de referência à Origamid; os projetos de estudo e governança usam capas editoriais identificadas como tais e links para os repositórios. Não há métricas de resultado inventadas.

As quatro aplicações web possuem três capturas cada no carrossel vertical dos modais. O JBL Desk conserva a única captura disponível. Backups e capturas de revisão ficam em `outputs/` no ambiente local e são excluídos do Git. Nenhuma dependência foi adicionada durante os refinamentos.

## Temas e interação

O primeiro acesso usa o modo claro. Uma escolha explícita no controle de tema passa a prevalecer e é salva em `carlos-portfolio-theme`. Se o armazenamento estiver indisponível, o controle continua funcionando naquela sessão. O script no cabeçalho aplica a preferência antes da renderização. As mudanças de seção usam degradês curtos de 32 px (20 px no rodapé), seguindo os tokens de cada tema.

O contato oferece `mailto:`, LinkedIn, GitHub e cópia de e-mail com retorno acessível. O menu móvel fecha por Escape e devolve o foco ao botão. `prefers-reduced-motion` remove as animações e a rolagem suave.

## Publicação

Este projeto continua o histórico de [CHCLopes/Portfolio](https://github.com/CHCLopes/Portfolio), originalmente um portfólio em HTML/CSS baseado na formação da Alura. A versão anterior permanece acessível nos commits anteriores à reformulação. O README original registra a publicação em [portfoliocarloslopes.netlify.app](https://portfoliocarloslopes.netlify.app/).

`netlify.toml` configura Node.js 22, build `npm run build` e publicação de `dist/`. Os endereços antigos `/about.html`, `/working.html` e `/contact.html` redirecionam permanentemente para as seções correspondentes. O site não usa roteamento por caminhos: a navegação interna usa âncoras.

A reformulação deve ser revisada em pull request antes de entrar na branch `main`. Para manter o site e domínio existentes, conferir no painel da Netlify se o projeto está conectado a este repositório e se a branch de produção é `main`. O endereço citado no README original não comprova essa configuração; a conexão e a prévia de deploy precisam ser verificadas antes do merge. Não é necessário criar outro site.
