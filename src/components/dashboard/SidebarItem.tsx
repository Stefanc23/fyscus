'use client';

import { Text } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarItemProps = {
  label: string;
  href: string;
};

const SidebarItem = ({ label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'transition-colors',
          active && 'text-primary-900 dark:text-primary-300',
          !active &&
            'text-gray-900 dark:text-gray-100 hover:text-primary-300 dark:hover:text-primary-300',
        )}
      >
        <Text></Text>
        {label}
      </Link>
    </li>
  );
};

export default SidebarItem;
