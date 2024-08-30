// Dependencies
import { ArrowLeft, ArrowRight, Notifications } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Divider, IconButton, InputAdornment, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import debounce from 'lodash/debounce';
import React, { ChangeEvent, FC, MouseEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignThroughIcon,
  FontBoldIcon,
  FontItalicIcon,
  FontThroughIcon,
  FontUnderlineIcon,
  HeaderArchieveIcon,
  HeaderRecycleIcon,
  HeaderStarIcon,
  InsertLinkIcon,
  ListIcon,
  SearchIcon
} from '../../../../assets/icons';
import { ACCESS_TOKEN_KEY, ROUTES } from '../../../../constants';
import { setAccount } from '../../../../store/actions/auth.actions';
import { setDashboardPeriod } from '../../../../store/actions/dashboard.actions';
import {
  setArchieveTicketBtnClicked,
  setDelTicketBtnClicked,
  setFavTicketBtnClicked
} from '../../../../store/actions/header.actions';
import { setSearchExp } from '../../../../store/actions/header.actions';
import { getAccount, getDashboardPeriod } from '../../../../store/selectors';
// Styles
import * as S from './styles';
import { IAccount } from '../../../../shared/types';

// Interfaces
interface IHeaderProps {
  isMobile: boolean;
  isCollapsed: boolean;
  setCollapse: (isCollapsed: boolean) => void;
}

const TOGGLE_1 = [
  {
    label: '1h',
    value: '1h'
  },
  {
    label: '24h',
    value: '24h'
  },
  {
    label: '7d',
    value: '7d'
  },
  {
    label: '30d',
    value: '30d'
  },
  {
    label: '3m',
    value: '3m'
  },
  {
    label: '6m',
    value: '6m'
  },
  {
    label: '1y',
    value: '1y'
  },
  {
    label: 'All',
    value: 'All'
  }
];

const TOGGLE_3 = [
  {
    label: <FontBoldIcon />,
    value: 'bold'
  },
  {
    label: <FontItalicIcon />,
    value: 'italic'
  },
  {
    label: <FontUnderlineIcon />,
    value: 'underline'
  },
  {
    label: <FontThroughIcon />,
    value: 'throughout'
  }
];
const TOGGLE_4 = [
  {
    label: <InsertLinkIcon />,
    value: 'link'
  }
];
const TOGGLE_5 = [
  {
    label: <ListIcon />,
    value: 'list'
  }
];

const TOGGLE_6 = [
  {
    label: <AlignLeftIcon />,
    value: 'align-left'
  },
  {
    label: <AlignCenterIcon />,
    value: 'align-center'
  },
  {
    label: <AlignRightIcon />,
    value: 'align-right'
  },
  {
    label: <AlignThroughIcon />,
    value: 'align-through'
  }
];

