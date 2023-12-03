import { ReactElement, ReactNode, useCallback, useMemo, useState } from 'react';
import { Box, Table, TableSortLabel } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const generaValueFromMultipleFields = <O = {},>(
  obj: O,
  sortBy: keyof O | keyof O[]
) => {
  let value: string | keyof O;

  if (!Array.isArray(sortBy)) {
    value = sortBy as keyof O;
    return obj[value];
  }

  value = '';

  sortBy.forEach(
    (field) => (value = String(value).concat(obj[field as keyof O] as string))
  );

  return String(value);
};

export interface ColumnProps<
  T = void,
  ADDITIONAL_KEY extends string = '',
  SortKey = void
> {
  title: ReactNode;
  renderNode?: (row: T) => ReactNode;
  className?: string;
  key?: keyof T | ADDITIONAL_KEY;
  isHidden?: boolean;
  sortBy?: keyof T | SortKey | [keyof T | SortKey][];
  sorter?: boolean;
  sx?: SxProps<Theme>;
}

export interface TableProps<T = Record<any, any>> {
  columns: ColumnProps<T, any, any>[];
  rows: T[];
  isFetchingData?: boolean;
  onSort?: (sortBy: keyof T) => void;
  onRowClick?: (row: T) => void;
}

type SortType = 'asc' | 'desc' | '';

interface TableSort<T extends object> {
  sortBy: keyof T;
  sortType: SortType;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 'bold',
    fontSize: 16,
    borderBottom: `1px solid ${theme.palette.common.lightGrey}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.black,
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)((_) => ({
  '&:nth-of-type(odd)': {},
}));

const CustomTable = <T extends Record<string, any> = {}>({
  columns,
  rows = [],
  isFetchingData,
  onSort,
  onRowClick,
}: TableProps<T>): ReactElement => {
  const [sort, setSort] = useState<Partial<TableSort<T>>>({
    sortType: 'asc',
  });

  const handleSort = (sortBy: keyof T) => {
    if (onSort) {
      const isAsc = sort.sortBy === sortBy && sort.sortType === 'asc';
      setSort({ sortType: isAsc ? 'desc' : 'asc', sortBy });
      onSort(sortBy);
      return;
    }

    const newSort: typeof sort = {
      sortBy,
    };
    switch (sort.sortType) {
      case 'asc':
        newSort.sortType = 'desc';
        break;

      default:
        newSort.sortType = 'asc';
        break;
    }
    setSort(newSort);
  };

  const checkSortByType = useCallback((a: any, b: any) => {
    if (typeof a === 'undefined' || typeof b === 'undefined') {
      return 0;
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }

    return 0;
  }, []);

  const sortedRows = useMemo(() => {
    const sortedRows = Array.isArray(rows) ? [...rows] : [];

    if (onSort) {
      return sortedRows;
    }

    const { sortBy } = sort;
    if (!sortBy) {
      return sortedRows;
    }
    switch (sort.sortType) {
      case 'asc':
        sortedRows.sort((a, b) =>
          checkSortByType(
            generaValueFromMultipleFields(a, sortBy),
            generaValueFromMultipleFields(b, sortBy)
          )
        );

        break;

      default:
        sortedRows.sort((a, b) =>
          checkSortByType(
            generaValueFromMultipleFields(b, sortBy),
            generaValueFromMultipleFields(a, sortBy)
          )
        );

        break;
    }

    return sortedRows;
  }, [sort, rows]);

  return (
    <TableContainer>
      <Table aria-label="customized table">
        {!!columns.length && (
          <TableHead>
            {columns.map((column, index) => {
              const { title, sortBy } = column;

              if (column.isHidden) {
                return null;
              }

              return (
                <StyledTableCell
                  key={`${index}-${column.key}`}
                  sx={column.sx}
                  sortDirection={
                    sort.sortBy === column.key ? sort.sortType || false : false
                  }
                >
                  {column.sorter ? (
                    <TableSortLabel
                      active={sort.sortBy === column.key}
                      direction={
                        sort.sortBy === column.key
                          ? sort.sortType || undefined
                          : 'asc'
                      }
                      onClick={() => handleSort(sortBy)}
                    >
                      {title}
                    </TableSortLabel>
                  ) : (
                    title
                  )}
                </StyledTableCell>
              );
            })}
          </TableHead>
        )}

        {!!rows.length && (
          <TableBody>
            {!isFetchingData &&
              sortedRows.map((row, index: number) => {
                return (
                  <StyledTableRow
                    onClick={() => onRowClick?.(row)}
                    key={`${index}-table`}
                  >
                    {columns.map((column, index) => {
                      const data = row[column.key as keyof T] as any;
                      const hasRenderNode = !!column.renderNode;

                      if (column.isHidden) {
                        return null;
                      }

                      return hasRenderNode ? (
                        <TableCell key={`${index}-${column.title}`}>
                          <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                            {column.renderNode?.(row)}
                          </Box>
                        </TableCell>
                      ) : (
                        <StyledTableCell key={`${index}-${column.title}`}>
                          {data as ReactNode}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
