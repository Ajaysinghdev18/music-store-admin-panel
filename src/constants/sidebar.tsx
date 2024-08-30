// Interfaces
import { ReactNode } from 'react';

import {
  ActiveKYCIcon,
  ArrowLeftMIcon,
  CategoryIcon,
  CategoryOutlinedIcon,
  DashboardIcon,
  DashboardOutlinedIcon,
  DocumentIcon,
  DocumentOutlinedIcon,
  EmailContainedIcon,
  EmailOutlinedIcon,
  EventIcon,
  EventOutlinedIcon,
  ImageIcon,
  ImageWhiteIcon,
  KYCIcon,
  KeyIconContained,
  KeyIconOutile,
  MovieIcon,
  MovieWhiteIcon,
  Object3D,
  Object3DOutline,
  OrderIcon,
  OrderOutlinedIcon,
  PeopleIcon,
  PeopleWhiteIcon,
  SongIcon,
  SongOutlinedIcon,
  TokenIcon,
  TokenOutlinedIcon
} from '../assets/icons';
import { ROUTES } from './routes';

export interface ISidebarItem {
  path?: string;
  label: string;
  icon: {
    default: ReactNode;
    active: ReactNode;
  };
  children?: ISidebarItem[];
  isChild?: boolean;
}

export const SIDEBARADMIN_LIST: ISidebarItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: {
      default: <DashboardOutlinedIcon />,
      active: <DashboardIcon />
    }
  },
  {
    path: '/users',
    label: 'Users',
    icon: {
      default: <PeopleWhiteIcon />,
      active: <PeopleIcon />
    }
  },
  {
    label: 'Documents',
    icon: {
      default: <DocumentOutlinedIcon />,
      active: <DocumentIcon />
    },
    children: [
      {
        label: 'Main Menu',
        icon: {
          default: <ArrowLeftMIcon />,
          active: <ArrowLeftMIcon />
        }
      },
      {
        path: '/articles',
        label: 'Articles',
        icon: {
          default: <DocumentOutlinedIcon />,
          active: <DocumentIcon />
        }
      },
      {
        path: '/faq',
        label: 'Faq',
        icon: {
          default: <DocumentOutlinedIcon />,
          active: <DocumentIcon />
        }
      },
      {
        path: '/tickets',
        label: 'Tickets',
        icon: {
          default: <DocumentOutlinedIcon />,
          active: <DocumentIcon />
        }
      },
      {
        path: '/about-us',
        label: 'About Us',
        icon: {
          default: <DocumentOutlinedIcon />,
          active: <DocumentIcon />
        }
      },
      {
        path: '/terms',
        label: 'Terms',
        icon: {
          default: <DocumentOutlinedIcon />,
          active: <DocumentIcon />
        }
      },
      {
        path: '/privacy-policy',
        label: 'Privacy Policy',
        icon: {
          default: <DocumentOutlinedIcon />,
          active: <DocumentIcon />
        }
      }
    ]
  },
  {
    path: '/artists',
    label: 'Artists',
    icon: {
      default: <PeopleWhiteIcon />,
      active: <PeopleIcon />
    }
  },
  {
    path: '/products',
    label: 'Products',
    icon: {
      default: <SongOutlinedIcon />,
      active: <SongIcon />
    }
  },
  {
    path: '/songs',
    label: 'Songs',
    icon: {
      default: <SongOutlinedIcon />,
      active: <SongIcon />
    }
  },
  {
    path: '/categories',
    label: 'Categories',
    icon: {
      default: <CategoryOutlinedIcon />,
      active: <CategoryIcon />
    }
  },
  {
    path: '/images',
    label: 'Images',
    icon: {
      default: <ImageWhiteIcon />,
      active: <ImageIcon />
    }
  },
  {
    path: '/videos',
    label: 'Videos',
    icon: {
      default: <MovieWhiteIcon />,
      active: <MovieIcon />
    }
  },
  {
    path: '/events',
    label: 'Events',
    icon: {
      default: <EventOutlinedIcon />,
      active: <EventIcon />
    }
  },
  {
    path: '/orders',
    label: 'Orders',
    icon: {
      default: <OrderOutlinedIcon />,
      active: <OrderIcon />
    }
  },
  {
    path: '/objects',
    label: '3D Objects',
    icon: {
      default: <Object3DOutline />,
      active: <Object3D />
    }
  },
  {
    path: '/nfts',
    label: 'NFT Tokens',
    icon: {
      default: <TokenOutlinedIcon />,
      active: <TokenIcon />
    }
  },
  {
    path: '/kyc',
    label: 'KYC',
    icon: {
      default: <KYCIcon />,
      active: <ActiveKYCIcon />
    }
  },
  {
    path: '/emails',
    label: 'Email Templates',
    icon: {
      default: <EmailOutlinedIcon />,
      active: <EmailContainedIcon />
    }
  },
  {
    path: ROUTES.SERVICE.LIST,
    label: 'Api Keys',
    icon: {
      default: <KeyIconOutile />,
      active: <KeyIconContained />
    }
  },
  {
    path: ROUTES.CMS.LIST,
    label: 'CMS',
    icon: {
      default: <SongOutlinedIcon />,
      active: <EmailContainedIcon />
    }
  },
];

export const SIDEBARARTIST_LIST: ISidebarItem[] = [
  {
    path: '/songs',
    label: 'Songs',
    icon: {
      default: <SongOutlinedIcon />,
      active: <SongIcon />
    }
  },
  {
    path: '/products',
    label: 'Products',
    icon: {
      default: <SongOutlinedIcon />,
      active: <SongIcon />
    }
  },
  {
    path: '/videos',
    label: 'Videos',
    icon: {
      default: <SongOutlinedIcon />,
      active: <SongIcon />
    }
  },
  {
    path: '/images',
    label: 'Images',
    icon: {
      default: <SongOutlinedIcon />,
      active: <SongIcon />
    }
  },
  {
    path: '/objects',
    label: '3D Objects',
    icon: {
      default: <Object3DOutline />,
      active: <Object3D />
    }
  },
  {
    path: '/events',
    label: 'Events',
    icon: {
      default: <EventOutlinedIcon />,
      active: <EventIcon />
    }
  },
  {
    path: '/nfts',
    label: 'NFT Tokens',
    icon: {
      default: <TokenOutlinedIcon />,
      active: <TokenIcon />
    }
  },
  {
    path: '/subscribers',
    label: 'Subscribers',
    icon: {
      default: <TokenOutlinedIcon />,
      active: <TokenIcon />
    },
  },
  {
    path: '/newsLetter',
    label: 'News Letter',
    icon: {
      default: <TokenOutlinedIcon />,
      active: <TokenIcon />
    },
  },
  
];
