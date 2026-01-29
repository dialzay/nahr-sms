'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/map', label: 'Crisis Map' },
  { href: '/hospitals', label: 'Hospitals' },
  { href: '/sms-dashboard', label: 'SMS Dashboard' },
  { href: '/delivery-schedule', label: 'Delivery Schedule' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === link.href ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
