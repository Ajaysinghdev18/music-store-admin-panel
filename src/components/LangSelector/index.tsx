import { IconButton, MenuItem } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';

import { DEFlagIcon, FRFlagIcon, NLFlagIcon, USFlagIcon } from '../../assets/icons';
import SpainFlagIcon from '../../assets/icons/spain-flag-icon.png';
import { LANGUAGE } from '../../shared/enums';
import * as S from './styles';

interface ILangSelectorProps {
  lang: LANGUAGE;
  onChangeLang: (lang: LANGUAGE) => void;
}

export const LangSelector: FC<ILangSelectorProps> = ({ lang = LANGUAGE.EN, onChangeLang }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const languages = [
    {
      icon: <USFlagIcon />,
      value: LANGUAGE.EN,
      label: 'English'
    },
    {
      icon: <NLFlagIcon />,
      value: LANGUAGE.NL,
      label: 'Netherlands'
    },
    {
      icon: <FRFlagIcon />,
      value: LANGUAGE.FR,
      label: 'French'
    },
    {
      icon: <DEFlagIcon />,
      value: LANGUAGE.DE,
      label: 'Germany'
    },
    {
      icon: <img src={SpainFlagIcon} />,
      value: LANGUAGE.ES,
      label: 'Spain'
    }
  ];

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeLang = (lang: LANGUAGE) => () => {
    handleCloseMenu();
    onChangeLang(lang);
  };

  return (
    <>
      <S.LanguageButton onClick={handleOpenMenu}>
        {languages.find(({ value }) => value === lang)?.icon}
      </S.LanguageButton>
      <S.LanguageMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {languages.map(({ icon, label, value }, index) => (
          <MenuItem key={index} onClick={handleChangeLang(value)}>
            <S.MenuIcon>{icon}</S.MenuIcon>
            <S.MenuLabel>{label}</S.MenuLabel>
          </MenuItem>
        ))}
      </S.LanguageMenu>
    </>
  );
};
