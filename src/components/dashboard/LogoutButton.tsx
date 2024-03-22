'use client';

import { Button, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { createClient } from '@/lib/supabase/client';

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();
  const route = useRouter();

  const logout = async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.signOut();

    setIsLoading(false);

    if (!error) route.replace('/');
  };

  return (
    <Button
      onClick={logout}
      radius="md"
      w="120"
      rightSection={isLoading && <Loader size="xs" />}
      disabled={isLoading}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
