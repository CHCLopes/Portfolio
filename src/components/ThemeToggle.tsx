import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';
function readPreference(): Theme | null {
  try { const value = localStorage.getItem('carlos-portfolio-theme'); return value === 'dark' || value === 'light' ? value : null; }
  catch { return null; }
}
export function ThemeToggle() {
  const [preference, setPreference] = useState<Theme | null>(readPreference);
  const theme = preference ?? 'light';
  useEffect(() => {
    const syncTabs = (event: StorageEvent) => { if (event.key === 'carlos-portfolio-theme' || event.key === null) setPreference(readPreference()); };
    window.addEventListener('storage', syncTabs);
    return () => window.removeEventListener('storage', syncTabs);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b2226' : '#f7f8f2');
  }, [theme]);
  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'; setPreference(next);
    try { localStorage.setItem('carlos-portfolio-theme', next); } catch { /* The switch still works without persistent storage. */ }
  }
  return <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Modo escuro" aria-pressed={theme === 'dark'} title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}>{theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}<span>{theme === 'dark' ? 'Claro' : 'Escuro'}</span></button>;
}
