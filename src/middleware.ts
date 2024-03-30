import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';
import { createClient } from '@/lib/supabase/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/protected')) {
    const authorizationHeader = request.headers.get('Authorization') ?? null;
    if (!authorizationHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [_, token] = authorizationHeader.split(' ');
    const supabase = createClient();

    const { error } = await supabase.auth.getUser(token);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
