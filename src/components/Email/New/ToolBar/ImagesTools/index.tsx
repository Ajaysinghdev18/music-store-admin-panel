//components
import { Divider, MenuItem } from '@mui/material';

//icons
import {
  ActiveCropIcon,
  ActiveCropRotateIcon,
  CategoryIcon,
  CropIcon,
  CropRotateIcon,
  UploadIconWhite
} from '../../../../../assets/icons';
import CustomButton from '../../../../CustomButton/CustomButton';
import AppearanceTools from '../../../Common/AppearanceTools';
import Toggle from '../../../Common/Toggle';
import TransformTools from '../../../Common/TransformTools';
import ImageActionMenu from '../ImageActionMenu';
import { CropToolBox, CustomSelect, GalleryItem, ImagesGallery, SectionTitle, ToggleButtonGroup } from './style';

const ImagesTools = () => {
  const imagesGallery = new Array(7).fill(0);
  return (
    <>
      <CustomButton
        title="Upload image"
        variant="contained"
        start={true}
        width={224}
        height={40}
        icon={<UploadIconWhite />}
      />
      <Divider />
      <SectionTitle>Images Gallery</SectionTitle>
      <ImagesGallery>
        {imagesGallery.map((item, index) => (
          <GalleryItem key={index}>
            <CategoryIcon />
            <ImageActionMenu />
          </GalleryItem>
        ))}
      </ImagesGallery>
      <Divider></Divider>
      <SectionTitle>Transform</SectionTitle>
      <TransformTools />

      <CropToolBox>
        <ToggleButtonGroup width={'6rem !important'} py={'0.25rem !important'}>
          <Toggle active="active" width={40} height={40} icon={<CropIcon />} activeIcon={<ActiveCropIcon />} />
          <Divider orientation={'vertical'} />
          <Toggle
            active="inactive"
            width={40}
            height={40}
            icon={<CropRotateIcon />}
            activeIcon={<ActiveCropRotateIcon />}
          />
        </ToggleButtonGroup>

        <CustomSelect
          fullWidth
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          value={1}
          sx={{ mt: '8px' }}
        >
          <MenuItem value={1}>Free</MenuItem>
          <MenuItem value={10}>3:4</MenuItem>
          <MenuItem value={20}>4:3</MenuItem>
          <MenuItem value={30}>etc</MenuItem>
        </CustomSelect>
      </CropToolBox>
      <Divider />
      <SectionTitle>Appearance</SectionTitle>
      <AppearanceTools colorBoxCnt={1} isBoarderSizeInput={true} />
    </>
  );
};

export default ImagesTools;
