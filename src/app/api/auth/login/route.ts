import { type NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { loginSchema } from '@/lib/zod/validations';
import { getUserByEmail } from '@/utils/prisma';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    // validate form data
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 },
      );
    }

    const { email, password } = body;

    // check if user exists
    const { user, error: checkError } = await getUserByEmail(email);
    if (checkError) {
      return NextResponse.json({ error: checkError }, { status: 500 });
    }
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // sign in user
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    return NextResponse.json({ user, session: data.session });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
