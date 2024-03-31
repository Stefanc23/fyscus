import { createClient } from '@/lib/supabase/server';

export const getUserByAccessToken = async (accessToken: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser(accessToken);

    return { data, error };
  } catch (error) {
    return { error: { message: 'Something went wrong', status: 500 } };
  }
};

export const verifyUserId = async (userId: string, accessToken: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error) {
      return { successful: false, error: error.message };
    }

    const { user } = data;

    if (user.id !== userId) {
      return { successful: false, error: 'Unauthorized' };
    }

    return { successful: true };
  } catch (error) {
    return { successful: false, error };
  }
};
