'use client';

import { ActionIcon, Divider } from '@mantine/core';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

import Logo from '@/app/icon.png';
import menu from '@/constants/menu';

import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const icon = !expanded ? (
    <FaChevronCircleRight fontSize="28px" />
  ) : (
    <FaChevronCircleLeft fontSize="28px" />
  );

  return (
    <aside
      className={clsx(
        'hidden lg:block relative h-dvh px-5 py-8 shadow-md dark:shadow-gray-700 bg-zinc-100 dark:bg-gray-900 transition-all',
        expanded && 'w-[300px]',
        !expanded && 'w-[60px]',
      )}
    >
      <div className="absolute top-1/2 -right-[10px] -translate-y-1/2">
        <ActionIcon
          variant="transparent"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {icon}
        </ActionIcon>
      </div>
      <Link href="/dashboard" className="flex justify-center items-center">
        <Image
          src={Logo}
          alt="logo"
          width={expanded ? 200 : 20}
          height={expanded ? 200 : 20}
          priority
        />
      </Link>
      <Divider my="xl" />
      <nav>
        <ul className="space-y-6">
          {menu.map((props) => (
            <SidebarItem key={props.href} {...props} expanded={expanded} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
