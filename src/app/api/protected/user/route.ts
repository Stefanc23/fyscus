import { type NextRequest, NextResponse } from 'next/server';

import { getUserById } from '@/utils/prisma';
import { getUserByAccessToken } from '@/utils/supabase';

export const GET = async (request: NextRequest) => {
  try {
    const accessToken =
      request.headers.get('Authorization')?.split(' ')[1] ?? '';

    const { data, error: supabaseError } =
      await getUserByAccessToken(accessToken);

    if (!data?.user || supabaseError) {
      return NextResponse.json(
        { error: supabaseError?.message },
        { status: supabaseError?.status },
      );
    }

    const { user, error: prismaError } = await getUserById(data.user.id);
    if (!user || prismaError) {
      return NextResponse.json({ error: prismaError }, { status: 500 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
