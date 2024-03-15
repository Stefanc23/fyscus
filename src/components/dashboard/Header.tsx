import { Anchor, Group } from '@mantine/core';

import ThemeSwitcher from '@/components/ui/ThemeSwitcher/ThemeSwitcher';

import Breadcrumbs from './Breadcrumbs';
import Profile from './Profile';

const items = [
  { title: 'Mantine', href: '#' },
  { title: 'Mantine hooks', href: '#' },
  { title: 'use-id', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const Header = () => {
  return (
    <header className="h-14 px-8 flex justify-between items-center">
      <Breadcrumbs />
      <Group gap="xs">
        <ThemeSwitcher />
        <Profile />
      </Group>
    </header>
  );
};

export default Header;
