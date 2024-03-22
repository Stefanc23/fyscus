import { NextRequest, NextResponse } from 'next/server';

import { getUserByAuthId } from '@/utils/prisma';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const authId = searchParams.get('authId') ?? '';

    const { user, error: prismaError } = await getUserByAuthId({ authId });

    if (prismaError || !user) {
      return NextResponse.json({ error: prismaError }, { status: 500 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};