const DesktopHeader: FC<IHeaderProps> = ({ isMobile, isCollapsed, setCollapse }) => {
  // States
  const [toggle2, setToggle2] = useState<string>('');
  const [toggle3, setToggle3] = useState<string>('');
  const [toggle4, setToggle4] = useState<string>('');
  const [toggle5, setToggle5] = useState<string>('');
  const [toggle6, setToggle6] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  // States
  const theme = useTheme();
  const isLargeTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const account: IAccount = useSelector(getAccount);
  const period = useSelector(getDashboardPeriod);
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ key: e.target.value });
    dispatch(setSearchExp(e.target.value));
    saveSearchKeyHandler(e.target.value);
  };

  const saveSearchKeyHandler = (value: string) => {
    const search = localStorage.getItem('searchKey');
    if (search) {
      const previousKeywords: string[] = JSON.parse(search);
      value.length > 0 && !previousKeywords.includes(value) && previousKeywords.push(value);
      value.length > 0 && !searchHistory.includes(value) && setSearchHistory([...searchHistory, value]);
      localStorage.setItem('searchKey', JSON.stringify(previousKeywords));
    } else {
      localStorage.setItem('searchKey', JSON.stringify([`${value}`]));
      setSearchHistory([value]);
    }
  };

  useEffect(() => {
    const search = localStorage.getItem('searchKey');
    if (search) {
      setSearchHistory([...JSON.parse(search)]);
    }
  }, []);

  useEffect(() => {
    console.log(searchHistory);
  }, [searchHistory]);

  const handleDebounceChangeSearch = debounce(handleChangeSearch, 500);

  const handleChangeToggle1 = (_: MouseEvent<HTMLElement>, value: string) => {
    dispatch(setDashboardPeriod(value));
  };

  const handleChangeToggle2 = (_: MouseEvent<HTMLElement>, value: string) => {
    setToggle2(value);
  };

  const handleChangeToggle3 = (_: MouseEvent<HTMLElement>, value: string) => {
    setToggle3(value);
  };

  const handleChangeToggle4 = (_: MouseEvent<HTMLElement>, value: string) => {
    setToggle4(value);
  };

  const handleChangeToggle5 = (_: MouseEvent<HTMLElement>, value: string) => {
    setToggle5(value);
  };

  const handleChangeToggle6 = (_: MouseEvent<HTMLElement>, value: string) => {
    setToggle6(value);
  };

  const handleClickFavorite = () => {
    dispatch(setFavTicketBtnClicked(true));
  };

  const handleClickArchieve = () => {
    dispatch(setArchieveTicketBtnClicked(true));
  };

  const handleClickDelete = () => {
    dispatch(setDelTicketBtnClicked(true));
  };

  const handleLogOut = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    dispatch(setAccount(null));
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  // Right header bar
  const headerRightBar = useMemo(() => {
    if (
      location.pathname == '/' ||
      location.pathname == '/songs' ||
      location.pathname == '/events' ||
      location.pathname == '/articles' ||
      location.pathname == '/tickets'
    ) {
      return (
        <Stack direction="row" spacing={8} divider={<Divider orientation="vertical" flexItem />}>
          {location.pathname === '/tickets' && (
            <Stack direction="row">
              <IconButton>
                <HeaderStarIcon onClick={handleClickFavorite} />
              </IconButton>
              <IconButton>
                <HeaderArchieveIcon onClick={handleClickArchieve} />
              </IconButton>
              <IconButton>
                <HeaderRecycleIcon onClick={handleClickDelete} />
              </IconButton>
            </Stack>
          )}
        </Stack>
      );
    }
    return undefined;
  }, [location.pathname]);

  // Dashboard header bar
  const headerDashboardMenus = useMemo(() => {
    if (location.pathname === '/') {
      return (
        <>
          <S.ToggleGroup exclusive value={period} onChange={handleChangeToggle1}>
            {TOGGLE_1.map(({ label, value }, index) => (
              <S.Toggle key={index} value={value}>
                <S.ToggleLabel>{label}</S.ToggleLabel>
              </S.Toggle>
            ))}
          </S.ToggleGroup>
        </>
      );
    }

    if (location.pathname.includes(ROUTES.DOCUMENT.ARTICLE.LIST) && location.pathname != ROUTES.DOCUMENT.ARTICLE.LIST) {
      return (
        <Stack direction="row">
          <S.ToggleGroup value={toggle3} onChange={handleChangeToggle3}>
            {TOGGLE_3.map(({ label, value }, index) => (
              <S.Toggle key={index} value={value}>
                <S.ToggleLabel>{label}</S.ToggleLabel>
              </S.Toggle>
            ))}
          </S.ToggleGroup>
          <S.ToggleGroup exclusive value={toggle4} onChange={handleChangeToggle4}>
            {TOGGLE_4.map(({ label, value }, index) => (
              <S.Toggle key={index} value={value}>
                <S.ToggleLabel>{label}</S.ToggleLabel>
              </S.Toggle>
            ))}
          </S.ToggleGroup>
          <S.ToggleGroup exclusive value={toggle5} onChange={handleChangeToggle5}>
            {TOGGLE_5.map(({ label, value }, index) => (
              <S.Toggle key={index} value={value}>
                <S.ToggleLabel>{label}</S.ToggleLabel>
              </S.Toggle>
            ))}
          </S.ToggleGroup>
          <S.ToggleGroup exclusive value={toggle6} onChange={handleChangeToggle6}>
            {TOGGLE_6.map(({ label, value }, index) => (
              <S.Toggle key={index} value={value}>
                <S.ToggleLabel>{label}</S.ToggleLabel>
              </S.Toggle>
            ))}
          </S.ToggleGroup>
        </Stack>
      );
    }
    return undefined;
  }, [
    location.pathname,
    period,
    toggle2,
    toggle3,
    toggle4,
    toggle5,
    toggle6,
    handleChangeToggle1,
    handleChangeToggle2,
    handleChangeToggle3,
    handleChangeToggle4,
    handleChangeToggle5,
    handleChangeToggle6
  ]);

  useEffect(() => {
    const key = searchParams.get('key');

    if (key) {
      dispatch(setSearchExp(key));
    }
  }, []);

  useEffect(() => {
    const inlineElm = document.getElementsByClassName('rdw-inline-wrapper')[0] as any;
    if (inlineElm) {
      if (toggle3.includes('bold')) {
        if (inlineElm.children[0].getAttribute('aria-selected') === 'false') {
          inlineElm.children[0].click();
        }
      } else {
        if (inlineElm.children[0].getAttribute('aria-selected') === 'true') {
          inlineElm.children[0].click();
        }
      }
    }
  }, [toggle3]);

  useEffect(() => {
    const listElm = document.getElementsByClassName('rdw-list-wrapper')[0] as any;
    if (listElm) {
      if (toggle5 === 'list') {
        if (listElm.children[0].getAttribute('aria-selected') === 'false') {
          listElm.children[0].click();
        }
      } else {
        if (listElm.children[0].getAttribute('aria-selected') === 'true') {
          listElm.children[0].click();
        }
      }
    }
  }, [toggle5]);

  useEffect(() => {
    const alignElm = document.getElementsByClassName('rdw-text-align-wrapper')[0] as any;
    switch (toggle6) {
      case 'align-left': {
        alignElm.children[0].click();
        break;
      }

      case 'align-center': {
        alignElm.children[1].click();
        break;
      }

      case 'align-right': {
        alignElm.children[2].click();
        break;
      }

      case 'align-through': {
        alignElm.children[3].click();
        break;
      }
    }
  }, [toggle6]);

  return (
    <S.Header>
      <Stack display="flex" alignItems="center" gap={80} direction="row" spacing={8}>
        {/*<IconButton*/}
        {/*  onClick={() => setCollapse(!isCollapsed)}*/}
        {/*  sx={{*/}
        {/*    display: isCollapsed || !isMobile ? 'none' : 'flex',*/}
        {/*    mt: 5,*/}
        {/*    color: 'white',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <MenuIcon />*/}
        {/*</IconButton>*/}
        <Box>
          <ArrowLeft onClick={() => setCollapse(false)} sx={{ cursor: 'pointer' }} />
          <ArrowRight onClick={() => setCollapse(true)} sx={{ cursor: 'pointer' }} />
        </Box>
        <S.SearchContainer>
          <S.SearchInputWrapper>
            <S.SearchInput
              onChange={handleDebounceChangeSearch}
              defaultValue={searchParams.get('key')}
              placeholder="Search"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
            />
            {searchHistory.length > 0 && (
              <S.SearchResult>
                {searchHistory?.map((value) => (
                  <Typography key={value}>{value}</Typography>
                ))}
              </S.SearchResult>
            )}
          </S.SearchInputWrapper>
        </S.SearchContainer>
        {/*{!isLargeTablet && headerDashboardMenus}*/}
      </Stack>
      <Stack direction="row" spacing={32}>
        <Stack display="flex" flexDirection="row" gap={8}>
          <img src="/images/avatar-1.png" alt="avatar-1" width={50} />
          <Box>
            <Stack sx={{ fontSize: '1.2rem', fontWeight: '500' }}>{account.name}</Stack>
            <Stack sx={{ fontSize: '0.8rem', color: 'gray' }}>{account.role}</Stack>
          </Box>
        </Stack>
        <Stack direction="row" spacing={8}>
          <IconButton>
            <LogoutIcon onClick={handleLogOut} />
          </IconButton>
        </Stack>
      </Stack>
    </S.Header>
  );
};

export default DesktopHeader;
