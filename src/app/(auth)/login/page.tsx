'use client';

import {
  Anchor,
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { z } from 'zod';

import GoogleButton from '@/components/ui/GoogleButton';
import { loginSchema } from '@/lib/zod/validations';

type LoginForm = z.infer<typeof loginSchema>;

const Login = (props: PaperProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    } satisfies LoginForm,

    validate: zodResolver(loginSchema),
  });

  const resetPasswordForm = useForm({
    initialValues: {
      email: '',
    },

    validate: zodResolver(loginSchema.pick({ email: true })),
  });

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
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to Fyscus, login with
        </Text>

        <GoogleButton radius="md" fullWidth mt={16}>
          Google
        </GoogleButton>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={loginForm.onSubmit(() => {})}>
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
            <Button type="submit" radius="md">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
};

export default Login;
