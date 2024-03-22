import { Flex } from '@mantine/core';
import { redirect } from 'next/navigation';

import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { createClient } from '@/lib/supabase/server';

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
      <div className="w-full">
        <Header />
        <main className="p-8 h-dvh">{children}</main>
      </div>
    </Flex>
  );
};

export default DashboardLayout;
