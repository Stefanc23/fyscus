import { ActionIcon, Button, Flex, Paper, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { MdAdd, MdModeEdit } from 'react-icons/md';

import Datatable from '@/components/dashboard/Datatable/Datatable';
import DeleteButton from '@/components/dashboard/DeleteButton/DeleteButton';
import IconPicker from '@/components/dashboard/IconPicker';
import { CategoryData } from '@/models/Category';
import { fetchCategoryData } from '@/utils/fetchData';

const Category = async () => {
  const { categories } = await fetchCategoryData();

  const data = categories.map(({ id, name, type, icon }: CategoryData) => {
    const editUrl = '/dashboard/categories/' + id + '/edit';
    const deleteUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/protected/categories/${id}`;

    const actions = (
      <Flex gap="xs">
        <Tooltip label="Edit Category" position="bottom">
          <ActionIcon component={Link} href={editUrl}>
            <MdModeEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete Category" position="bottom">
          <DeleteButton
            type="categories"
            confirmationText={`Are you sure you want to delete <b>${name}</b> category?`}
            deleteUrl={deleteUrl}
          />
        </Tooltip>
      </Flex>
    );

    return {
      id,
      name: (
        <Flex align="center" gap="sm">
          <IconPicker value={icon!} /> {name}
        </Flex>
      ),
      type,
      actions,
    };
  });

  return (
    <Paper radius="md" p="xl" withBorder>
      <Flex justify="end">
        <Button
          component={Link}
          href="/dashboard/categories/create"
          w="fit-content"
        >
          <Flex gap="xs">
            <span className="hidden md:block">Add New Category</span> <MdAdd />
          </Flex>
        </Button>
      </Flex>
      <Datatable data={data} />
    </Paper>
  );
};

export default Category;
