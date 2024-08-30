import { InputAdornment, InputBaseProps } from '@mui/material';
import { BaseTextFieldProps } from '@mui/material/TextField/TextField';
import { FC, useState } from 'react';

import { LANGUAGE } from '../../shared/enums';
import { IMultiLang } from '../../shared/types/multilang.type';
import { displayTranslation } from '../../utils';
import { LangSelector } from '../LangSelector';
import * as S from './styles';

interface ITranslatableTextFieldProps extends BaseTextFieldProps {
  onChange?: InputBaseProps['onChange'];
  InputProps?: Partial<InputBaseProps>;
}
export const getTranslation = (text: any) => {
  return typeof text === 'object' ? displayTranslation(text) : text;
};

export const TranslatableTextField: FC<ITranslatableTextFieldProps> = ({ name, value, onChange, ...props }) => {
  const [lang, setLang] = useState<LANGUAGE>(LANGUAGE.EN);
  const handleChangeLang = (lang: LANGUAGE) => {
    setLang(lang);
  };

  const handleChangeValue = (e) => {
    const newValue = {
      ...(value as object),
      [lang]: e.target.value
    };
    console.log('new ', newValue);
    if (onChange && name) {
      // @ts-ignore
      onChange({
        target: {
          name,
          value: newValue as unknown as string
        }
      } as EventTarget);
    }
  };

  return (
    <S.TranslatableTextField
      {...props}
      name={name}
      value={value ? (typeof value === 'object' ? displayTranslation(value as IMultiLang, lang) : value) : ''}
      onChange={handleChangeValue}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <LangSelector lang={lang} onChangeLang={handleChangeLang} />
          </InputAdornment>
        )
      }}
    />
  );
};
