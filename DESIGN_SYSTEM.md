# Design system — Precisão

Versão refinada em 08/10/2026. Direção aprovada: editorial, acolhedora e precisa, com aqua, petróleo, off-white e verdes. O impacto vem da escala tipográfica, do espaço e da apresentação do trabalho.

## Cores semânticas

A fonte de verdade está em `src/index.css`; Tailwind referencia as mesmas variáveis. O tema escuro troca papéis completos de cor, mantendo a identidade da paleta.

| Token | Claro | Escuro | Papel |
| --- | --- | --- | --- |
| `--paper` | #F7F8F2 | #0B2226 | Fundo da página |
| `--surface` | #FCFDF8 | #112F33 | Superfície da captura do case |
| `--ink` | #153F43 | #EDF2E9 | Texto principal |
| `--muted` | #496365 | #ADBFBA | Texto secundário |
| `--accent` | #75D5C8 | #86DFCF | Aqua em ações e destaques |
| `--accent-ink` | #153F43 | #0B2226 | Texto sobre aqua |
| `--green` | #386E58 | #9BCAAC | Metadados, foco e destaques |
| `--wash` | #E6EFE8 | #143331 | Fundo de seções e cards comuns no escuro |
| `--panel` | #E1EBE4 | #17393A | Fundo de projeto |
| `--line` | #CDDAD4 | #325254 | Divisores decorativos |
| `--button-bg` | #153F43 | #86DFCF | Botão principal |
| `--button-ink` | #F7F8F2 | #0B2226 | Texto do botão |
| `--contact-bg` | #153F43 | #123337 | Área de contato |
| `--contact-ink` | #F7F8F2 | #EDF2E9 | Título do contato |
| `--contact-muted` | #D6E4DF | #BBCDC5 | Texto secundário do contato |

Aqua funciona como fundo de ação ou destaque em petróleo. Para texto pequeno sobre off-white, usar petróleo ou verde.

Refinamento do tema escuro em 09/10/2026: o verde de `--wash` foi levemente clareado para tornar mais perceptível a passagem das seções Sobre mim e Trajetória para o fundo petróleo da página. Os cards comuns do carrossel usam o mesmo verde. O JBL Desk conserva o fundo `--panel`, a borda verde e o selo em aqua. Os degradês acompanham a alteração pelo token compartilhado; o tema claro conserva suas cores.

## Tipografia

Manrope organiza a identidade e os títulos. DM Sans sustenta corpo e controles. A fonte Manrope ExtraLight é um arquivo de peso 200 real, hospedado localmente; os demais pesos usam as fontes variáveis existentes. Todos usam `font-display: swap`.

A abertura combina uma primeira linha grande, de peso 200, e uma segunda linha de peso 500, deslocada horizontalmente. A escala fluida chega a 143 px em telas amplas e adapta-se aos dispositivos menores. O contato retoma o peso 200 em tamanho grande. Datas, textos pequenos e controles usam pesos normais: a leveza é um recurso de destaque, preservando a leitura do restante.

Refinamento de legibilidade em 09/10/2026: os tamanhos fixos de até 24 px foram aumentados em 2 px; os maiores e os títulos fluidos receberam 1 px. O ajuste cobre navegação, Hero, conteúdo, metadados, cards, modais, galerias, contato e rodapé. As capas editoriais têm altura mínima de 150 px em telas de até 390 px, para acomodar os rótulos maiores. A identificação e a localização do Hero podem quebrar em duas linhas no celular.

Espaçamento entre palavras e letras foi ajustado visualmente no desktop e no celular. Evitar reduzir o espaçamento até unir palavras.

## Composição

Contêiner de até 1200 px; margens de 56 px no desktop, 32 px no tablet, 24 ou 18 px no celular. Seções alternam fundo da página e lavagem verde/petróleo. Divisores finos organizam a leitura. Capturas e retrato mantêm suas cores originais.

O JBL Desk abre o carrossel como destaque corporativo. Seu modal apresenta contexto, componentes e filtros em três capítulos; a captura permanece no painel da direita durante a leitura. No celular, a captura e os capítulos formam uma sequência em uma coluna. Os demais projetos compartilham o carrossel horizontal e a mesma estrutura de modal. Publicações aparecem como linhas editoriais.

## Movimento e estados

- Entrada tipográfica: deslocamento de 14 px, 850 ms, intervalo de 110 ms entre as linhas.
- Hover: deslocamento discreto nos botões e imagens, cor e sublinhado nos links.
- Case: seleção visual de capítulo por IntersectionObserver, com links de navegação acessíveis.
- Conteúdo sempre permanece visível; a rolagem não é interceptada.
- `prefers-reduced-motion` desativa animações, transições e rolagem suave.
- Foco: contorno verde de 3 px, afastado 5 px.
- Menu móvel: nome acessível, estado expandido, Escape e retorno de foco.
- Tema: claro por padrão, inclusive se o sistema usar tema escuro. Uma escolha explícita pelo botão é lembrada localmente e sincronizada entre abas. A inicialização em `index.html` e o componente React aplicam a mesma regra.
- Projetos: `dialog` nativo; decisões e evidências em `details/summary`, aberto inicialmente no modal.
- Cópia de e-mail: retorno de sucesso/falha em `role="status"`.

