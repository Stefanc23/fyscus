import { Divider } from '@mantine/core';
import Link from 'next/link';

import SidebarItem from './SidebarItem';

const menu = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'My Accounts', href: '/dashboard/accounts' },
  { label: 'Categories', href: '/dashboard/categories' },
  { label: 'Transactions', href: '/dashboard/transactions' },
  { label: 'Budget', href: '/dashboard/budgets' },
  { label: 'My Portfolio', href: '/dashboard/investments' },
];

const Sidebar = () => {
  return (
    <aside className="p-8 w-[300px] h-dvh shadow-md dark:shadow-gray-700 bg-zinc-100 dark:bg-gray-900">
      <Link href="/dashboard" className="flex justify-center items-center">
        <p className="text-4xl text-primary-900 dark:text-primary-300">
          Fyscus
        </p>
      </Link>
      <Divider my="xl" />
      <nav className="mt-16">
        <ul className="space-y-6">
          {menu.map((props) => (
            <SidebarItem key={props.href} {...props} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
