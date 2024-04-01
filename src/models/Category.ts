import prisma from '@/lib/prisma/db';

export type CategoryData = {
  id?: string;
  name: string;
  type: 'EXPENSE' | 'INCOME';
  icon?: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
};

export const getCategories = async (userId: string) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        userId,
      },
    });

    return { categories };
  } catch (error) {
    return { error };
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return { category };
  } catch (error) {
    return { error };
  }
};

export const createCategory = async (data: CategoryData) => {
  try {
    const category = await prisma.category.create({
      data,
    });

    return { category };
  } catch (error) {
    return { error };
  }
};

export const updateCategory = async (id: string, data: CategoryData) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data,
    });

    return { updatedCategory };
  } catch (error) {
    return { error };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id,
      },
    });

    return { deletedCategory };
  } catch (error) {
    return { error };
  }
};
