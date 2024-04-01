import { type NextRequest, NextResponse } from 'next/server';

import { categorySchema } from '@/lib/zod/validations';
import { createCategory, getCategories } from '@/models/Category';

export const GET = async (request: NextRequest) => {
  try {
    const userId = request.headers.get('Fyscus-User-Id') ?? '';

    const { categories, error: queryError } = await getCategories(userId);
    if (queryError) {
      return NextResponse.json({ error: queryError }, { status: 500 });
    }

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const validation = categorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 },
      );
    }

    const { name, type, icon, userId } = body;

    if (userId !== request.headers.get('Fyscus-User-Id') ?? '') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { category, error } = await createCategory({
      name,
      type,
      icon,
      userId,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
