export const profile = {
  name: 'Carlos Lopes',
  email: 'carloshcldev@gmail.com',
  github: 'https://github.com/CHCLopes',
  linkedin: 'https://www.linkedin.com/in/carlos-lopes-b445aa201/',
} as const;

export const publications = [
  { title: 'O Brasil já adotou a IA. Mas já aprendeu a implementá-la?', category: 'IA e cultura digital', description: 'Uma reflexão a partir do OpenAI para Devs, no Recife: transformar o uso de ferramentas em capacidade, processos e resultados, preservando a autonomia das pessoas.', href: 'https://www.linkedin.com/posts/carlos-lopes-b445aa201_openaiparadevsrecife-01-ugcPost-7493448579198533632-IDEU/' },
  { title: 'O Scrum como instrumento de transformação da cultura corporativa', category: 'Gestão ágil · Novembro de 2022', description: 'Uma análise sobre pessoas, aprendizagem e mudança de cultura, escrita durante a formação em Scrum Master.', href: 'https://pt.linkedin.com/pulse/o-scrum-como-instrumento-de-transforma%C3%A7%C3%A3o-da-cultura-carlos-lopes' },
] as const;

export type PortfolioProject = {
  id: string; number: string; title: string; category: string; headline: string;
  description: string; image?: string; alt?: string; cover?: 'study' | 'harness';
  imageCaption?: string; tech: readonly string[]; github: string; live?: string;
  role: string; problem: string; decisions: readonly string[]; evidence: string; next: string;
  repositoryLabel?: string;
};

