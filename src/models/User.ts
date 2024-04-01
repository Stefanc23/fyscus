import prisma from '@/lib/prisma/db';

export type UserData = {
  id: string;
  name: string;
  email: string;
  image?: string;
  defaultCurrency?: 'IDR' | 'USD';
  createdAt?: string;
  updatedAt?: string;
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return { user };
  } catch (error) {
    return { error };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return { user };
  } catch (error) {
    return { error };
  }
};

export const createUser = async (data: UserData) => {
  try {
    const user = await prisma.user.create({
      data,
    });

    return { user };
  } catch (error) {
    return { error };
  }
};
