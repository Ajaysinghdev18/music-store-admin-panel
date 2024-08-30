import { Box, Card, CardHeader, CircularProgress, IconButton } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

import {
  ArchiveOutlinedIcon,
  DeleteIcon,
  EyeIcon,
  PencilIcon,
  StarredFavorite,
  StarredIcon
} from '../../../assets/icons';
import { TICKET_STATUS } from '../../../shared/enums';
import { IColumn } from '../Head';

interface IMobileTableProps {
  title?: string;
  data: any[];
  columns: IColumn[];
  pageLimit?: number;
  isLoading?: boolean;
  totalPage?: number;
  pageNumber?: number;
  onPageChange?: (page: number) => void;
  onNew?: () => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onArchive?: (e: React.MouseEvent<HTMLElement>, row: any) => void;
  onFavorite?: (e: React.MouseEvent<HTMLElement>, row: any) => void;
  selectedRows?: any[];
  numSelected?: number;
  onRowClick?: (id: string) => void;
  OnChangeChecked?: (isChangeCheckedAll: boolean, row?: any) => void;
}

// Style
export const MobileCard = styled(Card)`
  margin-top: 8px;
  border-radius: 8px;
  border: 0.0675rem solid ${(props) => props.theme.palette.text.disabled};
`;

export const MobileTable: FC<IMobileTableProps> = ({
  title,
  data = [],
  columns,
  isLoading = false,
  onDelete,
  onEdit,
  onView,
  onArchive,
  onFavorite
}: IMobileTableProps) => {
  // Delete handle
  const handleDelete = (id: string) => {
    if (onDelete) onDelete(id);
  };

  // Edit handler
  const handleEdit = (id: string) => {
    if (onEdit) onEdit(id);
  };

  // View handler
  const handleView = (id: string) => {
    if (onView) onView(id);
  };

  // Edit handler
  const handleArchive = (e, row: any) => {
    if (onArchive) onArchive(e, row);
  };

  // View handler
  const handleFavorite = (e, row: any) => {
    if (onFavorite) onFavorite(e, row);
  };

  return (
    <>
      {!isLoading ? (
        data.length > 0 ? (
          <>
            {data.map((row, rIndex) => (
              <MobileCard key={rIndex}>
                <CardHeader
                  title={title ? title + ` ${rIndex + 1}` : `List ${rIndex + 1}`}
                  action={
                    <>
                      {(onDelete || onEdit || onView) && (
                        <Box display="flex" alignItems="center">
                          {onDelete && (
                            <IconButton onClick={() => handleDelete(row?.id as string)}>
                              <DeleteIcon />
                            </IconButton>
                          )}
                          {onEdit && (
                            <IconButton onClick={() => handleEdit(row?.id as string)}>
                              <PencilIcon />
                            </IconButton>
                          )}
                          {onView && (
                            <IconButton onClick={() => handleView(row?.id as string)}>
                              <EyeIcon />
                            </IconButton>
                          )}
                          {onArchive && (
                            <IconButton onClick={(e) => handleArchive(e, row)}>
                              <ArchiveOutlinedIcon />
                            </IconButton>
                          )}
                          {onFavorite && (
                            <IconButton onClick={(e) => handleFavorite(e, row)}>
                              {row.status === TICKET_STATUS.STARRED ? <StarredFavorite /> : <StarredIcon />}{' '}
                            </IconButton>
                          )}
                        </Box>
                      )}
                    </>
                  }
                />
                {columns.map((column, rowId) => (
                  <Box
                    key={`table-cell-${rIndex}-${rowId}`}
                    alignItems="center"
                    paddingTop={8}
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    {column.title && (
                      <>
                        <Box>{column.title}:</Box>
                        <Box>
                          {column.render ? column.render(row, rowId, data) : column.field ? row[column.field] : null}
                        </Box>
                      </>
                    )}
                  </Box>
                ))}
              </MobileCard>
            ))}
          </>
        ) : (
          <Card sx={{ textAlign: 'center' }}>There is no data to display :(</Card>
        )
      ) : (
        <Card sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Card>
      )}
    </>
  );
};
