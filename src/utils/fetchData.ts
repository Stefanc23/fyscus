import { createClient } from '@/lib/supabase/server';

export const fetchUserData = async () => {
  try {
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/protected/user`,
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
        next: {
          tags: ['user'],
        },
      },
    );

    const data = await response.json();

    const user = data.user;

    return { user };
  } catch (error) {
    return { error };
  }
};

export const fetchAccountData = async () => {
  try {
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/protected/accounts`,
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
        next: {
          tags: ['account'],
        },
      },
    );

    const data = await response.json();

    const accounts = data.accounts;

    return { accounts };
  } catch (error) {
    return { error };
  }
};

export const fetchOneAccountData = async (id: string) => {
  try {
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/protected/accounts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
        next: {
          tags: [id],
        },
      },
    );

    const data = await response.json();

    const account = data.account;

    return { account };
  } catch (error) {
    return { error };
  }
};
