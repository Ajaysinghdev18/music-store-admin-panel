// Dependencies
import { CircularProgress, IconButton, TableBody, useMediaQuery, useTheme } from '@mui/material';
import React, { Fragment, useMemo } from 'react';

// Icons
import { DeleteIcon, EyeIcon, PencilIcon } from '../../assets/icons';
// Constants
import { PAGE_LIMIT } from '../../constants';
// Types
import { Order } from '../../shared/types';
// Components
import TableHead, { IColumn } from './Head';
import { MobileTable } from './MobileTable';
import TableToolbar from './Toolbar';
// Styles
import * as S from './styles';

interface ITableProps {
  title?: string;
  data: any[];
  columns: IColumn[];
  pageLimit?: number;
  isLoading?: boolean;
  isMobileDisabled?: boolean;
  totalPage?: number;
  pageNumber?: number;
  onPageChange?: (page: number) => void;
  order?: Order;
  orderBy?: string;
  onSort?: (property: string) => void;
  onNew?: () => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, contentType?:string) => void;
  onView?: (id: string, tokenId?: string, contentType?:string) => void;
  onArchive?: (e: React.MouseEvent<HTMLElement>, row: any) => void;
  onFavorite?: (e: React.MouseEvent<HTMLElement>, row: any) => void;
  selectedRows?: any[];
  numSelected?: number;
  onRowClick?: (id: string) => void;
  OnChangeChecked?: (isChangeCheckedAll: boolean, row?: any) => void;
  disableCreate?: boolean;
  showToolBar?: boolean
}

// Export table component
export const Table = ({
  title,
  data = [],
  columns,
  pageLimit = PAGE_LIMIT,
  pageNumber = 0,
  totalPage = 0,
  onPageChange,
  order,
  orderBy,
  isLoading = false,
  isMobileDisabled = false,
  onSort,
  onNew,
  onDelete,
  onEdit,
  onView,
  onArchive,
  onFavorite,
  selectedRows = [],
  numSelected,
  onRowClick,
  OnChangeChecked,
  disableCreate,
  showToolBar= true,
}: ITableProps) => {
  // Mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Page change handler
  const handlePageChange = (event: unknown, newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage - 1);
    }
  };

  // Delete handle
  const handleDelete = (id: string) => {
    if (onDelete) onDelete(id);
  };

  // Edit handler
  const handleEdit = (id: string, contentType?:string) => {
    if (onEdit) onEdit(id, contentType);
  };

  // View handler
  const handleView = (id: string, tokenId?: string, contentType?:string) => {
    if (onView) onView(id, tokenId, contentType);
  };

  // Check pagination visibility
  const isVisiblePagination = useMemo(
    () => !isLoading && data.length > 0 && onPageChange,
    [isLoading, data, onPageChange]
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = useMemo(() => {
    const length = title ? totalPage : data.length;
    return Math.max(0, (1 + pageNumber) * pageLimit - length);
  }, [pageNumber, totalPage, data]);

  // Calc columns
  const colSpan = useMemo(() => {
    if (onView || onEdit || onDelete) {
      return columns.length + 1;
    } else {
      return columns.length;
    }
  }, [columns]);
console.log('row', data);
  // Return table component
  return (
    <S.Container>
      <S.Card>
       {showToolBar && <TableToolbar isLoading={isLoading} title={title} onNew={onNew} disableCreate={disableCreate} />}
        {!isMobileDisabled && isMobile ? (
          <MobileTable
            title={title}
            data={data}
            columns={columns}
            pageLimit={pageLimit}
            pageNumber={pageNumber}
            totalPage={totalPage}
            onPageChange={onPageChange}
            isLoading={isLoading}
            onNew={onNew}
            onDelete={onDelete}
            onEdit={onEdit}
            onView={onView}
            onArchive={onArchive}
            onFavorite={onFavorite}
            selectedRows={selectedRows}
            numSelected={numSelected}
            onRowClick={onRowClick}
            OnChangeChecked={OnChangeChecked}
          />
        ) : (
          <S.Table>
            <TableHead
              order={order}
              orderBy={orderBy}
              onSort={onSort}
              columns={columns}
              numSelected={numSelected}
              rowCount={data.length}
              OnChangeChecked={OnChangeChecked}
              visibleAction={!!(onDelete || onEdit || onView)}
            />
            <TableBody>
              {!isLoading ? (
                data.length > 0 ? (
                  <Fragment>
                    {data.map((row, rIndex) => (
                      <S.Row
                        role="checkbox"
                        tabIndex={-1}
                        key={rIndex}
                        className={selectedRows.some((item) => item.id === row.id) ? 'checked' : ''}
                        onClick={() => onRowClick && onRowClick(row.id)}
                      >
                        {columns.map((column, rowId) => (
                          <S.Cell align={column.align} key={`table-cell-${rIndex}-${rowId}`}>
                            {column.render ? column.render(row, rowId, data) : column.field ? row[column.field] : null}
                          </S.Cell>
                        ))}
                        {(onDelete || onEdit || onView) && (
                          <S.Cell align="right" sx={{ whiteSpace: 'noWrap' }}>
                            {onDelete && (
                              <IconButton onClick={() => handleDelete((row?._id as string) || (row?.id as string))}>
                                <DeleteIcon />
                              </IconButton>
                            )}
                            {onEdit && (
                              <IconButton onClick={() => handleEdit((row?._id as string) || (row?.id as string), row?.contentType && row?.contentType as string)}>
                                <PencilIcon />
                              </IconButton>
                            )}
                            {onView && (
                              <IconButton
                                onClick={() => {
                                  if (title == 'Smart Contracts') {
                                    handleView(row?._id as string);
                                  } else if (row?.details) {
                                    handleView(row?.details.transactionHash as string, row?.tokenId as string);
                                  } else {
                                    handleView((row?._id as string) || (row?.id as string), row?.tokenId as string, row?.contentType && row?.contentType as string);
                                  }
                                }}
                              >
                                <EyeIcon />
                              </IconButton>
                            )}
                          </S.Cell>
                        )}
                      </S.Row>
                    ))}
                    {emptyRows > 0 && (
                      <S.Row
                        style={{
                          height: 56 * emptyRows
                        }}
                      >
                        <S.Cell colSpan={colSpan} />
                      </S.Row>
                    )}
                  </Fragment>
                ) : (
                  <S.Row
                    style={{
                      height: 56 * pageLimit
                    }}
                  >
                    <S.Cell colSpan={colSpan} sx={{ textAlign: 'center', fontWeight: '600' }}>
                      There is no data to display :(
                    </S.Cell>
                  </S.Row>
                )
              ) : (
                <S.Row
                  style={{
                    height: 56 * pageLimit
                  }}
                >
                  <S.Cell colSpan={colSpan} sx={{ textAlign: 'center' }}>
                    <CircularProgress />
                  </S.Cell>
                </S.Row>
              )}
            </TableBody>
          </S.Table>
        )}
      </S.Card>
      {isVisiblePagination && (
        <S.Pagination count={Math.ceil(totalPage / pageLimit)} page={pageNumber + 1} onChange={handlePageChange} />
      )}
    </S.Container>
  );
};

export * from './Head';
