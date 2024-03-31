'use client';

import { Breadcrumbs as MantineBreadcrumbs } from '@mantine/core';
import { usePathname } from 'next/navigation';

import Crumb from './Crumb';

const Breadcrumbs = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const nestedRoutes = pathname
      .split('/')
      .filter((v) => v.length && v !== 'dashboard');

    const crumblist = nestedRoutes.map((subpath, idx) => {
      const href = '/dashboard' + subpath.slice(0, idx + 1);
      const text = subpath.charAt(0).toUpperCase() + subpath.slice(1);

      return { href, text };
    });

    return [{ href: '/dashboard', text: 'Dashboard' }, ...crumblist];
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <MantineBreadcrumbs separator=">">
      {breadcrumbs.map((props, idx) => (
        <Crumb
          key={props.href}
          {...props}
          last={idx === breadcrumbs.length - 1}
        />
      ))}
    </MantineBreadcrumbs>
  );
};

export default Breadcrumbs;
