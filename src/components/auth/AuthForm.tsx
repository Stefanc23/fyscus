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
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { zodResolver } from 'mantine-form-zod-resolver';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ErrorMessage from '@/components/ui/ErrorMessage';
import GoogleButton from '@/components/ui/GoogleButton';
import { createClient } from '@/lib/supabase/client';
import { loginSchema, registerSchema } from '@/lib/zod/validations';

import ResetPasswordForm from './ResetPasswordForm';

type AuthFormProps = {
  type: 'register' | 'login';
};

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: zodResolver(type === 'register' ? registerSchema : loginSchema),
  });

  const onSubmit = form.onSubmit(async (values) => {
    setError('');
    setIsSubmitting(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/${type}`,
      {
        method: 'POST',
        body: JSON.stringify(values),
      },
    );

    const data = await response.json();

    setIsSubmitting(false);

    if (data.error) {
      setError(
        typeof data.error === 'string'
          ? data.error
          : 'Oops! Something went wrong.',
      );
    } else {
      router.replace('/dashboard');
    }
  });

  const handleGoogleAuth = async () => {
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
      {type === 'login' && (
        <Modal opened={opened} onClose={close} title="Forgot Password" centered>
          <ResetPasswordForm />
        </Modal>
      )}
      <div className="flex flex-col space-y-6">
        {<ErrorMessage>{error}</ErrorMessage>}
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" fw={500}>
            Welcome to Fyscus, {type} with
          </Text>

          <GoogleButton
            radius="md"
            fullWidth
            mt={16}
            onClick={handleGoogleAuth}
          >
            Google
          </GoogleButton>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form onSubmit={onSubmit}>
            <Stack>
              {type === 'register' && (
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
              )}

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

              {type === 'login' && (
                <Flex justify="end">
                  <Anchor onClick={open} fz="xs">
                    Forgot Password?
                  </Anchor>
                </Flex>
              )}

              {type === 'register' && (
                <PasswordInput
                  required
                  label="Confirm Password"
                  placeholder="Confirm password"
                  value={form.values.confirmPassword}
                  onBlur={() => form.validateField('confirmPassword')}
                  onChange={(event) =>
                    form.setFieldValue(
                      'confirmPassword',
                      event.currentTarget.value,
                    )
                  }
                  error={form.errors.confirmPassword}
                  radius="md"
                />
              )}
            </Stack>

            <Group justify="space-between" mt="xl" gap="xl">
              <Text size="xs">
                {type === 'register'
                  ? 'Already have an account? '
                  : "Don't have an account yet? "}
                <Anchor
                  component={Link}
                  href={`/${type === 'register' ? 'login' : 'register'}`}
                >
                  {type === 'register' ? 'Login' : 'Register'}
                </Anchor>
              </Text>
              <Button
                type="submit"
                radius="md"
                w="120"
                rightSection={isSubmitting && <Loader size="xs" />}
                disabled={isSubmitting}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            </Group>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default AuthForm;
