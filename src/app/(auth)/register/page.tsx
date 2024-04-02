import type { Metadata } from 'next';

import AuthForm from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Register | Fyscus',
};

const Register = () => {
  return <AuthForm type="register" />;
};

export default Register;
