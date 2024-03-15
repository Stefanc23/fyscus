import { Flex } from '@mantine/core';

import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Flex>
      <Sidebar />
      <div className="w-full">
        <Header />
        <main className="p-8 h-dvh">{children}</main>
      </div>
    </Flex>
  );
};

export default DashboardLayout;
