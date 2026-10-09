import { useState } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';
import { SiteProcessModal } from './SiteProcessModal';

export function Footer() {
  const [showProcess, setShowProcess] = useState(false);

  return <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} {profile.name}</span><button type="button" className="footer-process-button" aria-haspopup="dialog" onClick={() => setShowProcess(true)}>Saiba mais sobre este site. <ArrowUpRight size={15} aria-hidden="true" /></button><a href="#home">Voltar ao início <ArrowUp size={15} aria-hidden="true" /></a></div>{showProcess && <SiteProcessModal onDismiss={() => setShowProcess(false)} />}</footer>;
}
