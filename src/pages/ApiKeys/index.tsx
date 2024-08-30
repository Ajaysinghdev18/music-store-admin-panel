// Dependencies
import { CardContent, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, FocusEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Apis
import { ServiceApi, UsApi } from '../../apis';
// Icons
import { DeleteIcon, PlusIcon } from '../../assets/icons';
// Components
import { ConfirmDialog, LangSelector } from '../../components';
import TableToolbar from '../../components/Gallery/Toolbar';
import { LANGUAGE } from '../../shared/enums';
// Interfaces
import { IUs } from '../../shared/types';
import { setSearchExp } from '../../store/actions/header.actions';
import { CreateServiceDialog } from './Create';
// Styles
import * as S from './styles';

// Interface of display api keys data
interface IData extends IUs {
  isActive: boolean;
  lang: LANGUAGE;
}

const initialTitle = {
  en: 'Title',
  nl: 'Titel',
  fr: 'Titre',
  de: 'Titel',
  es: 'Título'
};

const initialContent = {
  en: 'Description here...',
  nl: 'Beschrijving hier...',
  fr: 'Descriptif ici...',
  de: 'Beschreibung hier...',
  es: 'Descripción aquí...'
};

// Export Api Keys page
export const ApiKeysPage: FC = () => {
  // States
  const [serviceApis, setServiceApis] = useState([]);
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [createServiceModal, setCreateServiceModal] = useState(false);

  const dispatch = useDispatch();

  // Fetch data
  const fetchData = () => {
    ServiceApi.readAll()
      .then((res) => {
        setServiceApis(res.services);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickOpen = () => {
    setCreateServiceModal(true);
  };

  const handleClose = () => {
    setCreateServiceModal(false);
  };

  const serviceCreated = () => {
    setServiceApis([]);
  };

  // New handler
  const handleNew = () => {
    setCreateServiceModal(true);
  };

  // Delete handler
  const handleDelete = (id: string) => {
    ServiceApi.remove(id)
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.tsx:92 ~ .then ~ res:', err);
      });
  };

  // Delete confirm handler
  const handleDeleteConfirmed = (id: string) => {
    const a = 1;
  };

  // On mounted
  useEffect(() => {
    dispatch(setSearchExp(''));
    fetchData();
  }, [createServiceModal]);

  // Return about us page
  return (
    <S.Container>
      <TableToolbar isLoading={false} title="Third Party Services" onNew={handleNew} />
      <Grid container columns={24} spacing={10}>
        {serviceApis?.length > 0
          ? serviceApis.map(({ name, secretKey, publishableKey, id }) => {
              return (
                <Grid key={`item-${1}`} item sm={12} xs={24}>
                  <S.CardView>
                    <S.CardTitle>
                      <S.Title
                        variant="title"
                        color="text.secondary"
                        // onBlur={(e) => handleBlur(e, 'title', lang, index, id)}
                      >
                        {name}
                      </S.Title>
                      <S.CardAction>
                        {/* <LangSelector lang={lang} onChangeLang={(lang) => handleChangeLanguage(index, lang)} /> */}
                        <IconButton onClick={() => handleDelete(id)}>
                          <DeleteIcon />
                        </IconButton>
                      </S.CardAction>
                    </S.CardTitle>
                    <CardContent>
                      <S.Keys>
                        <Typography variant="body1">Secret Key</Typography>
                        <Typography color="info.main" variant="body1">
                          {secretKey}
                        </Typography>
                      </S.Keys>
                      <S.Keys>
                        <Typography variant="body1">Publishable Key</Typography>
                        <Typography color="info.main" variant="body1">
                          {publishableKey}
                        </Typography>
                      </S.Keys>
                    </CardContent>
                  </S.CardView>
                </Grid>
              );
            })
          : ''}
        <ConfirmDialog
          description="Are you sure to delete?"
          visible={visibleDeleteConfirmDialog}
          setVisible={setVisibleDeleteConfirmDialog}
        />
        {createServiceModal && (
          <CreateServiceDialog
            showServiceModal={createServiceModal}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            serviceCreated={serviceCreated}
          />
        )}
      </Grid>
    </S.Container>
  );
};
