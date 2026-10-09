import { ArrowDown, ArrowUpRight, Linkedin } from 'lucide-react';
import { profile } from '../data/portfolio';

const experience = [
  { period: '2025 — 2026', title: 'Consultoria de front-end em Power Apps', place: 'Jofili S T / JBL Nordeste', text: 'Front-end, UX/UI e storytelling de uma aplicação corporativa. Componentes responsivos e colaboração com Product Owner e equipe de back-end.' },
  { period: '2022 — 2025', title: 'Dados, soluções internas e planejamento tático', place: 'Correios', text: 'Aplicações em Power Apps, painéis em Power BI e Excel, indicadores e portais em SharePoint. Análises para apoiar decisões gerenciais e atuação em processos administrativos com SEI.' },
  { period: 'Jun — Set 2024', title: 'Chefia da seção de gestão da rede franqueada', place: 'Correios', text: 'Acompanhamento da qualidade e da conformidade da rede, com planos de ação junto aos franqueados. Educação corporativa para orientar a melhoria dos processos e o alinhamento às diretrizes da organização.' },
  { period: '2020 — 2022', title: 'Mentoria corporativa em Excel e dados', place: 'Educação corporativa', text: 'Capacitação de equipes com foco em raciocínio lógico, organização de dados e resolução de problemas da rotina. Tradução de conceitos técnicos para uma linguagem acessível.' },
  { period: '2011 — 2014', title: 'Gestão operacional de unidade', place: 'Correios', text: 'Liderança de equipe, desenvolvimento de pessoas e acompanhamento de metas comerciais. Gestão das rotinas administrativas e financeiras, com atenção à qualidade do atendimento e às normas da organização.' },
] as const;

export function Trajectory() {
  return <section id="trajectory" className="section trajectory-section" aria-labelledby="trajectory-heading"><div className="shell">
    <div className="section-heading"><div><p className="eyebrow">Trajetória / Experiências selecionadas</p><h2 id="trajectory-heading" className="thin-display">Gestão, dados<br />e&nbsp;desenvolvimento.</h2></div><p>Experiências que conectam liderança de equipes, processos, educação corporativa e construção de ferramentas.</p></div>
    <div className="experience-list">{experience.map(item => <article className="experience-item" key={item.title}><span className="experience-period">{item.period}</span><div><p className="eyebrow">{item.place}</p><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
    <p className="education-note">Formação em Gestão da Tecnologia da Informação · Especialização em Desenvolvimento Mobile</p>
    <div className="about-links"><a className="text-link" href="/carlos-lopes-trajetoria.pdf" download>Baixar trajetória profissional <ArrowDown size={17} aria-hidden="true" /></a><a className="text-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" />LinkedIn <ArrowUpRight size={17} aria-hidden="true" /></a></div>
  </div></section>;
}