Navegação colapsa abaixo de 1000 px; conteúdo principal empilha abaixo de 800 px, com ajuste adicional em 390 px.

## Contraste verificado

Na verificação inicial, foram calculados 20 pares semânticos de texto nos dois temas. O menor contraste examinado foi 5,05:1 no claro e 7,40:1 no escuro. O texto principal sobre o fundo da página apresenta 10,78:1 e 14,54:1, respectivamente, dando margem às letras ExtraLight. Após clarear `--wash` para #143331, os pares sobre esse fundo foram recalculados: texto principal 11,94:1, texto secundário 7,07:1 e texto verde 7,39:1.

A referência é a [orientação oficial de contraste mínimo da WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). O resultado cobre os pares examinados; não constitui uma auditoria completa de acessibilidade.
## Assinatura visual do Hero

Atualização em 08/10/2026: a ilustração do artigo fornecida pelo usuário aparece inteira em uma moldura quadrada com cantos arredondados à direita da abertura. Arquivo: `public/hero/agent-layers.png`. O PNG original é preservado; `object-fit: contain` e um enquadramento central de 155% reduzem as margens laterais do arquivo sem cortar a ilustração principal. Em telas estreitas, a moldura mede 160 px e se posiciona à direita, abaixo do título.

Dois cometas idênticos percorrem uma elipse achatada em um ciclo de 32 s, sempre em posições diametralmente opostas. As caudas representam os 7,6 segundos anteriores, o dobro da versão inicial, com 112 segmentos cada e transparência mais acentuada do meio para o fim. A espessura continua fina e diminui progressivamente.

A oscilação vertical combina três ondas suaves (amplitudes 12, 5 e 2 unidades do SVG; períodos 8,7, 13,9 e 5,3 s), com fases sorteadas uma vez ao montar o Hero. O deslocamento é oposto entre os cometas para conservar a simetria. A variação é irregular, contínua e sem mudanças bruscas a cada frame.

O movimento da esquerda para a direita passa atrás do texto e da ilustração; da direita para a esquerda passa à frente. Duas camadas SVG ficam respectivamente abaixo e acima do conteúdo. Cabeças e segmentos de cauda são atribuídos à camada correspondente ao trecho do percurso, mantendo a continuidade nas extremidades da órbita.

Os cometas usam petróleo escuro no claro e aqua luminoso no escuro, com núcleo na cor de texto principal. A cabeça e a coroa mantêm tamanho visual consistente ao redimensionar. O efeito permanece restrito ao Hero, sem capturar o ponteiro, e os SVGs estão fora da árvore de acessibilidade. Em telas estreitas, a largura da órbita conserva as cabeças dentro da área disponível.

A implementação está em `src/components/HeroComet.tsx`. Os frames calculam coordenadas e atualizam atributos SVG, sem renderizar React a cada frame. A animação pausa quando sai da tela ou quando a página fica oculta. A preferência por movimento reduzido mantém os dois cometas estáticos, inclusive quando muda durante a sessão. Observadores, eventos e frames são removidos no cleanup. A impressão oculta o efeito decorativo.
## Identificação e competências do Hero

A barra usa a assinatura "Desenvolvimento & Gestão", também presente na legenda da foto, refletindo o posicionamento em gestão de equipes, processos e estratégias. A identificação da abertura é "Carlos Henrique Lopes". Um ícone de localização antecede "Recife, PE · Brasil".

As competências aparecem em uma lista semântica de duas colunas: Front-end, React, Power Apps, UX/UI, Dados com Excel, Gestão, SEI e Harness e SDD. Os símbolos acompanham as cores do tema e são decorativos para leitores de tela; os rótulos permanecem textuais. Harness e SDD usa um símbolo de fluxo. Os links de LinkedIn do Hero e da seção Sobre mim incluem seu ícone, seguindo o contato existente.

As cabeças dos cometas foram suavizadas: raio visual de 1,8 px, núcleo de 0,55 px e coroa de 6 px. A cabeça tem opacidade de preenchimento 0,7 e contorno discreto; o núcleo usa opacidade 0,45. A coroa começa em opacidade 0,28 e desvanece até zero. As caudas, a órbita e a divisão de profundidade mantêm a configuração anterior.

## Apresentação e trajetória — 09/10/2026

