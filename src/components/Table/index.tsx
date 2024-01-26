import { Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ITableProps } from './interface';

export function AppTable<T>({ columns, rows, onRowClick, columnSizes = [] }: ITableProps<T>): React.ReactElement {
  return (
    <Flex
      w="100%"
      direction="column"
      overflow="auto"
      bg="white"
      borderRadius="lg"
      border="1px"
      borderColor="gray300"
      boxShadow="sm"
      fontFamily={`'Inter' - sans-serif`}
    >
      <Table variant="simple">
        <Thead>
          <Tr w="fit-content !important">
            {columns.map((column) => (
              <Th
                key={column.field as string}
                fontFamily={`'Inter' - sans-serif`}
                textTransform="none"
                fontSize="16px"
                fontWeight="400"
                py="1.25rem"
                w={columnSizes.find((e) => e.field === column.field)?.width || 'fit-content'}
              >
                {column.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, i) => (
            <Tr key={JSON.stringify({ i })} cursor="pointer" _hover={{ bg: 'gray50' }} onClick={() => onRowClick(row)}>
              {columns.map((column, i) => (
                <Td key={JSON.stringify({ i })}>{(row as any)[column.field] || ''}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
