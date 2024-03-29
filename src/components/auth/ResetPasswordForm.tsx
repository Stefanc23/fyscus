import { Button, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';

import { loginSchema } from '@/lib/zod/validations';

const ResetPasswordForm = () => {
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: zodResolver(loginSchema.pick({ email: true })),
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <Stack>
        <Text size="xs" mt="lg">
          Don&apos;t worry! Just enter your email here and we&apos;ll help you
          reset your password.
        </Text>
        <TextInput
          required
          label="Email"
          placeholder="hello@world.com"
          value={form.values.email}
          radius="md"
        />
        <Button type="submit" radius="md" mt="lg">
          Reset Password
        </Button>
      </Stack>
    </form>
  );
};

export default ResetPasswordForm;
