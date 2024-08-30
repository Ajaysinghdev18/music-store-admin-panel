// Dependencies
import { Grid } from '@mui/material';
import React, { useMemo } from 'react';

import TableToolbar from '../Table/Toolbar';
import TemplateCard from './Common/TemplateCard';
// Components
import { Card, Container, Pagination } from './style';

// Interface
interface EmailTemplateListProps {
  title?: string;
  isLoading?: boolean;
  templateList?: any;
  pageLimits?: number;
  pageNumber?: number;
  totalPage?: number;
  onNew: () => void;
  onPageChanged?: (page: number) => void;
  onItemClicked: (index: string) => void;
}

export const EmailTemplateList = ({
  title,
  isLoading = true,
  onNew,
  templateList,
  pageLimits = 12,
  totalPage = 0,
  pageNumber = 1,
  onPageChanged,
  onItemClicked
}: EmailTemplateListProps) => {
  const handlePageChange = (event: unknown, newPage: number) => {
    if (onPageChanged) {
      onPageChanged(newPage - 1);
    }
  };

  const isVisiblePagination = useMemo(
    () => !isLoading && templateList.length > 0 && onPageChanged,
    [isLoading, templateList, onPageChanged]
  );

  return (
    <Container>
      <Card>
        {title && <TableToolbar isLoading={isLoading} title={title} onNew={onNew} />}
        <Grid container spacing={16}>
          {templateList.map((template, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
              <TemplateCard template={template} onItemClicked={onItemClicked} />
            </Grid>
          ))}
        </Grid>
      </Card>
      {isVisiblePagination && (
        <Pagination
          sx={{ width: 'auto' }}
          count={Math.ceil(totalPage / pageLimits)}
          page={pageNumber + 1}
          onChange={handlePageChange}
        />
      )}
    </Container>
  );
};
