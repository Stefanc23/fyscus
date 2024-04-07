'use client';

import { ActionIcon, Button, Flex, Loader, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { MdDelete } from 'react-icons/md';

import { createClient } from '@/lib/supabase/client';
import { revalidateCache } from '@/utils/revalidateCache';

type DeleteButtonProps = {
  type: 'accounts' | 'categories' | 'transactions' | 'budgets' | 'investments';
  confirmationText: string;
  deleteUrl: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
  type,
  confirmationText,
  deleteUrl,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);

  const onClick = async () => {
    setIsLoading(true);

    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    const data = await response.json();

    if (data.deletedAccount) {
      close();
      revalidateCache('accounts');
    }

    setIsLoading(false);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Confirm" centered>
        <Text>{ReactHtmlParser(confirmationText)}</Text>
        <Flex justify="end" mt="lg" gap="sm">
          <Button radius="md" bg="red" onClick={close}>
            Cancel
          </Button>
          <Button
            radius="md"
            w="120"
            onClick={onClick}
            rightSection={isLoading && <Loader size="xs" />}
            disabled={isLoading}
          >
            Confirm
          </Button>
        </Flex>
      </Modal>
      <ActionIcon bg="red" onClick={open} disabled={opened}>
        <MdDelete />
      </ActionIcon>
    </>
  );
};

export default DeleteButton;
