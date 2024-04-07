import { ActionIcon, Button, Flex, Paper, Text, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { MdAdd, MdModeEdit } from 'react-icons/md';

import Datatable from '@/components/dashboard/Datatable/Datatable';
import DeleteButton from '@/components/dashboard/DeleteButton/DeleteButton';
import { AccountData } from '@/models/Account';
import { fetchAccountData } from '@/utils/fetchData';
import { formatCurrency } from '@/utils/formatCurrency';

const Account = async () => {
  const { accounts } = await fetchAccountData();

  const data = accounts.map(({ id, name, balance }: AccountData) => {
    const editUrl = '/dashboard/accounts/' + id + '/edit';
    const deleteUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/protected/accounts/${id}`;

    const actions = (
      <Flex gap="xs">
        <Tooltip label="Edit Account" position="bottom">
          <ActionIcon component={Link} href={editUrl}>
            <MdModeEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete Account" position="bottom">
          <DeleteButton
            type="accounts"
            confirmationText={`Are you sure you want to delete <b>${name}</b> account?`}
            deleteUrl={deleteUrl}
          />
        </Tooltip>
      </Flex>
    );

    return {
      id,
      name,
      balance: formatCurrency(balance),
      actions,
    };
  });

  const totalBalance = accounts
    .map(({ balance }: AccountData) => balance)
    .reduce((acc: number, balance: number) => acc + +balance, 0);

  return (
    <Paper radius="md" p="xl" withBorder>
      <Flex justify="space-between">
        <Text c="deep-sapphire" size="xl" mb="xl">
          Total: {formatCurrency(totalBalance)}
        </Text>
        <Button
          component={Link}
          href="/dashboard/accounts/create"
          w="fit-content"
        >
          <Flex gap="xs">
            <span className="hidden md:block">Add New Account</span> <MdAdd />
          </Flex>
        </Button>
      </Flex>
      <Datatable data={data} />
    </Paper>
  );
};

export default Account;
