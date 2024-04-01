import { type NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { accountSchema } from '@/lib/zod/validations';
import {
  deleteAccount,
  getAccountById,
  getUserById,
  updateAccount,
} from '@/utils/prisma';
import { verifyUserId } from '@/utils/supabase';

export const GET = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  try {
    const accountId = context.params.id;
    const accessToken =
      request.headers.get('Authorization')?.split(' ')[1] ?? '';

    const supabase = createClient();
    const { data, error: accessTokenError } =
      await supabase.auth.getUser(accessToken);
    if (accessTokenError) {
      return NextResponse.json(
        { error: accessTokenError.message },
        { status: accessTokenError.status },
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

    const { account, error: queryError } = await getAccountById(accountId);
    if (queryError) {
      return NextResponse.json({ error: queryError }, { status: 500 });
    }
    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }
    if (user.id !== account.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ account });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PUT = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  try {
    const accountId = context.params.id;
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

    const { account, error: queryError } = await getAccountById(accountId);
    if (queryError) {
      return NextResponse.json({ error: queryError }, { status: 500 });
    }
    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    if (user.id !== account.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    const { updatedAccount, error: updateError } = await updateAccount(
      accountId,
      {
        name,
        balance: parseInt(balance),
        userId,
      },
    );

    if (updateError) {
      return NextResponse.json({ updateError }, { status: 500 });
    }

    return NextResponse.json({ updatedAccount });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  try {
    const accountId = context.params.id;
    const accessToken =
      request.headers.get('Authorization')?.split(' ')[1] ?? '';

    const supabase = createClient();
    const { data, error: accessTokenError } =
      await supabase.auth.getUser(accessToken);
    if (accessTokenError) {
      return NextResponse.json(
        { error: accessTokenError.message },
        { status: accessTokenError.status },
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

    const { account, error: queryError } = await getAccountById(accountId);
    if (queryError) {
      return NextResponse.json({ error: queryError }, { status: 500 });
    }
    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }
    if (user.id !== account.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    const { deletedAccount, error: deleteError } =
      await deleteAccount(accountId);

    if (deleteError) {
      return NextResponse.json({ deleteError }, { status: 500 });
    }

    return NextResponse.json({ deletedAccount });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
