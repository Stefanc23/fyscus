import { Text, Title } from '@mantine/core';

import ThemeSwitcher from '@/components/ui/ThemeSwitcher/ThemeSwitcher';

const Home = () => {
  return (
    <main className="w-full h-dvh flex flex-col justify-center items-center gap-3">
      <Text>Coming Soon</Text>
      <Title order={1} c="deep-sapphire">
        Fyscus: Finance Management App
      </Title>
      <ThemeSwitcher />
    </main>
  );
};

export default Home;
