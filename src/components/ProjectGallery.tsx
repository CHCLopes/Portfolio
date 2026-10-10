import { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight } from 'lucide-react';

export type ProjectImage = { src: string; alt: string; caption: string };

export function ProjectGallery({ images, title }: { images: readonly ProjectImage[]; title: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const multiple = images.length > 1;

  function goTo(index: number) {
    const element = viewport.current;
    if (!element) return;
    element.scrollTo({ top: index * element.clientHeight, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  return <div className="project-gallery" role="region" aria-label={'Imagens de ' + title} aria-roledescription={multiple ? 'carrossel vertical' : undefined}>
    <div className={'gallery-stage' + (multiple ? ' gallery-stage-multiple' : '')}>
    {multiple && <button type="button" className="round-control gallery-direction" aria-label="Imagem anterior" disabled={active === 0} onClick={() => goTo(active - 1)}><ArrowUp size={19} aria-hidden="true" /></button>}
    <div className="gallery-viewport" ref={viewport} tabIndex={multiple ? 0 : undefined} onScroll={event => {
      const element = event.currentTarget;
      setActive(Math.max(0, Math.min(images.length - 1, Math.round(element.scrollTop / element.clientHeight))));
    }} onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        goTo(Math.max(0, Math.min(images.length - 1, active + (event.key === 'ArrowDown' ? 1 : -1))));
      }
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        goTo(event.key === 'Home' ? 0 : images.length - 1);
      }
    }}>
      {images.map((image, index) => <figure className="gallery-slide" key={image.src} role={multiple ? 'group' : undefined} aria-label={multiple ? `${index + 1} de ${images.length}` : undefined}>
        <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Abrir imagem ${index + 1} de ${title} em tamanho completo`} tabIndex={index === active ? 0 : -1}><img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /></a>
        <figcaption>{image.caption}</figcaption>
      </figure>)}
    </div>
    {multiple && <button type="button" className="round-control gallery-direction" aria-label="Próxima imagem" disabled={active === images.length - 1} onClick={() => goTo(active + 1)}><ArrowDown size={19} aria-hidden="true" /></button>}
    </div>
    {multiple && <div className="gallery-controls"><span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span><a className="text-link gallery-zoom" href={images[active].src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar imagem ${active + 1} de ${title}`}>Ampliar <ArrowUpRight size={14} aria-hidden="true" /></a></div>}
    {!multiple && <a className="gallery-fullsize text-link" href={images[0].src} target="_blank" rel="noopener noreferrer">Ampliar imagem <ArrowUpRight size={15} aria-hidden="true" /></a>}
  </div>;
}
