import { z } from 'zod';

// validations
const authValidations = {
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password needs to be at least 8 characters' })
    .max(20, { message: 'Password is too long' }),
};

// schemas
export const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(191),
    ...authValidations,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // path of error
  });

export const loginSchema = z.object(authValidations);
