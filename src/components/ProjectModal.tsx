import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { FeaturedProject } from '../sections/FeaturedProject';
import { Projects } from '../sections/Projects';
import { ProjectGallery } from './ProjectGallery';
import { projectImages } from '../data/projectGallery';
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
  const gallery = images?.length ? <ProjectGallery images={images} title={title} /> : undefined;
  const project = projects.find(item => item.id === projectId);

  return <dialog ref={dialog} className="project-modal" aria-labelledby={projectId === 'jbl-desk' ? 'jbl-heading' : projectId + '-title'} onCancel={event => { event.preventDefault(); onDismiss(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onDismiss();
  }}>
    <div className="modal-toolbar"><span className="eyebrow">{projectId === 'jbl-desk' ? 'Em destaque / Projeto corporativo' : 'Projeto / ' + (project?.category ?? 'Trabalho selecionado')}</span><button type="button" className="round-control" aria-label={'Fechar detalhes de ' + title} onClick={onDismiss}><X size={20} aria-hidden="true" /></button></div>
    {projectId === 'jbl-desk' ? <FeaturedProject gallery={gallery} inModal /> : <Projects projectId={projectId} gallery={gallery} />}
  </dialog>;
}