Ordem aprovada: Hero → Sobre mim breve → JBL Desk → outros projetos → trajetória profissional → publicações → contato. O menu acompanha a ordem das seções, com links para Sobre mim, Projetos, Trajetória, Publicações e Contato. O CTA do Hero continua levando diretamente aos projetos.

`About.tsx` apresenta a conexão entre gestão, processos, educação corporativa, desenvolvimento e condução de agentes de IA. Dois parágrafos se apoiam no resumo da página 1 do PDF de LinkedIn fornecido pelo usuário. A foto acompanha essa apresentação. O título combina peso 200 com uma segunda linha de peso 500; o fundo usa `--wash`. O bloco não inclui a linha do tempo. Seus links levam aos projetos e à trajetória.

`Trajectory.tsx` aprofunda experiências selecionadas depois dos projetos. Inclui a chefia da seção de gestão da rede franqueada (junho a setembro de 2024) e a gestão operacional de unidade (2011 a 2014), descritas nas páginas 3 a 6 do PDF. As funções de suporte e dados entre 2022 e 2025 aparecem agrupadas, e a chefia de 2024 é destacada separadamente. A identificação da seção é “Trajetória e Experiências”. Logo abaixo do título, a formação aparece como “Superior em Gestão da Tecnologia da Informação · Especialização em Desenvolvimento Mobile”. Download do PDF e LinkedIn ficam depois das experiências. O papel no JBL Desk permanece front-end, UX/UI e storytelling, em colaboração com PO e back-end.

Refinamento de composição: o Hero termina nas competências, descrição e ações; a faixa repetida “Em destaque / JBL Desk” foi retirada. No Sobre mim, texto e retrato formam um conjunto centralizado de até 1000 px, com intervalo de 56 px entre colunas no desktop e alinhamento vertical ao centro. A fotografia tem 340 px de largura e cantos de 24 px; em tablets, a largura e o intervalo diminuem. Abaixo de 800 px, as colunas se empilham e o retrato mede até 300 px, com cantos de 20 px. A apresentação conserva a proporção original da fotografia.

## Projetos e trabalhos — 09/10/2026

A seção “Projetos e Trabalhos” usa carrossel horizontal como apresentação única, com oito cards, começando pelo JBL Desk em destaque e seguido pelo GERAT APP e Michely Massoterapia. O fundo da seção usa `--paper` (off-white no claro), os cards usam `--surface`, e o destaque usa `--wash` (verde claro); no escuro, o destaque usa `--panel`. Cards de 380 px no desktop, cantos de 28 px e imagens com cantos de 16 px. No celular, o card ocupa de 86% a 92% do espaço disponível, deixando uma indicação do próximo projeto. As setas ficam nas laterais, uma de cada lado, centralizadas verticalmente nos cards. Rolagem nativa e scroll snap permitem explorar a sequência sem reprodução automática. O tema escuro conserva os tokens petróleo, aqua e verde.

Após a comparação, o usuário aprovou manter somente o carrossel. O seletor de apresentação foi retirado. No ambiente local, as versões anteriores permanecem recuperáveis em `outputs/backup-antes-carrossel-projetos.zip` e `outputs/backup-antes-refinamentos-carrossel.zip`; esses backups não são enviados ao GitHub. Os componentes de conteúdo continuam sendo usados nos modais.

“Saiba mais” abre um `dialog` nativo com o conteúdo compartilhado de `FeaturedProject` e `ProjectDetails`. No desktop, o cabeçalho verde (`--wash`), com título em `--green`, descrição e tecnologias, permanece fixo acima das duas colunas off-white (`--paper`). A coluna esquerda tem rolagem própria e contém os capítulos, links e decisões, sem transbordar para a galeria. A coluna direita tem galeria vertical independente, com setas centralizadas acima e abaixo da imagem, cantos arredondados, sombra discreta e cores dos controles do carrossel principal. O modal mede até 1200 px de largura e 820 px de altura, limitado ao espaço da tela. No tema escuro, todas as superfícies seguem os tokens petróleo e verde do site. Abaixo de 800 px, a galeria precede o texto em uma coluna com rolagem compartilhada; o cabeçalho e o botão de fechar permanecem visíveis. “Decisões e evidências” abre expandido. No JBL Desk, a navegação dos capítulos rola dentro do painel correspondente, sem alterar a âncora da página. O fundo esmaece em petróleo com desfoque suave. A página fica inerte e sua rolagem é bloqueada; fechar pelo botão, Escape ou fundo externo restaura o foco ao acionador.

