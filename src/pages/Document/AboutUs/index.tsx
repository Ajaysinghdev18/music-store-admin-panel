// Dependencies
import { CardContent, Grid, IconButton, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, FocusEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Apis
import { UsApi } from '../../../apis';
// Icons
import { DeleteIcon, PlusIcon } from '../../../assets/icons';
// Components
import { ConfirmDialog, LangSelector } from '../../../components';
import { LANGUAGE } from '../../../shared/enums';
// Interfaces
import { IUs } from '../../../shared/types';
import { setSearchExp } from '../../../store/actions/header.actions';
// Styles
import * as S from './styles';

// Interface of display about us data
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

// Export about us page
export const AboutUsPage: FC = () => {
  // States
  const [data, setData] = useState<IData[]>();
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>();
  const [selectedAboutUsIndex, setSelectedAboutUsDisplayIndex] = useState<number>(0);

  // Mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  // initial about data
  const initialData = [
    {
      title: initialTitle,
      content: initialContent,
      lang: LANGUAGE.EN,
      isActive: true
    },
    {
      title: initialTitle,
      content: initialContent,
      lang: LANGUAGE.EN,
      isActive: false
    }
  ];

  // Fetch data
  const fetchData = () => {
    UsApi.readAll()
      .then((res) => {
        const newData = res.us.map((d) => ({
          ...d,
          isActive: true,
          lang: LANGUAGE.EN
        }));
        if (newData.length === 0) {
          setData([...initialData]);
        } else if (newData.length % 2 === 1) {
          setData([
            ...newData,
            {
              title: initialTitle,
              content: initialContent,
              isActive: false
            }
          ]);
        } else {
          setData(newData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Add row handler
  const handleAddRow = (index: number) => {
    if (data) {
      data.splice(
        index + 2,
        0,
        {
          title: initialTitle,
          content: initialContent,
          lang: LANGUAGE.EN,
          isActive: true
        },
        {
          title: initialTitle,
          content: initialContent,
          lang: LANGUAGE.EN,
          isActive: false
        }
      );

      setData([...data]);
    }
  };

  // Add column handler
  const handleAddColumn = (index: number) => {
    if (data) {
      data[index].isActive = true;
      data[index].lang = LANGUAGE.EN;
      setData([...data]);
    }
  };

  // Update data from back-end
  const handleBlurUpdated = (requestData, index) => {
    const newData = { ...requestData, isActive: true };
    setData(
      data?.map((item, idx) => {
        if (index == idx) {
          return newData;
        }
        return item;
      })
    );
  };

  // Blur handler
  const handleBlur = (
    e: FocusEvent<HTMLSpanElement>,
    type: 'title' | 'content',
    lang: LANGUAGE,
    index: number,
    id?: string
  ) => {
    if (data) {
      const text = e.currentTarget.innerText;
      const newValue = data[index][type];
      if (id) {
        UsApi.update(id, {
          [type]: {
            ...newValue,
            [lang]: text
          }
        })
          .then((res) => {
            handleBlurUpdated({ ...res.body, lang }, index);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const item = {
          title:
            type === 'title'
              ? {
                  ...data[index].title,
                  [lang]: text
                }
              : data[index].title,
          content:
            type === 'content'
              ? {
                  ...data[index].content,
                  [lang]: text
                }
              : data[index].content
        };

        UsApi.create(item as IUs)
          .then((res) => {
            handleBlurUpdated({ ...res.body, lang }, index);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  // Delete confirm handler
  const handleDeleteConfirmed = () => {
    if (selectedProductId) {
      UsApi.remove(selectedProductId)
        .then(() => {
          handleUpdateDisplayData(selectedAboutUsIndex);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      handleUpdateDisplayData(selectedAboutUsIndex);
    }
  };

  // Delete handler
  const handleDelete = (index: number, id?: string) => {
    setSelectedProductId(id);
    setSelectedAboutUsDisplayIndex(index);
    setVisibleDeleteConfirmDialog(true);
  };

  const handleUpdateDisplayData = (index: number) => {
    if (!data) return;
    let upData = data;
    if (index % 2 === 0) {
      upData = data?.filter((d, idx) => idx !== index);
      if (upData[index].isActive) {
        upData?.splice(index + 1, 0, {
          title: initialTitle,
          content: initialContent,
          lang: LANGUAGE.EN,
          isActive: false
        });
      } else {
        upData = upData?.filter((d, idx) => idx !== index);
      }
    } else {
      upData[index].isActive = false;
    }
    setData(upData.map((d) => d));
  };

  const handleChangeLanguage = (id, lang) => {
    setData(
      data?.map((item, index) => ({
        ...item,
        lang: id === index ? lang : item.lang
      }))
    );
  };

  // On mounted
  useEffect(() => {
    dispatch(setSearchExp(''));
    fetchData();
  }, []);

  // Return about us page
  return (
    <Grid container columns={24} spacing={10}>
      {data &&
        data.map(({ id, title, content, lang, isActive }, index) => (
          <Grid key={`item-${index}`} item sm={12} xs={24}>
            {(isActive || index % 2 === 0) && (
              <S.CardView>
                <S.CardTitle>
                  <S.Title
                    variant="title"
                    color="text.secondary"
                    contentEditable
                    onBlur={(e) => handleBlur(e, 'title', lang, index, id)}
                  >
                    {title && title[lang]}
                  </S.Title>
                  <S.CardAction>
                    <LangSelector lang={lang} onChangeLang={(lang) => handleChangeLanguage(index, lang)} />
                    <IconButton onClick={() => handleDelete(index, id)}>
                      <DeleteIcon />
                    </IconButton>
                  </S.CardAction>
                </S.CardTitle>
                <CardContent>
                  <S.Description
                    variant="body1"
                    color="text.secondary"
                    contentEditable
                    onBlur={(e) => handleBlur(e, 'content', lang, index, id)}
                  >
                    {content && content[lang]}
                  </S.Description>
                </CardContent>
              </S.CardView>
            )}
            {index % 2 === 0 && (
              <S.NewSectionButton onClick={() => handleAddRow(index)} variant="outlined" startIcon={<PlusIcon />}>
                Add new section
              </S.NewSectionButton>
            )}
            {index % 2 === 1 && !isActive && !isMobile && (
              <S.NewSectionButton variant="outlined" startIcon={<PlusIcon />} onClick={() => handleAddColumn(index)} />
            )}
          </Grid>
        ))}
      <ConfirmDialog
        description="Are you sure to delete?"
        visible={visibleDeleteConfirmDialog}
        setVisible={setVisibleDeleteConfirmDialog}
        onConfirmed={handleDeleteConfirmed}
      />
    </Grid>
  );
};
