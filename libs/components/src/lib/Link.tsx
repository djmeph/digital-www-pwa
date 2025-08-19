'use client';
import { useTopNavContext } from '@digital-www-pwa/providers';
import { useRouter } from 'next/navigation';

interface LinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export function Link({ to, className, children }: LinkProps) {
  const router = useRouter();
  const { setExpanded } = useTopNavContext();
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        setExpanded(false);
        return router.push(to);
      }}
    >
      {children}
    </a>
  );
}
