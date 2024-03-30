import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { accountSchema } from '@/lib/zod/validations';
import {
  createAccount,
  getAccounts,
  getUserByAuthId,
  getUserById,
} from '@/utils/prisma';
import { verifyUserId } from '@/utils/supabase';

export const GET = async (request: NextRequest) => {
  try {
    const accessToken =
      request.headers.get('Authorization')?.split(' ')[1] ?? '';

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    const authId = data.user.id;

    const { user, error: prismaError } = await getUserByAuthId({
      authId,
    });
    if (prismaError || !user) {
      return NextResponse.json({ error: prismaError }, { status: 500 });
    }

    const { accounts, error: queryError } = await getAccounts({
      userId: user.id,
    });
    if (queryError) {
      return NextResponse.json({ error: queryError }, { status: 500 });
    }

    return NextResponse.json({ accounts });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const accessToken =
      request.headers.get('Authorization')?.split(' ')[1] ?? '';

    const validation = accountSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 },
      );
    }

    const { name, balance, userId } = body;

    const { user, error: prismaError } = await getUserById({
      id: userId,
    });
    if (prismaError || !user) {
      return NextResponse.json({ error: prismaError }, { status: 500 });
    }

    const { successful, error: verificationError } = await verifyUserId(
      user.authId,
      accessToken,
    );
    if (!successful || verificationError) {
      return NextResponse.json(
        { error: verificationError },
        { status: verificationError === 'Unauthorized' ? 401 : 500 },
      );
    }

    const { account, error } = await createAccount({
      name,
      balance: parseInt(balance),
      userId,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ account });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