As galerias dos projetos Endereçador, Michely Massoterapia, Sk8-Genius e Bikcraft possuem três imagens cada, obtidas dos respectivos repositórios públicos. Fontes e hashes estão em `public/projects/gallery/sources.json`. A navegação vertical tem setas, contador e suporte a teclado, com imagens inteiras e acesso ao arquivo em tamanho completo. O JBL Desk tem três capturas: desktop, Tela inicial Mobile 01 e Tela inicial Mobile 05. As duas versões móveis foram obtidas das fontes homônimas do caderno JBL Desk. Todas as legendas identificam a base fictícia. O movimento reduzido desativa a rolagem animada.

Bikcraft aparece como estudo de HTML/CSS e mobile first, com atribuição ao layout da Origamid. Desenvolvimento assistido por IA aparece como caderno de estudo, e MyAntigravityHarness como projeto de governança e SDD. Os dois últimos usam capas editoriais em HTML/CSS, identificadas como tais; não simulam capturas de uma aplicação. A leitura do caderno não transformou suas afirmações de performance em métricas de resultado do portfólio. Os exemplos de imagens de skills de terceiros presentes no harness não foram utilizados como trabalhos autorais.

Em dispositivos com mouse e hover, o card cresce 1,8%, sobe 5 px e recebe uma sombra discreta em 280 ms. A área de rolagem tem folga para o efeito e as sombras. Dispositivos de toque não ativam a flutuação. `prefers-reduced-motion` desativa a transição.

A indicação “Deslize para explorar” fica entre o título da seção e os cards e descreve o carrossel para tecnologias assistivas. As setas ativas usam os tokens do botão principal: petróleo sobre o claro e aqua sobre o escuro, com cores invertidas no ícone; ao passar o mouse, usam aqua. Setas desabilitadas têm fundo `--wash`, texto `--muted` e não recebem o efeito de hover. O selo “01 / Em destaque” usa preenchimento do botão principal, peso 700 e cantos de 8 px. “Mais no GitHub” reutiliza as classes `button button-primary` do CTA “Explore o trabalho”.

## Passagens entre seções

As junções do conteúdo principal usam um degradê vertical de 32 px, da cor da seção anterior para a próxima, dentro da margem superior e sem cobrir texto. A passagem de contato para o rodapé usa 20 px. As cores vêm dos tokens dos temas, incluindo o petróleo do contato. A impressão oculta os degradês.

## Publicações — 09/10/2026

A instrução “Selecione uma publicação para ler no LinkedIn.” aparece logo abaixo do título, com seta externa e tipografia discreta. Cada linha inteira continua sendo um único link, com abertura em nova aba. A primeira página da publicação sobre IA e a capa “Scrum Workflow” do artigo sobre Scrum aparecem como miniaturas de 132 × 112 px no desktop, com cantos de 16 px, contorno suave e imagem inteira (`object-fit: contain`). Em telas menores, elas ocupam a margem dos números para preservar a largura do texto e a altura dos itens; no celular, medem 48 × 64 px. As superfícies seguem os tokens dos temas. Fontes e hashes das imagens estão em `public/publications/sources.json`.

A lista reúne cinco publicações em ordem cronológica decrescente, de agosto de 2026 a outubro de 2022, com mês e ano junto à categoria. As três novas entradas usam títulos editoriais e resumos baseados nas publicações originais: reconhecimento por projeto de inovação nos Correios, conexões entre JavaScript e Power Apps e revisão de dashboards em Excel. Todas reutilizam o mesmo componente e as dimensões de miniatura existentes.

## GERAT APP — 09/10/2026

O GERAT APP aparece como segundo card do carrossel, com capa editorial em HTML/CSS identificada, seguindo a composição das capas existentes e os tokens dos temas. O modal reutiliza o layout de duas colunas e apresenta o certificado como única imagem disponível, com ampliação e legenda que distingue o prêmio de 2022 da entrega em novembro de 2023. O link de evidência leva à publicação original no LinkedIn; não há link de código ou demonstração pública informado para este projeto.

O conteúdo atribui a Carlos o front-end e a atuação como agilista em uma equipe de três pessoas, junto a PO e back-end. Descreve a concentração e o tratamento de dados de sistemas dispersos com Power Apps, Microsoft Lists, SharePoint, Power Automate, Access e Excel. Desempenho e comunicação são apresentados como objetivos da ferramenta. A evolução do MVP para uma aplicação oficial em outra linguagem permanece em andamento. Essas informações foram fornecidas pelo usuário; não foram adicionadas métricas ou capturas de interface simuladas. O projeto também ganha uma menção na experiência dos Correios, com link para seu card, e o resumo da publicação passa a identificar o GERAT APP.

## Contato — 09/10/2026

A identificação da seção é “Vamos conversar”. O convite apresenta oportunidades em gestão de equipes e processos ou desenvolvimento de soluções digitais, relacionando a experiência na operação à construção de interfaces, organização de informações e condução de agentes de IA. O título “O próximo desafio.” e os meios de contato mantêm a composição existente.
