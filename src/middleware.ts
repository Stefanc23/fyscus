import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';
import { createClient } from '@/lib/supabase/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/protected')) {
    const headers = new Headers(request.headers);
    const authorizationHeader = headers.get('Authorization') ?? null;
    if (!authorizationHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [tokenType, accessToken] = authorizationHeader.split(' ');

    if (tokenType !== 'Bearer') {
      return NextResponse.json(
        { error: 'Invalid authorization header' },
        { status: 400 },
      );
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    headers.set('Fyscus-User-Id', data.user.id);
    headers.delete('Authorization');

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
