import CategoryForm from '@/components/dashboard/Forms/CategoryForm';
import { fetchOneCategoryData } from '@/utils/fetchData';

const EditCategory = async ({ params }: { params: { id: string } }) => {
  const { category } = await fetchOneCategoryData(params.id);
  return <CategoryForm category={category} />;
};

export default EditCategory;
