import prisma from '@/lib/prisma/db';

export type AccountData = {
  id?: string;
  name: string;
  balance: number;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
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
