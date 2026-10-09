import { ArrowUpRight } from 'lucide-react';
import { publications } from '../data/portfolio';

export function Approach() {
  return <section id="writing" className="section writing-section" aria-labelledby="writing-heading"><div className="shell">
    <div className="section-heading"><div><p className="eyebrow">Publicações / Ideias em prática</p><h2 id="writing-heading" className="thin-display">Além da interface.</h2></div><p>O que escrevo sobre tecnologia, pessoas e a transformação dos processos.</p></div>
    <div className="publication-list">{publications.map((publication, index) => <a className="publication" href={publication.href} target="_blank" rel="noopener noreferrer" key={publication.href}><span className="publication-number">0{index + 1}</span><div><p className="eyebrow">{publication.category}</p><h3>{publication.title}</h3><p>{publication.description}</p></div><ArrowUpRight size={25} aria-hidden="true" /></a>)}</div>
  </div></section>;
}
