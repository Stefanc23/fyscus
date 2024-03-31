import { Flex } from '@mantine/core';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import BottomNavigation from '@/components/dashboard/BottomNavigation/BottomNavigation';
import Header from '@/components/dashboard/Header/Header';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Dashboard | Fyscus',
};

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) redirect('/login');

  return (
    <Flex>
      <Sidebar />
      <div className="w-full h-dvh relative flex flex-col">
        <Header />
        <main className="p-8 flex-1">{children}</main>
        <BottomNavigation />
      </div>
    </Flex>
  );
};

export default DashboardLayout;
