import { Avatar, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { FaUserSecret } from 'react-icons/fa';

const Profile = () => {
  return (
    <Link href="/dashboard/profile">
      <Group gap="xs">
        <Text size="sm" className="hidden md:block">
          Anonymous User
        </Text>
        <Avatar>
          <FaUserSecret size="1.5rem" />
        </Avatar>
      </Group>
    </Link>
  );
};

export default Profile;
