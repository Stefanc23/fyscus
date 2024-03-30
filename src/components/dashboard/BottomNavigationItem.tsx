'use client';

import { Stack, Text } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type BottomNavigationItemProps = {
  icon: any;
  label: string;
  href: string;
};

const BottomNavigationItem: React.FC<BottomNavigationItemProps> = ({
  icon,
  label,
  href,
}) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <li
      className={clsx(
        'w-full py-3 border-t',
        active && 'text-primary-900 dark:text-primary-300',
      )}
    >
      <Link href={href}>
        <Stack align="center" gap="xs">
          {icon}
          <Text size="8px">{label}</Text>
        </Stack>
      </Link>
    </li>
  );
};

export default BottomNavigationItem;
