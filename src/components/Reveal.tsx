import type { ReactNode } from 'react';

export function Reveal({ children, width = '100%' }: { children: ReactNode; width?: 'fit-content' | '100%' }) {
  return (
    <div style={{ width }}>
      {children}
    </div>
  );
}
