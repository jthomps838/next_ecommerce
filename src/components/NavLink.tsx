'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        'p-4 text-secondary hover:bg-secondary hover:text-primary focus-visible:bg-secondary focus-visible:text-primary',
        pathname === props.href && 'bg-background text-primary'
      )}
    />
  );
}
