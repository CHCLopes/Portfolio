import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { label: 'Sobre mim', href: '#about' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Trajetória', href: '#trajectory' },
  { label: 'Publicações', href: '#writing' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  function navigate(href: string) {
    setOpen(false);
    // Closing the mobile menu must not leave keyboard focus on a hidden link.
    // Run after the native anchor navigation, which would otherwise reset this focus.
    requestAnimationFrame(() => document.querySelector<HTMLElement>(href)?.querySelector<HTMLElement>('h1, h2')?.focus({ preventScroll: true }));
  }

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1000px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', closeWithEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeWithEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell nav-inner">
        <a className="brand" href="#home" title="Ir para o início" onClick={() => navigate('#home')}>
          <span className="brand-mark" aria-hidden="true">cl<span>.</span></span>
          <span>Carlos Lopes<span className="brand-caption">Desenvolvimento & Gestão</span></span>
        </a>
        <button ref={menuButton} className="menu-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <nav id="primary-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Navegação principal">
          {links.map(link => <a key={link.href} href={link.href} onClick={() => navigate(link.href)}>{link.label}</a>)}
          <a className="nav-contact" href="#contact" onClick={() => navigate('#contact')}>Vamos conversar <ArrowUpRight size={16} aria-hidden="true" /></a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
