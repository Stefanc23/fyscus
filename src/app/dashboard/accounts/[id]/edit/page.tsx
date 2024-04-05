import AccountForm from '@/components/dashboard/Forms/AccountForm';
import { fetchOneAccountData } from '@/utils/fetchData';

const EditAccount = async ({ params }: { params: { id: string } }) => {
  const { account } = await fetchOneAccountData(params.id);
  return <AccountForm account={account} />;
};

export default EditAccount;
