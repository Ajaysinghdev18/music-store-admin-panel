import { Box } from '@mui/material';
import { FC, useState } from 'react';

import Content from './Content';
import TabBar from './TabBar';

export interface IToolBarProps {
  toggleCollapsed: () => void;
}

const ToolBar: FC<IToolBarProps> = ({ toggleCollapsed }) => {
  const [field, setfield] = useState(-1);

  const handleChange = (newfield): void => {
    if (newfield === field) newfield = -1;
    if (newfield === -1 || field === -1) toggleCollapsed();
    setfield(newfield);
  };

  return (
    <Box display={'flex'}>
      <TabBar onClicked={handleChange} field={field} />
      <Content field={field} />
    </Box>
  );
};

export default ToolBar;
