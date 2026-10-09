import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowDown } from 'lucide-react';

const chapters = [
  { id: 'jbl-context', number: '01', label: 'Contexto', title: 'Ler a operação antes de desenhar a tela.', text: 'A JBL Nordeste estava em transição digital. O dashboard precisava organizar metas, produção e recortes de análise em uma aplicação corporativa de Power Apps.', detail: 'Meu papel: front-end, UX/UI e storytelling da interface, em colaboração com Product Owner e equipe de back-end. Dezembro de 2025 a março de 2026.' },
  { id: 'jbl-interface', number: '02', label: 'Interface', title: 'Componentes que se adaptam à rotina.', text: 'Cabeçalho, navegação e rodapé reutilizáveis. HTML, CSS e SVG para construir elementos de interface e gráficos, com organização diferente para desktop e celular.', detail: 'Decisão documentada: separar os componentes e adaptar a navegação ao dispositivo, em vez de apenas reduzir a tela de desktop.' },
  { id: 'jbl-filters', number: '03', label: 'Interação', title: 'Escolher o recorte. Confirmar a análise.', text: 'Filtros por período, área, convênio e gestor. A seleção temporária é separada da aplicada; o contexto do dashboard muda após a confirmação.', detail: 'Foi meu primeiro trabalho gerindo agentes de IA na construção, com Gemini. Os agentes apoiaram a construção do front-end; conduzi o storytelling e revisei as decisões de interface.' },
] as const;

export function FeaturedProject({ gallery, inModal = false, textOnly = false }: { gallery?: ReactNode; inModal?: boolean; textOnly?: boolean }) {
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 799px)');
    let observer: IntersectionObserver;
    function observeChapters() {
      observer?.disconnect();
      const root = inModal ? chapterRefs.current[0]?.closest(textOnly ? (mobile.matches ? '.modal-body' : '.modal-text') : 'dialog') : null;
      observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const index = chapterRefs.current.indexOf(visible[0].target as HTMLElement);
          if (index >= 0) setActive(index);
        }
      }, { root, rootMargin: '-18% 0px -45% 0px', threshold: 0 });
      chapterRefs.current.forEach(element => { if (element) observer.observe(element); });
    }
    observeChapters();
    mobile.addEventListener('change', observeChapters);
    return () => { observer.disconnect(); mobile.removeEventListener('change', observeChapters); };
  }, [inModal, textOnly]);
  if (textOnly) return <>
    <nav className="chapter-nav" aria-label="Etapas do case JBL Desk">{chapters.map((chapter, index) => <a href={'#' + chapter.id} key={chapter.id} aria-current={active === index ? 'step' : undefined} onClick={event => { event.preventDefault(); chapterRefs.current[index]?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }); }}>{chapter.number} {chapter.label}</a>)}</nav>
    <div className="case-chapters">{chapters.map((chapter, index) => <article id={chapter.id} ref={element => { chapterRefs.current[index] = element; }} className={'case-chapter' + (active === index ? ' is-current' : '')} key={chapter.id} aria-labelledby={chapter.id + '-heading'}>
      <p className="eyebrow"><span>{chapter.number}</span> / {chapter.label}</p><h3 id={chapter.id + '-heading'}>{chapter.title}</h3><p>{chapter.text}</p><p className="chapter-detail">{chapter.detail}</p>
    </article>)}</div>
    <div className="case-evidence"><p><strong>Front-end e storytelling</strong>A organização dos indicadores, as decisões de interação e os componentes estão registrados na documentação técnica do projeto.</p></div>
  </>;
  return <section id={inModal ? undefined : 'jbl-desk'} className="section featured-section" aria-labelledby="jbl-heading">
    <div className="shell">
      <div className="feature-heading"><div><p className="eyebrow">Trabalho selecionado / Projeto corporativo</p><h2 id="jbl-heading">JBL Desk<span className="accent-period">.</span></h2></div><p>Uma interface para acompanhar<br />o desempenho comercial.</p></div>
      <div className="feature-meta"><span>JBL Nordeste</span><span>Front-end · UX/UI · Storytelling</span><span>Power Apps · Power Fx</span></div>
      <div className="case-layout">
        <div className="case-chapters">{chapters.map((chapter, index) => <article id={chapter.id} ref={element => { chapterRefs.current[index] = element; }} className={'case-chapter' + (active === index ? ' is-current' : '')} key={chapter.id} aria-labelledby={chapter.id + '-heading'}>
          <p className="eyebrow"><span>{chapter.number}</span> / {chapter.label}</p><h3 id={chapter.id + '-heading'}>{chapter.title}</h3><p>{chapter.text}</p><p className="chapter-detail">{chapter.detail}</p>
        </article>)}</div>
        <figure className="case-map">
          <div className="map-topline"><span>JBL DESK / INTERFACE EM POWER APPS</span><span aria-hidden="true">↗</span></div>
          <nav className="chapter-nav" aria-label="Etapas do case JBL Desk">{chapters.map((chapter, index) => <a href={'#' + chapter.id} key={chapter.id} aria-current={active === index ? 'step' : undefined} onClick={inModal ? event => { event.preventDefault(); chapterRefs.current[index]?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }); } : undefined}>{chapter.number} {chapter.label}</a>)}</nav>
          {gallery ?? <a className="case-screen" href="/projects/jbl-desk.jpg" target="_blank" rel="noopener noreferrer" aria-label="Abrir captura do JBL Desk em tamanho completo"><img src="/projects/jbl-desk.jpg" alt="Dashboard do JBL Desk com filtros, meta global, distribuição por área e evolução anual. Os números são fictícios." width="1024" height="580" loading="lazy" decoding="async" /></a>}
          <div className="screen-note"><span>Em foco / {chapters[active].label}</span><p>{active === 0 ? 'Metas e produção reunidas em uma leitura da operação.' : active === 1 ? 'Cabeçalho, menu e rodapé organizados em componentes reutilizáveis.' : 'Filtros de período, área, convênio e gestor delimitam a análise.'}</p></div>
          <figcaption>Captura da aplicação. Base fictícia criada para desenvolver e validar a interface.</figcaption>
        </figure>
      </div>
      <div className="case-evidence"><p><strong>Front-end e storytelling</strong>A organização dos indicadores, as decisões de interação e os componentes estão registrados na documentação técnica do projeto.</p>{!inModal && <a className="text-link" href="#more-work">Outros projetos <ArrowDown size={17} aria-hidden="true" /></a>}</div>
    </div>
  </section>;
}
