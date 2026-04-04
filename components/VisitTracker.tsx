'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitTracker() {
  const pathname = usePathname();
  const lastTracked = useRef('');

  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pathname,
        referrer: document.referrer || '',
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}