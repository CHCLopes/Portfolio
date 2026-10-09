import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';

export function Contact() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  useEffect(() => {
    if (copyStatus === 'idle') return;
    const timeout = window.setTimeout(() => setCopyStatus('idle'), 4500);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopyStatus('copied'); }
    catch { setCopyStatus('error'); }
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="shell contact-layout"><div><p className="eyebrow">Contato / Vamos conversar</p><h2 id="contact-heading" className="thin-display">O próximo<br /><span>desafio.</span></h2><p>Vamos conversar sobre uma oportunidade em front-end, Power Apps ou um produto que precise aproximar tecnologia e operação.</p><a className="button button-aqua" href={'mailto:' + profile.email}><Mail size={19} aria-hidden="true" /> Escreva para mim <ArrowUpRight size={18} aria-hidden="true" /></a></div>
        <div className="contact-links"><div className="email-row"><span>E-MAIL</span><a href={'mailto:' + profile.email}>{profile.email}</a><button type="button" className="copy-email" onClick={copyEmail} aria-label={copyStatus === 'copied' ? 'E-mail copiado' : 'Copiar endereço de e-mail'}>{copyStatus === 'copied' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}</button><p className="copy-feedback" role="status">{copyStatus === 'copied' ? 'E-mail copiado.' : copyStatus === 'error' ? 'Não foi possível copiar. Selecione o endereço ou use o link de e-mail.' : ''}</p></div><a className="contact-social" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={22} aria-hidden="true" /><span>LinkedIn<small>Trajetória e conexões profissionais</small></span><ArrowUpRight size={20} aria-hidden="true" /></a><a className="contact-social" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={22} aria-hidden="true" /><span>GitHub<small>Código, projetos e experimentos</small></span><ArrowUpRight size={20} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
