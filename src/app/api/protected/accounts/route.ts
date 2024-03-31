import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { accountSchema } from '@/lib/zod/validations';
import { createAccount, getAccounts, getUserById } from '@/utils/prisma';
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

    const { user, error: checkError } = await getUserById(authId);
    if (checkError) {
      return NextResponse.json({ error: checkError }, { status: 500 });
    }
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { accounts, error: queryError } = await getAccounts(user.id);
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

    const { user, error: checkError } = await getUserById(userId);
    if (checkError) {
      return NextResponse.json({ error: checkError }, { status: 500 });
    }
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { successful, error: verificationError } = await verifyUserId(
      user.id,
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
