import { projects } from './portfolio';
import type { PortfolioProject } from './portfolio';
import type { ProjectImage } from '../components/ProjectGallery';

type ProjectCard = Pick<PortfolioProject, 'id' | 'title' | 'category' | 'headline' | 'image' | 'alt' | 'cover' | 'tech'> & { featured: boolean };

export const projectCards: readonly ProjectCard[] = [
  { id: 'jbl-desk', title: 'JBL Desk', category: 'Projeto corporativo', headline: 'Uma interface para acompanhar o desempenho comercial.', image: '/projects/jbl-desk.jpg', alt: 'Dashboard do JBL Desk. Os números apresentados são fictícios.', tech: ['Power Apps', 'Power Fx', 'UX/UI'], featured: true },
  ...projects.map(project => ({ ...project, featured: false })),
];

export const projectImages: Record<string, readonly ProjectImage[]> = {
  'jbl-desk': [{ src: '/projects/jbl-desk.jpg', alt: 'Dashboard do JBL Desk com filtros, meta global, distribuição por área e evolução anual. Os números são fictícios.', caption: 'Interface em Power Apps / Base fictícia.' }],
  enderecador: [
    { src: '/projects/gallery/enderecador-desktop.png', alt: 'Interface desktop do Endereçador.', caption: '01 / Interface desktop.' },
    { src: '/projects/gallery/enderecador-preview.png', alt: 'Remetente e visualização da impressão no Endereçador.', caption: '02 / Remetente e prévia de impressão.' },
    { src: '/projects/gallery/enderecador-mobile.png', alt: 'Formulário de remetente do Endereçador em tela móvel.', caption: '03 / Interface móvel.' },
  ],
  massoterapia: [
    { src: '/projects/gallery/massoterapia-hero.jpg', alt: 'Página de Michely Massoterapia com apresentação e agendamento.', caption: '01 / Apresentação e chamada para agendamento.' },
    { src: '/projects/gallery/massoterapia-servicos.jpg', alt: 'Seção de serviços da aplicação publicada, com cards de tratamentos.', caption: '02 / Serviços e navegação por tratamentos.' },
    { src: '/projects/gallery/massoterapia-sobre.jpg', alt: 'Apresentação da profissional na aplicação publicada.', caption: '03 / A profissional e sua experiência.' },
  ],
  genius: [
    { src: '/projects/gallery/genius-desktop.jpg', alt: 'Sk8-Genius ligado na interface desktop.', caption: '01 / Interface e controles do jogo.' },
    { src: '/projects/gallery/genius-competitivo.jpg', alt: 'Modo competitivo do Sk8-Genius.', caption: '02 / Modo competitivo.' },
    { src: '/projects/gallery/genius-ajuda.jpg', alt: 'Modal de ajuda com as instruções do Sk8-Genius.', caption: '03 / Instruções e ajuda.' },
  ],
  bikcraft: [
    { src: '/projects/gallery/bikcraft-1.png', alt: 'Bikcraft em desktop, com apresentação da bicicleta e lista de vantagens.', caption: '01 / Composição desktop.' },
    { src: '/projects/gallery/bikcraft-2.png', alt: 'Bikcraft em tela móvel, com os blocos organizados em uma coluna.', caption: '02 / Composição mobile first.' },
    { src: '/projects/gallery/bikcraft-3.png', alt: 'Menu de navegação móvel do Bikcraft aberto.', caption: '03 / Navegação no celular.' },
  ],
};
