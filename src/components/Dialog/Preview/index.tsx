import { Button, Stack } from '@mui/material';
import { FC } from 'react';

import { ArrowLeftIcon, PublishIcon } from '../../../assets/icons';
import { API_SERVER, REACT_APP_API_ASSETS_SERVER } from '../../../constants';
import { PRODUCT_TYPE } from '../../../shared/enums';
import { IProduct } from '../../../shared/types';
import { AudioPlayer } from '../../AudioPlayer';
import { ObjectRender } from '../../ObjectRender';
import { VideoPlayer } from '../../VideoPlayer';
import * as S from './styles';

interface IPreviewDialogProps {
  open: boolean;
  product: IProduct;
  onClose: () => void;
  svg?: string | any;
}

export const PreviewDialog: FC<IPreviewDialogProps> = ({ open, product, svg, onClose }) => {
  const { name, type, preview, thumbnail, statement, sign, video, image, object } = product;
  const getObjectUrl = (file) => {
    const url = URL.createObjectURL(file);
    return url.toString();
  };

  return (
    <S.PreviewDialog fullWidth maxWidth="xl" open={open} onClose={onClose}>
      <Stack mb={24} direction="row" justifyContent="center" spacing={16}>
        <Button variant="outlined" startIcon={<ArrowLeftIcon />} onClick={onClose}>
          Back
        </Button>
        <Button startIcon={<PublishIcon />}>Publish</Button>
      </Stack>
      <S.Content>
        {type === PRODUCT_TYPE.IMAGE ||
          (type === PRODUCT_TYPE.PHYSICAL && (
            <S.Song>
              <S.Summary>
                <S.Backdrop />
                <S.SongName>{name}</S.SongName>
                {image?.filename && (
                  <S.Thumbnail src={`${API_SERVER}/${image?.fieldname}/${image?.filename}`} alt={image?.filename} />
                )}
                {/*<S.Category>{category.join(', ')}</S.Category>*/}
                {thumbnail?.filename && (
                  <S.Thumbnail
                    src={`${API_SERVER}/${thumbnail?.fieldname}/${thumbnail?.filename}`}
                    alt={thumbnail?.filename}
                  />
                )}
              </S.Summary>
              <S.Information>
                <S.Label>Artist's Statement.</S.Label>
                <S.Statement>{statement}</S.Statement>
                {sign && <S.Sign src={`${API_SERVER}/${sign?.fieldname}/${sign.filename}`} alt="sign" />}
              </S.Information>
            </S.Song>
          ))}
        {type === PRODUCT_TYPE.VIDEO && (
          <S.Song>
            <S.Summary>
              <S.Backdrop />
              <S.SongName>{name}</S.SongName>
              {video?.filename && (
                <VideoPlayer videoUrl={`${REACT_APP_API_ASSETS_SERVER}/${video?.fieldname}/${video?.filename}`} />
              )}
              {/*<S.Category>{category.join(', ')}</S.Category>*/}
              {/* {thumbnail?.filename && (
                <S.Thumbnail src={`${API_SERVER}/${thumbnail?.fieldname}/${thumbnail?.filename}`} alt={thumbnail?.filename} />
              )} */}
            </S.Summary>
            <S.Information>
              <S.Label>Artist's Statement.</S.Label>
              <S.Statement>{statement}</S.Statement>
              {sign && <S.Sign src={`${API_SERVER}/${sign?.fieldname}/${sign.filename}`} alt="sign" />}
            </S.Information>
          </S.Song>
        )}
        {type === PRODUCT_TYPE.SONG && (
          <S.Song>
            <S.Summary>
              <S.Backdrop />
              <S.SongName>{name}</S.SongName>
              {preview?.filename && <AudioPlayer src={`${API_SERVER}/${preview?.fieldname}/${preview.filename}`} />}
              {/*<S.Category>{category.join(', ')}</S.Category>*/}
              {thumbnail?.filename && (
                <S.Thumbnail
                  src={`${API_SERVER}/${thumbnail?.fieldname}/${thumbnail?.filename}`}
                  alt={thumbnail?.filename}
                />
              )}
            </S.Summary>
            <S.Information>
              <S.Label>Artist's Statement.</S.Label>
              <S.Statement>{statement}</S.Statement>
              {sign && <S.Sign src={`${API_SERVER}/${sign.filename}`} alt="sign" />}
            </S.Information>
          </S.Song>
        )}
        {type === PRODUCT_TYPE.VIRTUAL_EVENT && (
          <img
            src={
              svg
                ? svg
                : thumbnail?.fieldname
                ? `${REACT_APP_API_ASSETS_SERVER}/${thumbnail?.fieldname}/${thumbnail?.filename}`
                : getObjectUrl(thumbnail)
            }
            alt="thumbnail"
          />
        )}
        {type === PRODUCT_TYPE.OBJECT && object && (
          <div style={{ width: '100%', height: '31.25rem' }}>
            <ObjectRender objectUrl={object.url || getObjectUrl(object)} />{' '}
          </div>
        )}
      </S.Content>
    </S.PreviewDialog>
  );
};
