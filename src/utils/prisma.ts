import prisma from '@/lib/prisma/db';
import type { UserData } from '@/types/user';

export const createUser = async (data: UserData) => {
  try {
    const user = await prisma.user.create({
      data,
    });

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const checkIfUserExists = async (data: { email: string }) => {
  try {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    return { userAlreadyExists, error: null };
  } catch (error) {
    return { userAlreadyExists: null, error };
  }
};

export const getUserByAuthId = async (data: { authId: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        authId: data.authId,
      },
    });

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};
