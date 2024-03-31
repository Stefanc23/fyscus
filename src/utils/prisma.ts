import prisma from '@/lib/prisma/db';
import type { AccountData } from '@/types/account';
import type { UserData } from '@/types/user';

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

export const getAccounts = async (userId: string) => {
  try {
    const accounts = await prisma.account.findMany({
      where: {
        userId,
      },
    });

    return { accounts };
  } catch (error) {
    return { error };
  }
};

export const createAccount = async (data: AccountData) => {
  try {
    const { name, balance, userId } = data;

    const account = await prisma.account.create({
      data: {
        name,
        balance,
        userId,
      },
    });

    return { account };
  } catch (error) {
    return { error };
  }
};
