import { Divider, Typography } from '@mui/material';
import React from 'react';

import { CategoryIcon, CloudIcon, DropBox, GoogleDrive, UploadIconWhite } from '../../../../../assets/icons';
import CustomButton from '../../../../CustomButton/CustomButton';
import { DragMediaBox, GalleryItem, ImagesGallery, SectionTitle } from '../../../Common/styles';
import ImageActionMenu from '../ImageActionMenu';

const UploadTools = () => {
  return (
    <>
      <CustomButton
        format={true}
        title="Upload"
        variant="contained"
        start={true}
        width={224}
        icon={<UploadIconWhite />}
      />
      <CustomButton
        format={true}
        title="Google Drive"
        variant="contained"
        start={true}
        width={224}
        icon={<GoogleDrive />}
      />
      <CustomButton format={true} title="iCloud" variant="contained" start={true} width={224} icon={<CloudIcon />} />
      <CustomButton format={true} title="Dropbox" variant="contained" start={true} width={224} icon={<DropBox />} />

      <DragMediaBox>
        <Typography>Drag media here to upload</Typography>
        <Typography>(.PNGs, .JPGs, .SVGs)</Typography>
      </DragMediaBox>
      <Divider />
      <SectionTitle>Images gallery</SectionTitle>
      <ImagesGallery sx={{ height: 'auto' }}>
        {new Array(9).fill(0).map((item, index) => (
          <GalleryItem key={index}>
            <CategoryIcon />
            <ImageActionMenu />
          </GalleryItem>
        ))}
      </ImagesGallery>
    </>
  );
};

export default UploadTools;
