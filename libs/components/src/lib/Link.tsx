'use client';
import { useTopNavContext } from '@digital-www-pwa/providers';
import { useNavigate } from 'react-router';

interface LinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export function Link({ to, className, children }: LinkProps) {
  const navigate = useNavigate();
  const { setExpanded } = useTopNavContext();
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        setExpanded(false);
        return navigate(to);
      }}
    >
      {children}
    </a>
  );
}
