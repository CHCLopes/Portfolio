const covers = {
  study: { label: 'Capa editorial do caderno de desenvolvimento assistido por IA.', eyebrow: 'Caderno de estudo / Engenharia de software', monogram: 'IA', steps: ['Intenção', 'Contexto', 'Revisão'], title: 'Desenvolvimento assistido' },
  harness: { label: 'Capa editorial do MyAntigravityHarness.', eyebrow: 'Governança / Agentes de IA', monogram: 'H', steps: ['Escopo', 'Execução', 'Evidência'], title: 'MyAntigravityHarness' },
  gerat: { label: 'Capa editorial do GERAT APP: dados, informação e gestão.', eyebrow: 'Capa editorial / Gestão local', monogram: 'G', steps: ['Dados', 'Informação', 'Gestão'], title: 'GERAT APP' },
} as const;

export function ProjectCover({ kind }: { kind: keyof typeof covers }) {
  const cover = covers[kind];
  return <div className={'project-cover project-cover-' + kind} role="img" aria-label={cover.label}>
    <span className="cover-eyebrow">{cover.eyebrow}</span>
    <div className="cover-composition"><span className="cover-monogram thin-display">{cover.monogram}</span><div>{cover.steps.map((label, index) => <span key={label}><small>0{index + 1}</small>{label}</span>)}</div></div>
    <p>{cover.title}</p>
  </div>;
}
