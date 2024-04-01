import { z } from 'zod';

// validations
const authValidations = {
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password needs to be at least 8 characters' })
    .max(20, { message: 'Password is too long' }),
};

const accountValidations = {
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(191, { message: 'Name can only be up to 191 characters long' }),
  balance: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().nonnegative())
    .transform((val) => val.toString()),
  userId: z.string().length(36),
};

const categoryValidations = {
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(191, { message: 'Name can only be up to 191 characters long' }),
  type: z.enum(['EXPENSE', 'INCOME']),
  icon: z.string().nullable(),
  userId: z.string().length(36),
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

export const accountSchema = z.object(accountValidations);

export const categorySchema = z.object(categoryValidations);
