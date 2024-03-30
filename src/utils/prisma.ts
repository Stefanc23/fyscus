import prisma from '@/lib/prisma/db';
import type { AccountData } from '@/types/account';
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

export const getUserById = async (data: { id: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!user) {
      return { user: null, error: 'User not found' };
    }

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const getUserByAuthId = async (data: { authId: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        authId: data.authId,
      },
    });

    if (!user) {
      return { user: null, error: 'User not found' };
    }

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const getAccounts = async (data: { userId: string }) => {
  try {
    const accounts = await prisma.account.findMany({
      where: {
        userId: data.userId,
      },
    });

    return { accounts, error: null };
  } catch (error) {
    return { accounts: null, error };
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

    return { account, error: null };
  } catch (error) {
    return { account: null, error };
  }
};
