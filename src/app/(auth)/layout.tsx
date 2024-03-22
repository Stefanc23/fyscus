import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!error && data.user) redirect('/dashboard');

  return (
    <main className="w-full h-dvh flex justify-center items-center">
      {children}
    </main>
  );
};

export default AuthLayout;
