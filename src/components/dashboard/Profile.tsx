'use client';

import {
  Avatar,
  Group,
  Loader,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaUserSecret } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { SlLogout } from 'react-icons/sl';

import { createClient } from '@/lib/supabase/client';

type ProfileProps = {
  name: string;
  image?: string;
};

const Profile = ({ name, image }: ProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const route = useRouter();

  const logout = async () => {
    setIsLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    setIsLoading(false);

    if (!error) route.replace('/');
  };

  const firstName = name.split(' ')[0];
  const lastName = name.split(' ')[name.split(' ').length - 1];

  return (
    <Menu shadow="md" width="150px">
      <Menu.Target>
        <UnstyledButton>
          <Group gap="xs">
            <Text size="sm" className="hidden md:block">
              Hi, {lastName ? `${firstName} ${lastName}` : firstName}!
            </Text>
            <Avatar>{!image && <FaUserSecret size="1.5rem" />}</Avatar>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<FaGear fontSize={18} />}>Settings</Menu.Item>
        <Menu.Item
          c="red"
          leftSection={<SlLogout fontSize={18} />}
          rightSection={isLoading && <Loader size="xs" />}
          onClick={logout}
          disabled={isLoading}
        >
          <Group gap="xs">Logout</Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Profile;
