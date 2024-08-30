
  
  export interface ISocial {
    _id?: string;
    title?: string;
    statement?: string;
    artistId?: string;
    thumbnail?: string;
    video?: any;
    attachment?: any;
    contentType: 'video' | 'announcement'
    publishOnSocialMedia: boolean
  }
  