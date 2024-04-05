import { Group } from '@mantine/core';

import Profile from '@/components/dashboard/Header/Profile';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher/ThemeSwitcher';
import { fetchUserData } from '@/utils/fetchData';

const Header = async () => {
  const {
    user: { name, image },
  } = await fetchUserData();

  return (
    <header className="h-14 px-8 flex justify-end items-center">
      <Group gap="xs">
        <ThemeSwitcher />
        <Profile name={name} image={image} />
      </Group>
    </header>
  );
};

export default Header;
