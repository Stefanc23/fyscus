'use client';

import {
  Anchor,
  Button,
  Divider,
  Flex,
  Group,
  Loader,
  Modal,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

import ErrorMessage from '@/components/ui/ErrorMessage';
import GoogleButton from '@/components/ui/GoogleButton';
import { createClient } from '@/lib/supabase/client';
import { loginSchema } from '@/lib/zod/validations';

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    } satisfies LoginForm,

    validate: zodResolver(loginSchema),
  });

  const loginOnSubmit = loginForm.onSubmit(async (values) => {
    setError('');
    setIsSubmitting(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/login`,
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

  const resetPasswordForm = useForm({
    initialValues: {
      email: '',
    },

    validate: zodResolver(loginSchema.pick({ email: true })),
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
    <>
      <Modal opened={opened} onClose={close} title="Forgot Password" centered>
        <form onSubmit={resetPasswordForm.onSubmit(() => {})}>
          <Stack>
            <Text size="xs" mt="lg">
              Don&apos;t worry! Just enter your email here and we&apos;ll help
              you reset your password.
            </Text>
            <TextInput
              required
              label="Email"
              placeholder="hello@world.com"
              value={resetPasswordForm.values.email}
              radius="md"
            />
            <Button type="submit" radius="md" mt="lg">
              Reset Password
            </Button>
          </Stack>
        </form>
      </Modal>
      <div className="flex flex-col space-y-6">
        {<ErrorMessage>{error}</ErrorMessage>}
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" fw={500}>
            Welcome to Fyscus, login with
          </Text>

          <GoogleButton radius="md" fullWidth mt={16} onClick={loginWithGoogle}>
            Google
          </GoogleButton>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form onSubmit={loginOnSubmit}>
            <Stack>
              <TextInput
                required
                label="Email"
                placeholder="hello@world.com"
                value={loginForm.values.email}
                onChange={(event) =>
                  loginForm.setFieldValue('email', event.currentTarget.value)
                }
                error={loginForm.errors.email && 'Invalid email'}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={loginForm.values.password}
                onChange={(event) =>
                  loginForm.setFieldValue('password', event.currentTarget.value)
                }
                error={
                  loginForm.errors.password &&
                  'Password should include at least 6 characters'
                }
                radius="md"
              />

              <Flex justify="end">
                <Anchor onClick={open} fz="xs">
                  Forgot Password?
                </Anchor>
              </Flex>
            </Stack>

            <Group justify="space-between" mt="xl" gap="xl">
              <Text size="xs">
                Don&apos;t have an account yet?{' '}
                <Anchor component={Link} href="/register">
                  Register
                </Anchor>
              </Text>
              <Button
                type="submit"
                radius="md"
                w="120"
                rightSection={isSubmitting && <Loader size="xs" />}
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Group>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default Login;
