import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { FeaturedProject } from '../sections/FeaturedProject';
import { ProjectDetails } from '../sections/Projects';
import { ProjectGallery } from './ProjectGallery';
import { ProjectCover } from './ProjectCover';
import { projectCards, projectImages } from '../data/projectGallery';
import { projects } from '../data/portfolio';

export function ProjectModal({ projectId, title, onDismiss }: { projectId: string; title: string; onDismiss: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    opener.current ??= document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      opener.current?.focus({ preventScroll: true });
    };
  }, []);

  const images = projectImages[projectId];
  const project = projects.find(item => item.id === projectId);
  const cardIndex = projectCards.findIndex(item => item.id === projectId);
  const card = projectCards[cardIndex];
  const titleId = projectId + '-modal-title';

  return <dialog ref={dialog} className="project-modal" aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onDismiss(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onDismiss();
  }}>
    <header className="modal-header">
      <div className="modal-toolbar"><span className="eyebrow">{String(cardIndex + 1).padStart(2, '0')} / {card?.featured ? 'Em destaque' : 'Trabalho selecionado'}</span><button type="button" className="round-control" aria-label={'Fechar detalhes de ' + title} onClick={onDismiss} autoFocus><X size={20} aria-hidden="true" /></button></div>
      <div className="modal-heading"><h2 id={titleId}>{projectId === 'antigravity-harness' ? <>MyAntigravity<wbr />Harness</> : title}<span className="accent-period">.</span></h2><p>{card?.headline}</p></div>
      <div className="modal-meta"><span>{card?.featured ? 'JBL Nordeste · Front-end · UX/UI · Storytelling' : card?.category}</span><ul className="tags" aria-label={'Tecnologias de ' + title}>{card?.tech.map(tech => <li key={tech}>{tech}</li>)}</ul></div>
    </header>
    <div className="modal-body">
      <section className="modal-text" aria-label={'Sobre ' + title} tabIndex={0}>
        {card?.featured ? <FeaturedProject inModal textOnly /> : project && <div className="project-copy"><ProjectDetails project={project} showTech={false} headingLevel="h3" /></div>}
      </section>
      <section className="modal-media" aria-label={'Apresentação visual de ' + title}>
        {images?.length ? <ProjectGallery images={images} title={title} /> : <figure className="modal-editorial"><ProjectCover kind={project?.cover ?? 'study'} /><figcaption>{project?.imageCaption}</figcaption></figure>}
      </section>
    </div>
  </dialog>;
}
