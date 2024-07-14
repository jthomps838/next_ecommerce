import { ReactNode } from 'react';

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className='bg-primary text-pirmary-foreground flex justify-center px-4'>
      {children}
    </nav>
  );
}
