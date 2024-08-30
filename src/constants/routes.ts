// Dependencies
import { FC } from 'react';

// Pages
import {
  AboutUsPage, // Document
  ArticleListPage,
  ArtistDetailPage,
  ArtistGalleryNewPage, // Artist
  ArtistListPage,
  ArtistNewPage, // Category
  CategoryListPage, // Dashboard
  DashboardPage,
  EmailTemplatePage,
  EventDetailPage,
  EventListPage,
  FaqDashboardPage,
  NewArticlePage, // Event
  NewEventPage,
  NewFaqCategoryPage,
  NewFaqQuestionPage, // Song
  NewSongPage,
  NftDetailPage, // Nft
  NftListPage,
  OrderDetailPage, // Order
  OrderListPage,
  PrivacyPolicyPage, // Auth
  SignInPage,
  SongDetailPage,
  SongListPage,
  TermsPage,
  TicketDetailPage,
  TicketListPage,
  UserDetailPage,
  UserFormPage, // User
  UserListPage
} from '../pages';
import { NewObjectPage, ObjectDetailPage, ObjectsListPage } from '../pages/3DObject';
import { ApiKeysPage } from '../pages/ApiKeys';
import { NewGalleryPage } from '../pages/Artist/Detail/Gallery/Create';
import { ContractDetailPage } from '../pages/Artist/Detail/SmartContract/Detail';
import { ImageDetailPage, ImageListPage, NewImagePage } from '../pages/Image';
import KYCPage from '../pages/KYC/List';
import KYCView from '../pages/KYC/View';
import { NewProductPage, ProductDetailPage, ProductListPage } from '../pages/Physical';
import { NewVideoPage, VideoDetailPage, VideoListPage } from '../pages/Video';
import { CMSTemplatesPage } from '../pages/CMS/List';
import { SubscriberList } from '../pages/Subscriber';
import { NewsLetterPage } from '../pages/NewLetter';
import { NewSocialContent } from '../pages/Artist/Detail/Social/Create';

// Interfaces
interface IRoute {
  path: string;
  Component: FC;
}

