'use client';

import { Text, Tooltip } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarItemProps = {
  icon: any;
  label: string;
  href: string;
  expanded: boolean;
};

const SidebarItem = ({ icon, label, href, expanded }: SidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <li>
      <Tooltip
        label={label}
        position="right"
        offset={{ mainAxis: 15, crossAxis: 0 }}
        disabled={expanded}
      >
        <Link
          href={href}
          className={clsx(
            'flex items-center space-x-4 transition-colors',
            active && 'text-primary-900 dark:text-primary-300',
            !active &&
              'text-gray-900 dark:text-gray-100 hover:text-primary-300 dark:hover:text-primary-300',
          )}
        >
          {icon}
          {expanded && <Text>{label}</Text>}
        </Link>
      </Tooltip>
    </li>
  );
};

export default SidebarItem;
