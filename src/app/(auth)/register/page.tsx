'use client';

import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { z } from 'zod';

import GoogleButton from '@/components/ui/GoogleButton';
import { registerSchema } from '@/lib/zod/validations';

type RegisterForm = z.infer<typeof registerSchema>;

const Register = (props: PaperProps) => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    } satisfies RegisterForm,

    validate: zodResolver(registerSchema),
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Fyscus, register with
      </Text>

      <GoogleButton radius="md" fullWidth mt={16}>
        Google
      </GoogleButton>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
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
          <Button type="submit" radius="md">
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default Register;
