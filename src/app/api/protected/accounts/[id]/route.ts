import { type NextRequest, NextResponse } from 'next/server';

import { accountSchema } from '@/lib/zod/validations';
import { deleteAccount, getAccountById, updateAccount } from '@/models/Account';
import { getUserById } from '@/models/User';

export const GET = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  try {
    const accountId = context.params.id;
    const userId = request.headers.get('Fyscus-User-Id') ?? '';

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

    const validation = accountSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 },
      );
    }

    const { name, balance, userId } = body;

    if (userId !== request.headers.get('Fyscus-User-Id') ?? '') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { account, error: queryError } = await getAccountById(accountId);
    if (queryError) {
      return NextResponse.json({ error: queryError }, { status: 500 });
    }
    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    if (userId !== account.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
      return NextResponse.json({ error: updateError }, { status: 500 });
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
    const userId = request.headers.get('Fyscus-User-Id') ?? '';

    const { account, error: queryError } = await getAccountById(accountId);
    if (queryError) {
      return NextResponse.json({ error: queryError }, { status: 500 });
    }
    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    if (userId !== account.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deletedAccount, error: deleteError } =
      await deleteAccount(accountId);

    if (deleteError) {
      return NextResponse.json({ error: deleteError }, { status: 500 });
    }

    return NextResponse.json({ deletedAccount });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
