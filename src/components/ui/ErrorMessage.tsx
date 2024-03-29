import { Alert } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { FaInfo } from 'react-icons/fa';

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Alert variant="outline" color="red" title="Error" icon={<FaInfo />}>
      {children}
    </Alert>
  );
};

export default ErrorMessage;
