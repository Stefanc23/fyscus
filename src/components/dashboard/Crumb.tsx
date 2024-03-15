import { Anchor, Text } from '@mantine/core';
import Link from 'next/link';

type CrumbProps = {
  text: string;
  href: string;
  last: boolean;
};

const Crumb = ({ text, href, last = false }: CrumbProps) => {
  if (last) {
    return <Text c="deep-sapphire.3">{text}</Text>;
  }

  return (
    <Anchor component={Link} href={href}>
      {text}
    </Anchor>
  );
};

export default Crumb;
