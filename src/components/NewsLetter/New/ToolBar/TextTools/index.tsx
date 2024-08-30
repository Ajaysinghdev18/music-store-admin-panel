import { Divider, MenuItem } from '@mui/material';
import { useState } from 'react';

//icons
import {
  ActiveDropIcon,
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignThroughIcon,
  DropIcon,
  InsertLinkIcon
} from '../../../../../assets/icons';
import AppearanceTools from '../../../Common/AppearanceTools';
import Toggle from '../../../Common/Toggle';
import { CustomSelect, ToggleButtonGroup } from '../../../Common/styles';
import { SectionTitle, TextToolBox } from './style';

const TextTools = () => {
  const [toggleNumber, setToggleNumber] = useState(1);

  const handleToggle = (newToggleNumber) => {
    setToggleNumber(newToggleNumber);
  };

  return (
    <>
      <SectionTitle>Text</SectionTitle>
      <TextToolBox>
        <CustomSelect
          fullWidth
          sx={{ height: '3rem', borderRadius: '8px' }}
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
          value={10}
        >
          <MenuItem value={1}>None</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </CustomSelect>
        <ToggleButtonGroup>
          <Toggle width={50} height={36} active="inactive">
            <b>B</b>
          </Toggle>
          <Toggle width={50} height={36} active="inactive">
            <i>I</i>
          </Toggle>
          <Toggle width={50} height={36} active="inactive">
            <u>U</u>
          </Toggle>
          <Toggle width={50} height={36} active="active">
            <s>S</s>
          </Toggle>
        </ToggleButtonGroup>
        <ToggleButtonGroup>
          <Toggle active="active" width={50} height={36} icon={<AlignLeftIcon />} />
          <Toggle active="inactive" width={50} height={36} icon={<AlignCenterIcon />} />
          <Toggle active="inactive" width={50} height={36} icon={<AlignRightIcon />} />
          <Toggle active="inactive" width={50} height={36} icon={<AlignThroughIcon />} />
        </ToggleButtonGroup>
        <ToggleButtonGroup width={'10.75rem !important'}>
          <Toggle active="active" width={50} height={36} icon={<InsertLinkIcon />} />
          <Divider orientation="vertical" />
          <Toggle active="inactive" width={50} height={36} icon={<DropIcon />} activeIcon={<ActiveDropIcon />} />
        </ToggleButtonGroup>
      </TextToolBox>
      <Divider />
      <SectionTitle>Appearance</SectionTitle>
      <AppearanceTools />
    </>
  );
};

export default TextTools;
