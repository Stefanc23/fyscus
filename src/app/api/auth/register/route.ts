import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { registerSchema } from '@/lib/zod/validations';
import { checkIfUserExists, createUser } from '@/utils/prisma';

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
    const { userAlreadyExists, error: checkError } = await checkIfUserExists({
      email,
    });
    if (checkError) {
      return NextResponse.json({ error: checkError }, { status: 500 });
    }
    if (userAlreadyExists) {
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // create user profile
    const authId = data.user?.id as string;
    const { user, error: prismaError } = await createUser({
      name,
      email,
      authId,
    });

    if (prismaError) {
      return NextResponse.json({ error: prismaError }, { status: 500 });
    }

    return NextResponse.json({ user, session: data.session });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