// Export routes
export const ROUTES = {
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up'
  },
  HOME: '/',
  ARTIST: {
    LIST: '/artists',
    NEW: '/artists/new',
    EDIT: '/artists/:id/edit',
    DETAIL: '/artists/:id/detail',
    NEW_GALLERY: '/artists/:artistId/gallery/new',
    GALLERY_DETAIL: '/artists/:artistId/gallery/:galleryId/detail',
    NEW_SOCIAL:'/artists/:artistId/social/:type/new',
    SOCIAL_DETAIL:'/artists/:artistId/social/:type/:id/detail',
  },
  SONG: {
    LIST: '/songs',
    NEW: '/songs/new',
    EDIT: '/songs/:id/edit',
    DETAIL: '/songs/:id/detail'
  },
  VIDEO: {
    LIST: '/videos',
    NEW: '/videos/new',
    EDIT: '/videos/:id/edit',
    DETAIL: '/videos/:id/detail'
  },
  PHYSICAL_PRODUCT: {
    LIST: '/products',
    NEW: '/products/new',
    EDIT: '/products/:id/edit',
    DETAIL: '/products/:id/detail'
  },
  IMAGE: {
    LIST: '/images',
    NEW: '/images/new',
    EDIT: '/images/:id/edit',
    DETAIL: '/images/:id/detail'
  },
  OBJECT: {
    LIST: '/objects',
    NEW: '/objects/new',
    EDIT: '/objects/:id/edit',
    DETAIL: '/objects/:id/detail'
  },
  EVENT: {
    LIST: '/events',
    NEW: '/events/new',
    EDIT: '/events/:id/edit',
    DETAIL: '/events/:id/detail'
  },
  DOCUMENT: {
    ARTICLE: {
      LIST: '/articles',
      NEW: '/articles/new',
      EDIT: '/articles/:id/edit'
    },
    FAQ: {
      DASHBOARD: '/faq',
      NEW_QUESTION: '/faq/new-question',
      NEW_CATEGORY: '/faq/new-category',
      EDIT_QUESTION: '/faq/:id/edit-question',
      EDIT_CATEGORY: '/faq/:id/edit-category'
    },
    TICKET: {
      LIST: '/tickets',
      DETAIL: '/tickets/:id'
    },
    ABOUT_US: '/about-us',
    TERMS: '/terms',
    PRIVACY_POLICY: '/privacy-policy'
  },
  CATEGORIES: '/categories',
  USER: {
    LIST: '/users',
    NEW: '/users/new',
    EDIT: '/users/:id/edit',
    DETAIL: '/users/:id/detail'
  },
  ORDER: {
    LIST: '/orders',
    DETAIL: '/orders/:id/detail'
  },
  NFT: {
    LIST: '/nfts',
    DETAIL: '/nfts/:address'
  },
  CONTRACT: {
    DETAIL: '/contract/:id'
  },
  SUBSCRIBER: {
    LIST: '/subscribers'
  },
  EMAIL: {
    LIST: '/emails',
    NEW: '/emails/new',
    VIEW: '/emails/view/:id',
    DETAIL: '/emails/:id/detail'
  },
  NEWSLETTER: {
    LIST: '/newsLetter',
    NEW: '/newsLetter/new',
    VIEW: '/newsLetter/view/:id',
    DETAIL: '/newsLetter/:id/detail'
  },
  KYC: {
    List: '/kyc',
    NEW: '/kyc/new',
    DETAIL: '/kyc/:id/detail'
  },
  CMS: {
    LIST: '/cms',
    NEW: '/cms/new',
    NEWTEMPLATE: '/cms/template/new',
    DETAIL: '/cms/:id/detail'
  },
  SERVICE: {
    LIST: '/services'
  }
};

// Export routes
export const AUTH_ROUTES: IRoute[] = [
  {
    path: ROUTES.AUTH.SIGN_IN,
    Component: SignInPage
  }
];

