import { useEffect, useRef } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { siteProcessSprints } from '../data/siteProcess';
import '../project-showcase.css';
import '../site-process.css';

export function SiteProcessModal({ onDismiss }: { onDismiss: () => void }) {
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

  return <dialog ref={dialog} className="project-modal site-process-modal" aria-labelledby="site-process-title" onCancel={event => { event.preventDefault(); onDismiss(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onDismiss();
  }}>
    <header className="modal-header">
      <div className="modal-toolbar"><span className="eyebrow">Bastidores / Construção do portfólio</span><button type="button" className="round-control" aria-label="Fechar processo de construção" onClick={onDismiss} autoFocus><X size={20} aria-hidden="true" /></button></div>
      <div className="modal-heading"><h2 id="site-process-title">Sobre este site<span className="accent-period">.</span></h2><p>Um produto construído por etapas, com decisões humanas, desenvolvimento assistido por IA e revisão a cada entrega.</p></div>
      <div className="modal-meta"><span>Da intenção à interface</span><ul className="tags" aria-label="Tecnologias deste site"><li>React</li><li>TypeScript</li><li>Vite</li></ul></div>
    </header>
    <div className="modal-body">
      <section className="modal-text process-backlog" aria-labelledby="process-backlog-title" tabIndex={0}>
        <div className="process-intro"><span className="eyebrow">Backlog / Entregas por seção</span><h3 id="process-backlog-title">Uma seção. Uma rodada de evolução.</h3><p>As etapas abaixo estão organizadas como sprints para contar o processo. Cada uma reúne a direção dada por Carlos e o que foi construído e refinado a partir dela.</p></div>
        <ol className="process-sprints">
          {siteProcessSprints.map((sprint, index) => <li className="process-sprint" key={sprint.section}>
            <span className="eyebrow">Sprint {String(index + 1).padStart(2, '0')} / {sprint.section}</span>
            <h4>{sprint.title}</h4>
            <p className="process-direction"><strong>Direção do produto</strong>{sprint.direction}</p>
            <h5>Entregas</h5>
            <ul className="process-deliveries">{sprint.deliveries.map(delivery => <li key={delivery}><Check size={15} aria-hidden="true" /><span>{delivery}</span></li>)}</ul>
          </li>)}
        </ol>
        <p className="process-note">Este é um registro das entregas desta versão. O portfólio segue em refinamento, com aceitação final de Carlos antes da publicação.</p>
      </section>
      <section className="modal-media process-collaboration" aria-labelledby="process-roles-title" tabIndex={0}>
        <span className="eyebrow">Como trabalhamos</span>
        <h3 id="process-roles-title" className="process-statement">Direção humana.<br /><em>Construção com IA.</em></h3>
        <dl className="process-roles">
          <div><dt><span>PO / Scrum Master</span>Carlos Henrique Lopes</dt><dd>Define prioridades, traz referências, orienta o backlog e revisa as entregas. As decisões de produto e a aceitação permanecem com ele.</dd></div>
          <div><dt><span>Desenvolvimento assistido por IA</span>Codex</dt><dd>Representa a frente de desenvolvimento nesta colaboração: investiga, propõe soluções, implementa e verifica as mudanças dentro do escopo definido.</dd></div>
        </dl>
        <div className="process-cycle"><h4>O ciclo de cada entrega</h4><ol><li>Definir a intenção</li><li>Construir uma versão</li><li>Verificar e revisar</li><li>Refinar com feedback</li></ol></div>
        <div className="process-release"><span className="eyebrow">Entrega em revisão</span><p>Build, lint e conferência visual acompanham os refinamentos. A prévia permite comparar e revisar o resultado antes da publicação, preservando a história do projeto.</p><a className="text-link" href="https://github.com/CHCLopes/Portfolio/pull/1" target="_blank" rel="noreferrer">Acompanhar a evolução no GitHub <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </section>
    </div>
  </dialog>;
}
