import { createClient } from '@/lib/supabase/server';

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
