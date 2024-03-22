'use client';

import {
  Anchor,
  Button,
  Divider,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

import ErrorMessage from '@/components/ui/ErrorMessage';
import GoogleButton from '@/components/ui/GoogleButton';
import { createClient } from '@/lib/supabase/client';
import { registerSchema } from '@/lib/zod/validations';

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    } satisfies RegisterForm,

    validate: zodResolver(registerSchema),
  });

  const onSubmit = form.onSubmit(async (values) => {
    setError('');
    setIsSubmitting(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/register`,
      {
        method: 'POST',
        body: JSON.stringify(values),
      },
    );

    const data = await response.json();

    setIsSubmitting(false);

    if (data.error) {
      console.log(data.error);
      setError('Oops! Something went wrong.');
    } else {
      router.replace('/dashboard');
    }
  });

  const loginWithGoogle = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      {<ErrorMessage>{error}</ErrorMessage>}
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Fyscus, register with
        </Text>

        <GoogleButton radius="md" fullWidth mt={16} onClick={loginWithGoogle}>
          Google
        </GoogleButton>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={onSubmit}>
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onBlur={() => form.validateField('name')}
              onChange={(event) =>
                form.setFieldValue('name', event.currentTarget.value)
              }
              error={form.errors.name}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@world.com"
              value={form.values.email}
              onBlur={() => form.validateField('email')}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onBlur={() => form.validateField('password')}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={form.errors.password}
              radius="md"
            />

            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Confirm password"
              value={form.values.confirmPassword}
              onBlur={() => form.validateField('confirmPassword')}
              onChange={(event) =>
                form.setFieldValue('confirmPassword', event.currentTarget.value)
              }
              error={form.errors.confirmPassword}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl" gap="xl">
            <Text size="xs">
              Already have an account?{' '}
              <Anchor component={Link} href="/login">
                Login
              </Anchor>
            </Text>
            <Button
              type="submit"
              radius="md"
              w="120"
              rightSection={isSubmitting && <Loader size="xs" />}
              disabled={isSubmitting}
            >
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
