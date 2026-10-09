import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ProjectModal } from '../components/ProjectModal';
import { ProjectCover } from '../components/ProjectCover';
import { projectCards } from '../data/projectGallery';
import { profile } from '../data/portfolio';
import '../project-showcase.css';

export function ProjectShowcase() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [position, setPosition] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const selected = projectCards.find(project => project.id === selectedId);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const max = element.scrollWidth - element.clientWidth;
      setPosition(max > 0 ? Math.round(element.scrollLeft / max * 100) : 100);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const first = element.firstElementChild as HTMLElement;
    const step = first.offsetWidth + parseFloat(getComputedStyle(element).gap);
    element.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  return <div id="projects" className="project-showcase">
    <div className="shell project-view-bar"><p className="eyebrow">Projetos e Trabalhos</p></div>
    <section className="section carousel-section" aria-labelledby="showcase-heading"><div className="shell">
      <div className="section-heading showcase-heading"><div><h2 id="showcase-heading" className="thin-display">Da necessidade<br /><span>à solução.</span></h2></div><p>Interfaces, estudos e ferramentas construídos a partir de contextos reais.</p></div>
      <p className="showcase-hint" id="showcase-hint">Deslize para explorar <ArrowRight size={17} aria-hidden="true" /></p>
      <div className="carousel-stage">
      <button type="button" className="round-control carousel-side carousel-previous" aria-label="Projetos anteriores" aria-controls="project-track" disabled={position === 0} onClick={() => move(-1)}><ArrowLeft size={19} aria-hidden="true" /></button>
      <div id="project-track" className="project-carousel" ref={track} role="region" aria-label="Projetos selecionados" aria-describedby="showcase-hint" aria-roledescription="carrossel" tabIndex={0} onScroll={event => {
        const element = event.currentTarget;
        const max = element.scrollWidth - element.clientWidth;
        setPosition(max > 0 ? Math.round(element.scrollLeft / max * 100) : 100);
      }}>
        {projectCards.map((project, index) => <article id={project.id} className={'showcase-card' + (project.featured ? ' showcase-card-featured' : '')} key={project.id} aria-labelledby={project.id + '-card-title'}>
          <div className="showcase-card-top"><span>{String(index + 1).padStart(2, '0')} / {project.featured ? 'Em destaque' : project.category}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
          <div className="showcase-card-image">{project.image ? <img src={project.image} alt={project.alt} width="1265" height="712" loading="lazy" decoding="async" /> : <ProjectCover kind={project.cover ?? 'study'} />}</div>
          <div className="showcase-card-copy"><p className="project-category">{project.category}</p><h3 id={project.id + '-card-title'}>{project.id === 'antigravity-harness' ? <>MyAntigravity<wbr />Harness</> : project.title}</h3><p>{project.headline}</p><ul className="tags" aria-label={'Tecnologias de ' + project.title}>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul></div>
          <button type="button" className="showcase-more" aria-label={'Saiba mais sobre ' + project.title} aria-haspopup="dialog" onClick={() => setSelectedId(project.id)}>Saiba mais <ArrowUpRight size={18} aria-hidden="true" /></button>
        </article>)}
      </div>
      <button type="button" className="round-control carousel-side carousel-next" aria-label="Próximos projetos" aria-controls="project-track" disabled={position === 100} onClick={() => move(1)}><ArrowRight size={19} aria-hidden="true" /></button>
      </div>
      <div className="showcase-footer"><div className="carousel-progress" aria-hidden="true"><span style={{ width: `${100 / projectCards.length}%`, left: `${position * (1 - 1 / projectCards.length)}%` }} /></div><a className="button button-primary" href={profile.github} target="_blank" rel="noopener noreferrer">Mais no GitHub <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </div></section>
    {selected && <ProjectModal key={selected.id} projectId={selected.id} title={selected.title} onDismiss={() => setSelectedId(null)} />}
  </div>;
}
