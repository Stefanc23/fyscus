import { type NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { registerSchema } from '@/lib/zod/validations';
import { createUser, getUserByEmail } from '@/utils/prisma';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    // validate form data
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 },
      );
    }

    const { name, email, password } = body;

    // check if user already exists
    const { user: existingUser, error: checkError } =
      await getUserByEmail(email);
    if (checkError) {
      return NextResponse.json({ error: checkError }, { status: 500 });
    }
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 },
      );
    }

    // sign up user
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          full_name: name,
        },
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    // create user profile
    const authId = data.user?.id as string;
    const { user, error: prismaError } = await createUser({
      id: authId,
      name,
      email,
    });

    if (prismaError) {
      return NextResponse.json({ error: prismaError }, { status: 500 });
    }

    return NextResponse.json({ user, session: data.session });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
