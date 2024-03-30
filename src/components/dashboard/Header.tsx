import { Group } from '@mantine/core';

import Breadcrumbs from '@/components/dashboard/Breadcrumbs';
import Profile from '@/components/dashboard/Profile';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher/ThemeSwitcher';
import { createClient } from '@/lib/supabase/server';

const Header = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/user?authId=${encodeURIComponent(user?.id ?? '')}`,
  );

  const data = await response.json();
  const { name, image } = data.user;

  return (
    <header className="h-14 px-8 flex justify-between items-center">
      <Breadcrumbs />
      <Group gap="xs">
        <ThemeSwitcher />
        <Profile name={name} image={image} />
      </Group>
    </header>
  );
};

export default Header;
