export function ProjectCover({ kind }: { kind: 'study' | 'harness' }) {
  const study = kind === 'study';
  return <div className={'project-cover project-cover-' + kind} role="img" aria-label={study ? 'Capa editorial do caderno de desenvolvimento assistido por IA.' : 'Capa editorial do MyAntigravityHarness.'}>
    <span className="cover-eyebrow">{study ? 'Caderno de estudo / Engenharia de software' : 'Governança / Agentes de IA'}</span>
    <div className="cover-composition"><span className="cover-monogram thin-display">{study ? 'IA' : 'H'}</span><div>{(study ? ['Intenção', 'Contexto', 'Revisão'] : ['Escopo', 'Execução', 'Evidência']).map((label, index) => <span key={label}><small>0{index + 1}</small>{label}</span>)}</div></div>
    <p>{study ? 'Desenvolvimento assistido' : 'MyAntigravityHarness'}</p>
  </div>;
}
