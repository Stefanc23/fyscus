export type UserData = {
  id: string;
  name: string;
  email: string;
  image?: string;
  defaultCurrency?: 'IDR' | 'USD';
  createdAt?: string;
  updatedAt?: string;
};