export const ADMIN_ROUTES: IRoute[] = [
  {
    path: ROUTES.HOME,
    Component: DashboardPage
  },
  {
    path: ROUTES.ARTIST.LIST,
    Component: ArtistListPage
  },
  {
    path: ROUTES.VIDEO.LIST,
    Component: VideoListPage
  },
  {
    path: ROUTES.VIDEO.NEW,
    Component: NewVideoPage
  },
  {
    path: ROUTES.VIDEO.EDIT,
    Component: NewVideoPage
  },
  {
    path: ROUTES.PHYSICAL_PRODUCT.LIST,
    Component: ProductListPage
  },
  {
    path: ROUTES.PHYSICAL_PRODUCT.NEW,
    Component: NewProductPage
  },
  {
    path: ROUTES.PHYSICAL_PRODUCT.EDIT,
    Component: NewProductPage
  },
  {
    path: ROUTES.PHYSICAL_PRODUCT.DETAIL,
    Component: ProductDetailPage
  },
  {
    path: ROUTES.IMAGE.EDIT,
    Component: NewImagePage
  },
  {
    path: ROUTES.VIDEO.DETAIL,
    Component: VideoDetailPage
  },
  {
    path: ROUTES.IMAGE.LIST,
    Component: ImageListPage
  },
  {
    path: ROUTES.IMAGE.NEW,
    Component: NewImagePage
  },
  {
    path: ROUTES.IMAGE.DETAIL,
    Component: ImageDetailPage
  },
  {
    path: ROUTES.OBJECT.LIST,
    Component: ObjectsListPage
  },
  {
    path: ROUTES.OBJECT.NEW,
    Component: NewObjectPage
  },
  {
    path: ROUTES.OBJECT.EDIT,
    Component: NewObjectPage
  },
  {
    path: ROUTES.OBJECT.DETAIL,
    Component: ObjectDetailPage
  },
  {
    path: ROUTES.ARTIST.NEW,
    Component: ArtistNewPage
  },
  {
    path: ROUTES.ARTIST.EDIT,
    Component: ArtistNewPage
  },
  {
    path: ROUTES.ARTIST.NEW_GALLERY,
    Component: NewGalleryPage
  },
  {
    path: ROUTES.ARTIST.GALLERY_DETAIL,
    Component: NewGalleryPage
  },
  {
    path: ROUTES.ARTIST.SOCIAL_DETAIL,
    Component: NewSocialContent
  },
  {
    path: ROUTES.ARTIST.NEW_SOCIAL,
    Component: NewSocialContent
  },
  {
    path: ROUTES.ARTIST.DETAIL,
    Component: ArtistDetailPage
  },
  {
    path: ROUTES.ARTIST.NEW_GALLERY,
    Component: ArtistGalleryNewPage
  },
  {
    path: ROUTES.ARTIST.GALLERY_DETAIL,
    Component: ArtistGalleryNewPage
  },
  {
    path: ROUTES.SONG.LIST,
    Component: SongListPage
  },
  {
    path: ROUTES.SONG.DETAIL,
    Component: SongDetailPage
  },
  {
    path: ROUTES.SONG.EDIT,
    Component: NewSongPage
  },
  {
    path: ROUTES.SONG.NEW,
    Component: NewSongPage
  },
  {
    path: ROUTES.EVENT.LIST,
    Component: EventListPage
  },
  {
    path: ROUTES.EVENT.DETAIL,
    Component: EventDetailPage
  },
  {
    path: ROUTES.EVENT.EDIT,
    Component: NewEventPage
  },
  {
    path: ROUTES.EVENT.NEW,
    Component: NewEventPage
  },
  {
    path: ROUTES.DOCUMENT.ARTICLE.LIST,
    Component: ArticleListPage
  },
  {
    path: ROUTES.DOCUMENT.ARTICLE.NEW,
    Component: NewArticlePage
  },
  {
    path: ROUTES.DOCUMENT.ARTICLE.EDIT,
    Component: NewArticlePage
  },
  {
    path: ROUTES.DOCUMENT.FAQ.DASHBOARD,
    Component: FaqDashboardPage
  },
  {
    path: ROUTES.DOCUMENT.FAQ.NEW_QUESTION,
    Component: NewFaqQuestionPage
  },
  {
    path: ROUTES.DOCUMENT.FAQ.EDIT_CATEGORY,
    Component: NewFaqCategoryPage
  },
  {
    path: ROUTES.DOCUMENT.FAQ.EDIT_QUESTION,
    Component: NewFaqQuestionPage
  },
  {
    path: ROUTES.DOCUMENT.FAQ.NEW_CATEGORY,
    Component: NewFaqCategoryPage
  },
  {
    path: ROUTES.DOCUMENT.TICKET.LIST,
    Component: TicketListPage
  },
  {
    path: ROUTES.DOCUMENT.TICKET.DETAIL,
    Component: TicketDetailPage
  },
  {
    path: ROUTES.DOCUMENT.ABOUT_US,
    Component: AboutUsPage
  },
  {
    path: ROUTES.DOCUMENT.TERMS,
    Component: TermsPage
  },
  {
    path: ROUTES.DOCUMENT.PRIVACY_POLICY,
    Component: PrivacyPolicyPage
  },
  {
    path: ROUTES.CATEGORIES,
    Component: CategoryListPage
  },
  {
    path: ROUTES.USER.LIST,
    Component: UserListPage
  },
  {
    path: ROUTES.USER.DETAIL,
    Component: UserDetailPage
  },
  {
    path: ROUTES.USER.NEW,
    Component: UserFormPage
  },
  {
    path: ROUTES.USER.EDIT,
    Component: UserFormPage
  },
  {
    path: ROUTES.ORDER.LIST,
    Component: OrderListPage
  },
  {
    path: ROUTES.ORDER.DETAIL,
    Component: OrderDetailPage
  },
  {
    path: ROUTES.NFT.LIST,
    Component: NftListPage
  },
  {
    path: ROUTES.NFT.DETAIL,
    Component: NftDetailPage
  },
  {
    path: ROUTES.CONTRACT.DETAIL,
    Component: ContractDetailPage
  },
  {
    path: ROUTES.EMAIL.LIST,
    Component: EmailTemplatePage
  },
  {
    path: ROUTES.KYC.List,
    Component: KYCPage
  },
  {
    path: ROUTES.KYC.DETAIL,
    Component: KYCView
  },
  {
    path: ROUTES.SERVICE.LIST,
    Component: ApiKeysPage
  },
  {
    path: ROUTES.CMS.LIST,
    Component: CMSTemplatesPage,
  }
];

