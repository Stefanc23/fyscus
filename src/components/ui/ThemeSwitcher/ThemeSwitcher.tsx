'use client';

import {
  ActionIcon,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import cx from 'clsx';
import { TbMoonStars, TbSun } from 'react-icons/tb';

import classes from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const theme = useMantineTheme();
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const computedColorScheme = useComputedColorScheme('dark', {
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="transparent"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <TbSun
        className={cx(classes.light)}
        style={{ width: rem(22), height: rem(22) }}
        color={theme.colors.yellow[4]}
      />
      <TbMoonStars
        className={cx(classes.dark)}
        style={{ width: rem(22), height: rem(22) }}
        color={theme.colors.blue[6]}
      />
    </ActionIcon>
  );
};

export default ThemeSwitcher;
