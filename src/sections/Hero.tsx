import { useState } from 'react';
import { AppWindow, ArrowDown, ArrowUpRight, CodeXml, FileCheck2, FileSpreadsheet, Linkedin, MapPin, Pause, PenTool, Play, UsersRound, Workflow } from 'lucide-react';
import { SiReact } from 'react-icons/si';
import { profile } from '../data/portfolio';
import { HeroComet } from '../components/HeroComet';

const specialties = [
  { label: 'Front-end', Icon: CodeXml },
  { label: 'React', Icon: SiReact },
  { label: 'Power Apps', Icon: AppWindow },
  { label: 'UX/UI', Icon: PenTool },
  { label: 'Dados com Excel', Icon: FileSpreadsheet },
  { label: 'Gestão', Icon: UsersRound },
  { label: 'SEI', Icon: FileCheck2 },
  { label: 'Harness e SDD', Icon: Workflow },
] as const;

export function Hero() {
  const [motionPaused, setMotionPaused] = useState(false);
  return <section id="home" className="hero" aria-labelledby="hero-heading">
    <div className="shell hero-editorial">
      <div className="hero-topline"><p className="eyebrow">Carlos Henrique Lopes</p><span className="hero-location"><MapPin size={13} aria-hidden="true" />Recife, PE · Brasil</span></div>
      <div className="hero-signature">
        <div className="hero-title-orbit">
          <HeroComet paused={motionPaused} />
          <h1 id="hero-heading" tabIndex={-1}><span className="hero-line thin-display">Da operação</span><span className="hero-line hero-line-strong">à interface<span className="hero-period">.</span></span></h1>
        </div>
        <div className="hero-emblem"><img src="/hero/agent-layers-1280.webp" srcSet="/hero/agent-layers-640.webp 640w, /hero/agent-layers-1280.webp 1280w" sizes="(max-width: 799px) 248px, (max-width: 1100px) 44vw, 558px" alt="Camadas interligadas de agentes, em azul petróleo e aqua, com conexões verdes." width="1280" height="720" fetchPriority="high" decoding="async" /></div>
      </div>
      <div className="hero-context"><ul className="hero-specialty" aria-label="Competências">{specialties.map(({ label, Icon }) => <li key={label}><Icon size={17} aria-hidden="true" /><span>{label}</span></li>)}</ul><div>
        <p className="hero-description">Construo ferramentas com a visão de quem já esteve na linha de frente. Aproximo processos, dados e desenvolvimento para resolver necessidades de quem usa.</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">Explore o trabalho <ArrowDown size={18} aria-hidden="true" /></a><a className="text-link" href={profile.linkedin} target="_blank" aria-describedby="new-tab-hint" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" />LinkedIn <ArrowUpRight size={17} aria-hidden="true" /></a></div>
        <button type="button" className="motion-toggle text-link" onClick={() => setMotionPaused(value => !value)} aria-label={motionPaused ? 'Retomar animação dos cometas' : 'Pausar animação dos cometas'}>{motionPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}{motionPaused ? 'Retomar animação' : 'Pausar animação'}</button>
      </div></div>
    </div>
  </section>;
}
