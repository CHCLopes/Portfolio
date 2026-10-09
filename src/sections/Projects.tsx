import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Github } from 'lucide-react';
import { projects, profile } from '../data/portfolio';
import type { PortfolioProject } from '../data/portfolio';
import { ProjectCover } from '../components/ProjectCover';

export function ProjectDetails({ project, showTech = true, expanded = true, headingLevel = 'h4' }: { project: PortfolioProject; showTech?: boolean; expanded?: boolean; headingLevel?: 'h3' | 'h4' }) {
  const Heading = headingLevel;
  return <><p>{project.description}</p>{showTech && <ul className="tags" aria-label={'Tecnologias de ' + project.title}>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>}
    <div className="project-links">{project.live && <a className="text-link" href={project.live} target="_blank" rel="noopener noreferrer">{project.id === 'genius' ? 'Experimentar o jogo' : 'Ver aplicação'} <ArrowUpRight size={17} aria-hidden="true" /></a>}<a className="text-link secondary-link" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={(project.repositoryLabel ?? 'Ver código') + ' de ' + project.title}><Github size={17} aria-hidden="true" /> {project.repositoryLabel ?? 'Código'}</a></div>
    <details className="case-study" open={expanded ? true : undefined}><summary>Decisões e evidências <ChevronDown size={18} aria-hidden="true" /></summary><div className="case-content"><Heading>Meu papel</Heading><p>{project.role}</p><Heading>O problema</Heading><p>{project.problem}</p><Heading>Decisões de implementação</Heading><ul>{project.decisions.map(decision => <li key={decision}>{decision}</li>)}</ul><Heading>O que você pode conferir</Heading><p>{project.evidence}</p><Heading>Próxima validação</Heading><p>{project.next}</p></div></details>
  </>;
}

export function Projects({ projectId, gallery }: { projectId?: string; gallery?: ReactNode }) {
  return <section id={projectId ? undefined : "more-work"} className="section projects-section" aria-labelledby={projectId ? projectId + "-title" : "projects-heading"}><div className="shell">
    {!projectId && <div className="section-heading"><div><p className="eyebrow">Aplicações web / Projetos publicados</p><h2 id="projects-heading" className="thin-display">Outras formas<br />de construir.</h2></div><p>Ferramenta operacional, presença digital e interação. Diferentes contextos para experimentar o trabalho.</p></div>}
    <div className={projectId ? "project-list project-list-modal" : "project-list"}>{projects.filter(project => !projectId || project.id === projectId).map(project => <article id={projectId ? undefined : project.id} className={'project project-' + project.id + (projectId ? ' project-modal-article' : '')} aria-labelledby={project.id + '-title'} key={project.id}>
      <figure className="project-figure"><div className="figure-meta"><span>{project.number} / {project.category}</span><ArrowUpRight size={19} aria-hidden="true" /></div>{gallery ?? (project.image ? <a className="project-image-link" href={project.live ?? project.github} target="_blank" rel="noopener noreferrer" aria-label={'Conhecer ' + project.title}><img src={project.image} alt={project.alt} width="1265" height="712" loading="lazy" decoding="async" /></a> : <ProjectCover kind={project.cover ?? 'study'} />)}<figcaption>{project.imageCaption ?? 'Captura da aplicação publicada.'}</figcaption></figure>
      <div className="project-copy"><p className="project-category">{project.category}</p><h3 id={project.id + '-title'}>{project.id === 'antigravity-harness' ? <>MyAntigravity<wbr />Harness</> : project.title}</h3><p className="project-headline">{project.headline}</p><ProjectDetails project={project} expanded={!!projectId} />
      </div>
    </article>)}</div>{!projectId && <a className="all-projects" href={profile.github} target="_blank" rel="noopener noreferrer"><span>Mais código e experimentos no GitHub.</span><span>Explorar repositórios <ArrowRight size={17} aria-hidden="true" /></span></a>}
  </div></section>;
}
