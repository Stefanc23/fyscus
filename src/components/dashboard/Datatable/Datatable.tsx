'use client';

import { Table, Text } from '@mantine/core';
import { useState } from 'react';

import { capitalizeString } from '@/utils/capitalizeString';

type DataObject = {
  id: string;
  [key: string]: string;
};

type DatatableProps = {
  data: Array<DataObject>;
};

const Datatable: React.FC<DatatableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<Array<DataObject>>(data);

  if (tableData.length < 1) {
    return <Text>Nothing here yet.</Text>;
  }

  const headerRow = (
    <Table.Tr>
      {Object.keys(tableData[0]).map(
        (key, index) =>
          key !== 'id' && (
            <Table.Th key={index + key}>{capitalizeString(key)}</Table.Th>
          ),
      )}
    </Table.Tr>
  );

  const rows = data.map(({ id, ...item }) => (
    <Table.Tr key={id}>
      {Object.values(item).map((value, index) => (
        <Table.Td key={index + value}>{value}</Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped highlightOnHover>
        <Table.Thead>{headerRow}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default Datatable;
