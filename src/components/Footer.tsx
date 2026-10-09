import { ArrowUp } from 'lucide-react';
import { profile } from '../data/portfolio';

export function Footer() {
  return <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} {profile.name}</span><span>Feito com intenção, React e TypeScript.</span><a href="#home">Voltar ao início <ArrowUp size={15} aria-hidden="true" /></a></div></footer>;
}
