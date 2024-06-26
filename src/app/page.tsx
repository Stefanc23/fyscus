import { Anchor, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';

import ThemeSwitcher from '@/components/ui/ThemeSwitcher/ThemeSwitcher';
import { createClient } from '@/lib/supabase/server';

const Home = async () => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <main className="w-full h-dvh flex flex-col justify-center items-center gap-3">
      <Text>Coming Soon</Text>
      <Title order={1} c="deep-sapphire" ta="center">
        Fyscus: Finance Management App
      </Title>
      <ThemeSwitcher />
      <Group mt="md" gap="xl">
        {data?.user ? (
          <Anchor component={Link} href="/dashboard">
            Dashboard
          </Anchor>
        ) : (
          <>
            <Anchor component={Link} href="/register">
              Register
            </Anchor>
            <Anchor component={Link} href="/login">
              Login
            </Anchor>
          </>
        )}
      </Group>
    </main>
  );
};

export default Home;