export const projects: readonly PortfolioProject[] = [
  {
    id: 'enderecador',
    number: '01',
    title: 'Endereçador',
    category: 'Ferramenta operacional',
    headline: 'Da rotina de postagem a uma ferramenta digital.',
    description: 'Consulta de CEP, preenchimento de endereços e geração de etiquetas em um só fluxo. Uma aplicação que aproxima desenvolvimento web e uma necessidade concreta da operação.',
    image: '/projects/enderecador.jpg',
    alt: 'Interface real do Endereçador com formulário de remetente e prévia da etiqueta e da declaração de conteúdo.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'ViaCEP'],
    github: 'https://github.com/CHCLopes/Projeto-Enderecador',
    live: 'https://enderecador.netlify.app/',
    role: 'Desenvolvimento front-end e organização da interface para o fluxo de endereçamento.',
    problem: 'Preparar etiquetas manualmente exige repetir informações e organizar documentos de postagem.',
    decisions: ['Integrar a consulta de CEP para apoiar o preenchimento dos endereços.', 'Separar remetente e destinatário, com prévia dos documentos de impressão.', 'Reunir etiquetas em uma fila e contemplar envios nacionais e internacionais.'],
    evidence: 'Aplicação publicada com consulta de CEP, fila de impressão e prévia de documentos. O repositório permite consultar a implementação.',
    next: 'Medir o tempo de preparação e os erros de preenchimento em tarefas reais de postagem.',
  },
  {
    id: 'massoterapia',
    number: '02',
    title: 'Michely Massoterapia',
    category: 'Projeto para cliente',
    headline: 'Uma presença digital pensada para o atendimento.',
    description: 'Site de serviços com navegação responsiva e caminhos diretos para contato e agendamento. Design e desenvolvimento conectados à jornada de quem procura atendimento.',
    image: '/projects/massoterapia.jpg',
    alt: 'Página real de Michely Massoterapia com apresentação dos serviços e chamada para agendamento.',
    tech: ['React', 'Tailwind CSS', 'Vite', 'JotForm'],
    github: 'https://github.com/CHCLopes/ProjetoMassoterapia',
    live: 'https://michelymassoterapia.netlify.app/',
    role: 'Desenvolvimento da página e da experiência de navegação para uma cliente do setor de serviços.',
    problem: 'Apresentar os serviços com clareza e facilitar o próximo passo de quem deseja marcar uma sessão.',
    decisions: ['Organizar serviços, apresentação da profissional e contato em uma página responsiva.', 'Distribuir chamadas de agendamento ao longo da jornada.', 'Oferecer contato por WhatsApp e acesso ao atendimento virtual integrado com JotForm.'],
    evidence: 'Site publicado, repositório público e caminhos de contato presentes na interface. A integração de atendimento é descrita na documentação do projeto.',
    next: 'Validar a jornada de agendamento com usuários e acompanhar contatos gerados pelo site.',
  },
  {
    id: 'genius',
    number: '03',
    title: 'Sk8-Genius',
    category: 'Interface e interação',
    headline: 'Um clássico reconstruído para a web.',
    description: 'Evolução do jogo de memória para React e TypeScript, com controles de dificuldade, modos de jogo e atalhos de teclado. Um espaço para explorar estado, feedback e interação.',
    image: '/projects/genius.jpg',
    alt: 'Interface real do Sk8-Genius com quatro botões de cores e painel de controles do jogo.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    github: 'https://github.com/CHCLopes/Sk8-Genius',
    live: 'https://sk8-genius.netlify.app/',
    role: 'Reescrita do projeto front-end e construção da experiência interativa.',
    problem: 'Evoluir um exercício em JavaScript para uma experiência de jogo com controles e feedback mais completos.',
    decisions: ['Reorganizar a implementação com React e TypeScript.', 'Oferecer comandos por teclado e instruções acessíveis pela interface.', 'Adicionar modos, níveis de dificuldade e controle de áudio.'],
    evidence: 'Demonstração publicada com instruções, atalhos e controles de jogo, acompanhada de código e documentação públicos.',
    next: 'Ampliar a avaliação de acessibilidade e comparar a experiência em diferentes dispositivos.',
  },
  {
    id: 'bikcraft', number: '04', title: 'Bikcraft', category: 'Estudo de responsividade',
    headline: 'Do layout no Figma à experiência mobile first.',
    description: 'Landing page em HTML e CSS desenvolvida a partir do layout do curso da Origamid. O trabalho se concentrou em refatorar o CSS para mobile first e adaptar a composição a diferentes tamanhos de tela.',
    image: '/projects/gallery/bikcraft-1.png', alt: 'Landing page Bikcraft com apresentação da bicicleta e lista de vantagens.',
    tech: ['HTML', 'CSS', 'Mobile first'], github: 'https://github.com/CHCLopes/LandingPageBikCraft', live: 'https://sk8bikcraft.netlify.app/',
    role: 'Implementação e refatoração do CSS responsivo a partir de um design fornecido pela Origamid.',
    problem: 'Traduzir um layout pronto em uma página que funcione em telas pequenas e preserve sua hierarquia visual no desktop.',
    decisions: ['Trabalhar com HTML e CSS, sem frameworks ou bibliotecas de interface.', 'Refatorar a composição com a abordagem mobile first.', 'Adaptar a navegação e a distribuição do conteúdo conforme o espaço disponível.'],
    evidence: 'Aplicação publicada, código público e capturas das versões desktop, móvel e do menu. O layout original é atribuído à Origamid no repositório.',
    next: 'Revisar a navegação por teclado e a legibilidade em diferentes tamanhos de tela.',
  },
  {
    id: 'ia-ux', number: '05', title: 'Desenvolvimento assistido por IA', category: 'Caderno de estudo',
    headline: 'Especificar, contextualizar e revisar o trabalho da IA.',
    description: 'Caderno temático organizado com apoio do NotebookLM. Reúne reflexões sobre desenvolvimento assistido por IA, engenharia de prompts e governança técnica a partir de estudos sobre Sk8-Genius e um narrador digital de RPG.',
    cover: 'study', imageCaption: 'Capa editorial do caderno de estudo.',
    tech: ['NotebookLM', 'Engenharia de prompts', 'Revisão técnica'], github: 'https://github.com/CHCLopes/desenvolvimento-assistido-ia-ux', repositoryLabel: 'Ler o caderno',
    role: 'Curadoria e organização de referências, prompts e aprendizados em um caderno temático.',
    problem: 'Transformar respostas genéricas de IA em trabalho orientado por contexto, restrições e revisão humana.',
    decisions: ['Conectar estudos de desenvolvimento web e consistência de um motor narrativo.', 'Registrar a evolução dos prompts e as intervenções técnicas em cada cenário.', 'Organizar conceitos, fontes e orientações para reutilização e revisão.'],
    evidence: 'README público com contexto, curadoria de fontes, cenários de troubleshooting e um miniguia conceitual. Os estudos registram a evolução das instruções e as decisões de revisão técnica.',
    next: 'Relacionar os aprendizados a ensaios reproduzíveis e evidências de validação de cada caso.',
  },
  {
    id: 'antigravity-harness', number: '06', title: 'MyAntigravityHarness', category: 'Governança de agentes',
    headline: 'Dar direção, limites e critérios ao trabalho dos agentes.',
    description: 'Estrutura de orquestração para o Antigravity, com governança, roteamento de skills e desenvolvimento orientado por especificações. Reúne templates, um executor de planos e um validador de conformidade em Python.',
    cover: 'harness', imageCaption: 'Capa editorial do projeto de governança de agentes.',
    tech: ['Python', 'SDD', 'Governança de IA'], github: 'https://github.com/CHCLopes/MyAntigravityHarness', repositoryLabel: 'Explorar o harness',
    role: 'Estruturação de um ambiente de trabalho para agentes, conectando especificações, planejamento e validação.',
    problem: 'Manter a execução de agentes alinhada ao escopo do produto, à arquitetura e aos critérios de aceitação.',
    decisions: ['Separar as especificações de produto, arquitetura e design system em documentos próprios.', 'Conectar a geração de planos e a validação de conformidade às especificações do projeto.', 'Organizar skills e templates reutilizáveis para orientar o fluxo de trabalho.'],
    evidence: 'Repositório com templates de especificação, scripts spec-driven-executor e specification-validator, testes de integração e documentação do SDD v2.0.',
    next: 'Documentar ensaios de execução e resultados de conformidade em projetos que utilizem o harness.',
  },
];
