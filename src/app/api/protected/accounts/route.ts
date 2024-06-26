import { type NextRequest, NextResponse } from 'next/server';

import { accountSchema } from '@/lib/zod/validations';
import { createAccount, getAccounts } from '@/models/Account';

export const GET = async (request: NextRequest) => {
  try {
    const userId = request.headers.get('Fyscus-User-Id') ?? '';

    const { accounts, error: queryError } = await getAccounts(userId);
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
