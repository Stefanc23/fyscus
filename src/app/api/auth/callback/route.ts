import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { checkIfUserExists, createUser } from '@/utils/prisma';

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      },
    );
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // check if user already exists
      const email = data.user.email as string;
      const { userAlreadyExists, error: checkError } = await checkIfUserExists({
        email,
      });
      if (checkError) {
        return NextResponse.json({ error: checkError }, { status: 500 });
      }
      if (!userAlreadyExists) {
        // create user profile data if it doesn't exist yet
        const authId = data.user.id as string;
        const name = data.user.user_metadata.name;
        const { error: prismaError } = await createUser({
          name,
          email,
          authId,
        });

        if (prismaError) {
          return NextResponse.json({ error: prismaError }, { status: 500 });
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login`);
};
