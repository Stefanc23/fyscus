'use client';

import {
  Button,
  Flex,
  Loader,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaChevronCircleLeft } from 'react-icons/fa';
import IconPicker from 'react-icons-picker';

import ErrorMessage from '@/components/ui/ErrorMessage';
import { createClient } from '@/lib/supabase/client';
import { categorySchema } from '@/lib/zod/validations';
import { CategoryData, CategoryTypes } from '@/models/Category';
import { revalidateCache } from '@/utils/revalidateCache';

type CategoryFormProps = {
  category?: CategoryData;
};

const AccountForm: React.FC<CategoryFormProps> = ({ category }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: category ? category.name : '',
      type: category ? category.type : 'EXPENSE',
      icon: category ? category.icon : '',
      userId: category
        ? category.userId
        : '000000000000000000000000000000000000',
    },

    validate: zodResolver(categorySchema),
  });

  const onSubmit = form.onSubmit(async (values) => {
    if (
      category &&
      values.name === category.name &&
      values.type === category.type &&
      values.icon === category.icon
    ) {
      router.replace('/dashboard/categories');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const body = { ...values };

    const supabase = createClient();
    if (!category) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      body.userId = user!.id;
    }
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const url = category
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/protected/categories/${category.id}`
      : `${process.env.NEXT_PUBLIC_SITE_URL}/api/protected/categories`;

    const response = await fetch(url, {
      method: category ? 'PUT' : 'POST',
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
      revalidateCache('categories');
      router.replace('/dashboard/categories');
    }
  });

  return (
    <Flex justify="center" align="center">
      <Stack gap="xl">
        <Button
          variant="transparent"
          leftSection={<FaChevronCircleLeft fontSize="28px" />}
          component={Link}
          href="/dashboard/categories"
          w="fit-content"
        >
          Back
        </Button>
        {<ErrorMessage>{error}</ErrorMessage>}
        <Paper className="mx-auto max-w-3xl" radius="md" p="xl" withBorder>
          <form onSubmit={onSubmit}>
            <Stack align="end">
              <Flex className="self-start" align="center" gap="md">
                <Text>Icon:</Text>
                <IconPicker
                  value={form.values.icon}
                  pickButtonStyle={{
                    padding: '8px',
                    border: '1px solid #0086ff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#0086ff',
                    cursor: 'pointer',
                  }}
                  onChange={(v: string) => form.setFieldValue('icon', v)}
                />
              </Flex>
              <TextInput
                required
                label="Name"
                placeholder="Category name"
                value={form.values.name}
                onBlur={() => form.validateField('name')}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                error={form.errors.name}
                radius="md"
                w="360px"
              />
              <Select
                required
                label="Type"
                defaultValue={form.values.type}
                onBlur={() => form.validateField('type')}
                onChange={(event) =>
                  form.setFieldValue('type', event!.toString())
                }
                error={form.errors.type}
                data={Object.values(CategoryTypes)}
                radius="md"
                w="360px"
              />
              <Button
                type="submit"
                radius="md"
                w="120"
                mt="xl"
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
