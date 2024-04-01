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

export const getAccountById = async (id: string) => {
  try {
    const account = await prisma.account.findUnique({
      where: {
        id,
      },
    });

    return { account };
  } catch (error) {
    return { error };
  }
};

export const createAccount = async (data: AccountData) => {
  try {
    const account = await prisma.account.create({
      data,
    });

    return { account };
  } catch (error) {
    return { error };
  }
};

export const updateAccount = async (id: string, data: AccountData) => {
  try {
    const updatedAccount = await prisma.account.update({
      where: {
        id,
      },
      data,
    });

    return { updatedAccount };
  } catch (error) {
    return { error };
  }
};

export const deleteAccount = async (id: string) => {
  try {
    const deletedAccount = await prisma.account.delete({
      where: {
        id,
      },
    });

    return { deletedAccount };
  } catch (error) {
    return { error };
  }
};
