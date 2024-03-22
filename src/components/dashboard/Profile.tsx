import { Avatar, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { FaUserSecret } from 'react-icons/fa';

type ProfileProps = {
  name: string;
  image?: string;
};

const Profile = ({ name, image }: ProfileProps) => {
  return (
    <Link href="/dashboard/profile">
      <Group gap="xs">
        <Text size="sm" className="hidden md:block">
          Hi, {name.split(' ')[0]}!
        </Text>
        <Avatar>{!image && <FaUserSecret size="1.5rem" />}</Avatar>
      </Group>
    </Link>
  );
};

export default Profile;
