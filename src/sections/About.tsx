import { ArrowDown, ArrowUpRight } from 'lucide-react';

export function About() {
  return <section id="about" className="section about-section" aria-labelledby="about-heading"><div className="shell">
    <div className="about-layout"><div className="about-intro"><p className="eyebrow">Sobre mim / Desenvolvimento & Gestão</p><h2 id="about-heading" className="thin-display">Gestão que aproxima<br /><span>pessoas e tecnologia.</span></h2><p>Minha trajetória começou na gestão de operações e na educação corporativa. Nos Correios, liderei equipes, acompanhei indicadores e atuei na gestão da rede franqueada. Essa experiência orienta a forma como leio processos, organizo prioridades e conecto necessidades de negócio à tecnologia.</p><p>Hoje, desenvolvo interfaces em React e Power Apps e conduzo o trabalho de agentes de IA com requisitos, revisão técnica e responsabilidade pelas decisões. Também ajudo as equipes a compreender os dados e adotar as ferramentas com autonomia.</p><div className="about-links"><a className="text-link" href="#projects">Ver projetos <ArrowDown size={17} aria-hidden="true" /></a><a className="text-link" href="#trajectory">Conheça minha trajetória <ArrowUpRight size={17} aria-hidden="true" /></a></div></div>
      <figure className="profile-figure"><img src="/profile.jpg" alt="Carlos Lopes, de terno azul escuro e gravata." width="400" height="341" loading="lazy" decoding="async" /><figcaption><span>Carlos Lopes</span><span>Desenvolvimento & Gestão / Recife</span></figcaption></figure>
    </div>
  </div></section>;
}
