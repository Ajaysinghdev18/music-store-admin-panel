import { Box } from '@mui/material';
import React, { FC, useState } from 'react';

import { SIDEBARADMIN_LIST } from '../../../../constants';
import { COLORS } from '../../../../constants/colors';
import SidebarItem from '../../../../layouts/Full/Sidebar/Item';

export interface IMenuViewProps {
  visible: any;
}

const MenuView: FC<IMenuViewProps> = ({ visible }) => {
  const [subMenuIdx, setSubMenuIdx] = useState<number>(-1);

  return (
    visible && (
      <Box
        display="flex"
        flexDirection="column"
        bgcolor={COLORS.WHITE}
        borderRadius="1.25rem"
        ml="-0.75rem"
        mt="0.75rem"
        position="absolute"
        zIndex="1000"
      >
        {SIDEBARADMIN_LIST.map((item, index) => (
          <SidebarItem
            key={index}
            menuIdx={index}
            item={item}
            subMenuIdx={subMenuIdx}
            setSubMenuIdx={setSubMenuIdx}
            isCollapsed={true}
          />
        ))}
      </Box>
    )
  );
};

export default MenuView;
