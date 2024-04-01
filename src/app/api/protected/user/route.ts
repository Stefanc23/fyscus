import { type NextRequest, NextResponse } from 'next/server';

import { getUserById } from '@/models/User';

export const GET = async (request: NextRequest) => {
  try {
    const userId = request.headers.get('Fyscus-User-Id') ?? '';

    const { user, error: prismaError } = await getUserById(userId);
    if (!user || prismaError) {
      return NextResponse.json({ error: prismaError }, { status: 500 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
