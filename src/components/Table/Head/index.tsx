// Dependencies
import { Box } from '@mui/material';
// Materials
import { Checkbox } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React, { FC, ReactElement } from 'react';

// Icons
import { ArrowDownIcon } from '../../../assets/icons';
// Types
import { Order } from '../../../shared/types';
// Styles
import * as S from './styles';

interface TableHeadProps {
  order?: Order;
  orderBy?: string;
  onSort?: (property: string) => void;
  columns: readonly IColumn[];
  visibleAction?: boolean;
  rowCount?: number;
  numSelected?: number;
  OnChangeChecked?: (isChangeCheckedAll: boolean, row?: any) => void;
}

export interface IColumn {
  title: string | ReactElement;
  field?: string;
  sort?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (row: any, index: number, data: any[]) => string | ReactElement | null | Promise<any>;
}

// Create table-head component
const TableHead: FC<TableHeadProps> = ({
  order,
  orderBy,
  onSort,
  columns,
  visibleAction = false,
  rowCount = 0,
  numSelected = 0,
  OnChangeChecked
}) => {
  const handleCheckedAllChange = () => {
    if (OnChangeChecked) OnChangeChecked(true, []);
  };

  // Return table-head component
  return (
    <S.Head>
      <S.Row>
        {columns.map(({ field, align, title, sort = true }, index) => {
          return (
            <S.Cell key={index} align={align || 'left'} sortDirection={orderBy === field ? order : false}>
              {field == 'check' ? (
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected == rowCount}
                  onChange={handleCheckedAllChange}
                />
              ) : (
                <S.SortLabel
                  active={orderBy === field}
                  direction={orderBy === field ? order : 'asc'}
                  onClick={field && onSort ? () => onSort(field) : undefined}
                  IconComponent={sort ? ArrowDownIcon : () => <></>}
                  sx={{ flexDirection: 'unset' }}
                >
                  {title || ''}
                  {orderBy === field ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </S.SortLabel>
              )}
            </S.Cell>
          );
        })}
        {visibleAction && (
          <S.Cell>
            <S.SortLabel>Actions</S.SortLabel>
          </S.Cell>
        )}
      </S.Row>
    </S.Head>
  );
};

export default TableHead;
