import { type NextRequest, NextResponse } from 'next/server';

import { categorySchema } from '@/lib/zod/validations';
import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from '@/models/Category';
import { getUserById } from '@/models/User';

export const GET = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  try {
    const categoryId = context.params.id;
    const userId = request.headers.get('Fyscus-User-Id') ?? '';

    const { user, error: checkError } = await getUserById(userId);
    if (checkError) {
      return NextResponse.json({ error: checkError }, { status: 500 });
    }
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { category, error: queryError } = await getCategoryById(categoryId);
    if (queryError) {
      return NextResponse.json({ error: queryError }, { status: 500 });
    }
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 },
      );
    }

    if (user.id !== category.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PUT = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  try {
    const categoryId = context.params.id;
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

    const { category, error: queryError } = await getCategoryById(categoryId);
    if (queryError) {
      return NextResponse.json({ error: queryError }, { status: 500 });
    }
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 },
      );
    }

    if (userId !== category.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { updatedCategory, error: updateError } = await updateCategory(
      categoryId,
      {
        name,
        type,
        icon,
        userId,
      },
    );

    if (updateError) {
      return NextResponse.json({ updateError }, { status: 500 });
    }

    return NextResponse.json({ updatedCategory });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  try {
    const categoryId = context.params.id;
    const userId = request.headers.get('Fyscus-User-Id') ?? '';

    const { category, error: queryError } = await getCategoryById(categoryId);
    if (queryError) {
      return NextResponse.json({ error: queryError }, { status: 500 });
    }
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 },
      );
    }

    if (userId !== category.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deletedCategory, error: deleteError } =
      await deleteCategory(categoryId);

    if (deleteError) {
      return NextResponse.json({ deleteError }, { status: 500 });
    }

    return NextResponse.json({ deletedCategory });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
