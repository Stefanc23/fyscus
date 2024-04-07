'use client';

import {
  Button,
  Flex,
  Loader,
  NumberInput,
  Paper,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaChevronCircleLeft } from 'react-icons/fa';

import ErrorMessage from '@/components/ui/ErrorMessage';
import { createClient } from '@/lib/supabase/client';
import { accountSchema } from '@/lib/zod/validations';
import { AccountData } from '@/models/Account';
import { revalidateCache } from '@/utils/revalidateCache';

type AccountFormProps = {
  account?: AccountData;
};

const AccountForm: React.FC<AccountFormProps> = ({ account }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: account ? account.name : '',
      balance: account ? account.balance : '',
      userId: account ? account.userId : '000000000000000000000000000000000000',
    },

    validate: zodResolver(accountSchema),
  });

  const onSubmit = form.onSubmit(async (values) => {
    if (
      account &&
      values.name === account.name &&
      values.balance === account.balance
    ) {
      router.replace('/dashboard/accounts');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const body = { ...values };

    const supabase = createClient();
    if (!account) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      body.userId = user!.id;
    }
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const url = account
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/protected/accounts/${account.id}`
      : `${process.env.NEXT_PUBLIC_SITE_URL}/api/protected/accounts`;

    const response = await fetch(url, {
      method: account ? 'PUT' : 'POST',
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    setIsSubmitting(false);

    if (data.error) {
      setError(
        typeof data.error === 'string'
          ? data.error
          : 'Oops! Something went wrong.',
      );
    } else {
      revalidateCache('accounts');
      router.replace('/dashboard/accounts');
    }
  });

  return (
    <Flex justify="center" align="center">
      <Stack gap="xl">
        <Button
          variant="transparent"
          leftSection={<FaChevronCircleLeft fontSize="28px" />}
          component={Link}
          href="/dashboard/accounts"
          w="fit-content"
        >
          Back
        </Button>
        {<ErrorMessage>{error}</ErrorMessage>}
        <Paper className="mx-auto max-w-3xl" radius="md" p="xl" withBorder>
          <form onSubmit={onSubmit}>
            <Stack align="end">
              <TextInput
                required
                label="Name"
                placeholder="Account name"
                value={form.values.name}
                onBlur={() => form.validateField('name')}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                error={form.errors.name}
                radius="md"
                w="360px"
              />
              <NumberInput
                required
                label="Balance"
                placeholder="Initial balance"
                value={form.values.balance}
                onBlur={() => form.validateField('balance')}
                onChange={(event) =>
                  form.setFieldValue('balance', event.toString())
                }
                error={form.errors.balance}
                radius="md"
                w="360px"
              />
              <Button
                type="submit"
                radius="md"
                w="120"
                rightSection={isSubmitting && <Loader size="xs" />}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Flex>
  );
};

export default AccountForm;
