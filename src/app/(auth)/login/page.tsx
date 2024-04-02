import type { Metadata } from 'next';

import AuthForm from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Login | Fyscus',
};

const Login = () => {
  return <AuthForm type="login" />;
};

export default Login;
