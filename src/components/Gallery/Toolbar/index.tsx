// Dependencies
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

// Icons
import { PlusIcon } from '../../../assets/icons';
// Styles
import * as S from './styles';

// Types
interface TableToolbarProps {
  title?: string;
  isLoading: boolean;
  onNew?: () => void;
}

// Create table toolbar component
const TableToolbar: FC<TableToolbarProps> = ({ title = '', isLoading, onNew }) => {
  // Return table toolbar component
  return (
    <S.TableToolbar>
      <Typography variant="title" color="text.black" fontWeight={'600'}>
        {title}
      </Typography>
      <Stack direction="row" spacing={2}>
        {onNew && (
          <S.AddButton disabled={isLoading} onClick={onNew}>
            <Box display={'flex'} alignItems={'center'} gap={12}>
              <S.StackIcon>
                <PlusIcon />
              </S.StackIcon>
              <Box fontWeight={'500'} fontSize={'0.875rem'}>
                Add new
              </Box>
            </Box>
          </S.AddButton>
        )}
      </Stack>
    </S.TableToolbar>
  );
};

export default TableToolbar;