export const ARTIST_ROUTES: IRoute[] = [
  {
    path: ROUTES.OBJECT.LIST,
    Component: ObjectsListPage
  },
  {
    path: ROUTES.OBJECT.NEW,
    Component: NewObjectPage
  },
  {
    path: ROUTES.OBJECT.EDIT,
    Component: NewObjectPage
  },
  {
    path: ROUTES.OBJECT.DETAIL,
    Component: ObjectDetailPage
  },
  {
    path: ROUTES.HOME,
    Component: ArtistDetailPage
  },
  {
    path: ROUTES.VIDEO.LIST,
    Component: VideoListPage
  },
  {
    path: ROUTES.VIDEO.NEW,
    Component: NewVideoPage
  },
  {
    path: ROUTES.VIDEO.EDIT,
    Component: NewVideoPage
  },
  {
    path: ROUTES.PHYSICAL_PRODUCT.LIST,
    Component: ProductListPage
  },
  {
    path: ROUTES.PHYSICAL_PRODUCT.NEW,
    Component: NewProductPage
  },
  {
    path: ROUTES.PHYSICAL_PRODUCT.EDIT,
    Component: NewProductPage
  },
  {
    path: ROUTES.PHYSICAL_PRODUCT.DETAIL,
    Component: ProductDetailPage
  },
  {
    path: ROUTES.IMAGE.EDIT,
    Component: NewImagePage
  },
  {
    path: ROUTES.VIDEO.DETAIL,
    Component: VideoDetailPage
  },
  {
    path: ROUTES.IMAGE.LIST,
    Component: ImageListPage
  },
  {
    path: ROUTES.IMAGE.NEW,
    Component: NewImagePage
  },
  {
    path: ROUTES.IMAGE.DETAIL,
    Component: ImageDetailPage
  },

  {
    path: ROUTES.SONG.LIST,
    Component: SongListPage
  },
  {
    path: ROUTES.SONG.DETAIL,
    Component: SongDetailPage
  },
  {
    path: ROUTES.SONG.EDIT,
    Component: NewSongPage
  },
  {
    path: ROUTES.SONG.NEW,
    Component: NewSongPage
  },
  {
    path: ROUTES.EVENT.LIST,
    Component: EventListPage
  },
  {
    path: ROUTES.EVENT.DETAIL,
    Component: EventDetailPage
  },
  {
    path: ROUTES.EVENT.EDIT,
    Component: NewEventPage
  },
  {
    path: ROUTES.EVENT.NEW,
    Component: NewEventPage
  },

  {
    path: ROUTES.NFT.LIST,
    Component: NftListPage
  },
  {
    path: ROUTES.NFT.DETAIL,
    Component: NftDetailPage
  },
  {
    path: ROUTES.CONTRACT.DETAIL,
    Component: ContractDetailPage
  },
  {
    path: ROUTES.SUBSCRIBER.LIST,
    Component: SubscriberList
  },
  {
    path: ROUTES.NEWSLETTER.LIST,
    Component: NewsLetterPage
  },
];
